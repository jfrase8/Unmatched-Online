import { createServer } from 'http'
import { Server } from 'socket.io'
import express from 'express'
import compression from 'compression-next'
import LobbySystem from './classes/LobbySystem.mts'
import { CharacterNameEnum } from '../common/enums/CharacterNameEnum'
import { PlayerType } from '../common/types/PlayerType'
import emitError from './utils/emitError.mts'

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

	// Creates a new lobby with this player as host
	socket.on('createLobby', (lobbyName: string, host: PlayerType) => {
		// Check if a lobby with this name already exists
		if (lobbySystem.getLobbyWithName(lobbyName))
			emitError(socket, 'A lobby with this name already exists')
		// Create a new lobby object
		else {
			const lobby = lobbySystem.createLobby(lobbyName, host)
			socket.emit('lobbyJoined', lobby.toJSON())
			console.log('Player joined lobby:', lobby)
		}
	})

	// Joins the lobby with specified lobby name
	socket.on('joinLobby', (lobbyName: string, player: PlayerType) => {
		const lobby = lobbySystem.getLobbyWithName(lobbyName)
		// Check if the lobby exists
		if (!lobby) emitError(socket, 'A lobby with this name does not exist')
		// Check if the lobby is already full
		else if (lobby.players.length === lobby.maxPlayers) emitError(socket, 'Lobby full')
		// Check if game has already started
		else if (lobby.locked) emitError(socket, 'This game has already started')
		// Add this player to the lobby
		else {
			lobby.join(player)
			lobby.emitEvent('lobbyJoined', io, lobby.toJSON())
		}
	})

	// Get the lobby with specified name
	socket.on('getLobby', (lobbyName: string) => {
		const lobby = lobbySystem.getLobbyWithName(lobbyName)
		if (!lobby) return emitError(socket, 'A lobby with this name does not exist')
		socket.emit('lobbyReturned', lobby.toJSON())
	})

	//
	socket.on('updatePlayerID', (lobbyName: string, playerID: string, playerName: string) => {
		const lobby = lobbySystem.getLobbyWithName(lobbyName)
		if (!lobby) throw new Error('Lobby not found')
		const player = lobby.getPlayerWithName(playerName)
		if (!player) throw new Error('Player not found in a lobby')

		// Update the player's ID
		player.set({ id: playerID })

		// Emit the updated player to all other players
		lobby.emitEvent('playerUpdated', io, player.toJSON(), [socket.id])

		// UpdatePlayerID event is only sent when a player refreshes/closes the tab, so we need to emit the up to date lobby info
		io.to(socket.id).emit('setLobby', lobby.toJSON())
		console.log('Updated player ID')
	})

	// Set the player's chosen character
	socket.on('chooseCharacter', (playerID: string, characterName?: CharacterNameEnum) => {
		const lobby = lobbySystem.getLobbyWithID(playerID)
		const player = lobby?.getPlayerWithID(playerID)

		console.log(characterName, player)

		if (!lobby || !player) throw new Error('Player not found in a lobby')

		player.set({ character: characterName })

		lobby.emitEvent('characterChosen', io, player.toJSON())
	})

	socket.on('startMatch', (playerID: string) => {
		console.log(playerID)
		const lobby = lobbySystem.getLobbyWithID(playerID)
		if (!lobby) return emitError(socket, 'Player not found in a lobby')
		lobby.set({ locked: true })
		lobby.emitEvent('matchStarted', io)
	})
})

app.use(compression())
app.use(path, express.static('public'))

io.httpServer.listen(port, () => console.log(`listening on port ${port}`))
