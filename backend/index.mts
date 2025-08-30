import { createServer } from 'http'
import { Server } from 'socket.io'
import express from 'express'
import compression from 'compression-next'
import LobbySystem from './classes/LobbySystem.mts'
import { CharacterNameEnum } from '../common/enums/CharacterNameEnum.ts'
import { PlayerType } from '../common/types/PlayerType.ts'
import { ServerEmitEnum } from '../common/enums/ServerEmitEnum.ts'
import { ClientEmitEnum } from '../common/enums/ClientEmitEnum.ts'
import { LobbyType } from '../common/types/LobbyType.ts'
import { PlayableCard } from '../common/constants/deckInfo.ts'

const lobbySystem = new LobbySystem()

const port = 8068
const path = '/unmatched'
const timeout = 20

const app = express()

const io = new Server(createServer(app), {
	path: `${path}/socket.io`,
	connectionStateRecovery: {
		maxDisconnectionDuration: 1000 * 60 * timeout,
	},
	cors: { origin: 'http://localhost:5173' },
})

io.on('connection', (socket) => {
	console.log('User connected:', socket.id)

	// Emits an error event to the client
	const emitError = (error: string) => {
		socket.emit('errorMessage', error)
	}

	// Checks if the name for a lobby is valid
	socket.on(ClientEmitEnum.CHECK_LOBBY_NAME, (lobbyName: string, type: 'create' | 'join') => {
		const lobby = lobbySystem.getLobbyWithName(lobbyName)
		if (lobby && type === 'create') emitError('A lobby with this name already exists')
		else if (!lobby && type === 'join') emitError('No lobby with this name found')
		else socket.emit(ServerEmitEnum.LOBBY_NAME_VALID)
	})

	// Checks if the player name is valid
	socket.on(ClientEmitEnum.CHECK_NAME, (lobbyName: string, name: string) => {
		const lobby = lobbySystem.getLobbyWithName(lobbyName)
		const nameExists = lobby?.players.find((player) => player.name === name)
		if (nameExists) emitError('A player with that name is already in the lobby')
		else socket.emit(ServerEmitEnum.NAME_VALID)
	})

	// Creates a new lobby with this player as host
	socket.on(ClientEmitEnum.CREATE_LOBBY, (lobbyName: string, host: PlayerType) => {
		// Check if the lobby exists
		const lobby = lobbySystem.getLobbyWithName(lobbyName)
		if (lobby) emitError('A lobby with this name already exists')
		// Create a new lobby object
		const newLobby = lobbySystem.createLobby(lobbyName, host)
		socket.emit(ServerEmitEnum.LOBBY_JOINED, newLobby.get())
	})

	// Joins the lobby with specified lobby name
	socket.on(ClientEmitEnum.JOIN_LOBBY, (lobbyName: string, player: PlayerType) => {
		const lobby = lobbySystem.getLobbyWithName(lobbyName)
		// Check if the lobby exists
		if (!lobby) emitError('A lobby with this name does not exist')
		// Check if the lobby is already full
		else if (lobby.players.length === lobby.maxPlayers) emitError('Lobby full')
		// Check if game has already started
		else if (lobby.locked) emitError('This game has already started')
		// Add this player to the lobby
		else {
			lobby.join(player)
			lobby.emitEvent(ServerEmitEnum.LOBBY_JOINED, io, lobby.get())
		}
	})

	// Get the lobby with specified name
	socket.on(ClientEmitEnum.GET_LOBBY, (lobbyName: string, ack: (lobby: LobbyType) => void) => {
		const lobby = lobbySystem.getLobbyWithName(lobbyName)
		if (!lobby) return emitError('Error getting lobby with name: ' + lobbyName)
		ack(lobby.get())
	})

	// Get the lobby and update the player stored id
	type UpdatePlayerID = { lobbyName: string; playerName: string }
	socket.on(
		ClientEmitEnum.GET_AFTER_REFRESH,
		({ lobbyName, playerName }: UpdatePlayerID, ack: (lobby: LobbyType) => void) => {
			console.log('Get after refresh:', { lobbyName, playerName })
			const lobby = lobbySystem.getLobbyWithName(lobbyName)
			if (!lobby) return emitError('Error getting lobby with name: ' + lobbyName)

			lobby.players.find((p) => p.name === playerName)?.set({ id: socket.id })

			ack(lobby.get())
		}
	)

	socket.on('updatePlayerID', (lobbyName: string, playerID: string, playerName: string) => {
		const lobby = lobbySystem.getLobbyWithName(lobbyName)
		if (!lobby) throw new Error('Lobby not found')
		const player = lobby.getPlayerWithName(playerName)
		if (!player) throw new Error('Player not found in a lobby')

		// Update the player's ID
		player.set({ id: playerID })

		// Emit the updated player to all other players
		lobby.emitEvent('playerUpdated', io, player.get(), [socket.id])

		io.to(socket.id).emit('setLobby', lobby.get())
		console.log('Updated player ID')
	})

	// Set the player's chosen character
	socket.on(
		ClientEmitEnum.CHOOSE_CHARACTER,
		(playerID: string, characterName?: CharacterNameEnum) => {
			const lobby = lobbySystem.getLobbyWithID(playerID)
			const player = lobby?.getPlayerWithID(playerID)

			console.log(characterName, player)

			if (!lobby || !player) throw new Error('Player not found in a lobby')

			player.set({ character: characterName })

			console.log('Player chosen character:', lobby.get().players)

			lobby.emitEvent(ServerEmitEnum.CHARACTER_CHOSEN, io, lobby.get().players)
		}
	)

	// Starts the game
	socket.on(ClientEmitEnum.START_MATCH, (playerID: string) => {
		const lobby = lobbySystem.getLobbyWithID(playerID)
		if (!lobby) return emitError('Player not found in a lobby')
		lobby.set({ locked: true })

		lobby.createDecks()

		// Shuffle all player's decks and draw their starting hand
		lobby.players.forEach((player) => {
			if (!player.character) return
			player.shuffleDeck()
			player.drawStartingHand()
		})

		lobby.emitEvent(ServerEmitEnum.MATCH_STARTED, io, lobby.get())
	})

	// Draws a card and sets it as the players drawn card
	socket.on(ClientEmitEnum.DRAW_CARD, (ack: (lobby: LobbyType) => void) => {
		console.log('Player drawing card')
		const lobby = lobbySystem.getLobbyWithID(socket.id)
		if (!lobby) throw new Error('Socket id not found in a lobby')
		const player = lobby.getPlayerWithID(socket.id)
		if (!player) throw new Error('Player not found in a this lobby')
		player.drawCard()

		console.log('Player drawn card:', player.get().drawnCard)

		ack(lobby.get())
	})

	// Adds a card to the player's hand
	socket.on(
		ClientEmitEnum.ADD_CARD_TO_HAND,
		(drawnCard: PlayableCard, ack: (lobby: LobbyType) => void) => {
			const lobby = lobbySystem.getLobbyWithID(socket.id)
			if (!lobby) throw new Error('Socket id not found in a lobby')
			const player = lobby.getPlayerWithID(socket.id)
			if (!player) throw new Error('Player not found in a this lobby')
			player.addCardToHand(drawnCard)

			ack(lobby.get())
		}
	)

	// socket.on('saveMatchPlayer', (matchPlayer: MatchPlayerType) => {
	// 	const lobby = lobbySystem.getLobbyWithPlayerName(matchPlayer.playerName)
	// 	console.log('Match Player:', matchPlayer, lobbySystem.lobbies[0])
	// 	if (!lobby) throw new Error('Player not found in a lobby')
	// 	lobby.match.addPlayer(matchPlayer)
	// 	console.log('Match player saved:', lobby.match.players)
	// })

	// socket.on('updatePlayerDeck', (playerName: string, playerDeck: Partial<DeckObj>) => {
	// 	const lobby = lobbySystem.getLobbyWithID(socket.id)
	// 	if (!lobby) throw new Error('Socket id not found in a lobby')
	// 	const player = lobby.match.findPlayer(playerName)
	// 	if (!player) throw new Error('Player not found in a this lobby')
	// 	player.set({ ...playerDeck })
	// })
})

app.use(compression())
app.use(path, express.static('public'))

io.httpServer.listen(port, () => console.log(`listening on port ${port}`))
