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
			socket.join(lobbyName)
			socket.emit('lobbyCreated', lobby.toJSON())
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
			socket.join(lobbyName)
			io.to(lobbyName).emit('lobbyJoined', lobby.toJSON())
		}
	})

	// Get the lobby with specified name
	socket.on('getLobby', (lobbyName: string) => {
		const lobby = lobbySystem.getLobbyWithName(lobbyName)
		if (!lobby) return emitError(socket, 'A lobby with this name does not exist')
		socket.emit('lobbyReturned', lobby.toJSON())
	})

	//
	socket.on('setPlayerID', (lobbyName: string, playerID: string, playerName: string) => {
		const lobby = lobbySystem.getLobbyWithName(lobbyName)
		if (!lobby) return emitError(socket, 'A lobby with this name does not exist')
		const player = lobby.getPlayerWithName(playerName)
		if (!player) return emitError(socket, 'Player not found in a lobby')
		player.set({ id: playerID })
	})

	// Set the player's chosen character
	socket.on('chooseCharacter', (playerID: string, characterName?: CharacterNameEnum) => {
		const lobby = lobbySystem.getLobbyWithID(playerID)
		const player = lobby?.getPlayerWithID(playerID)

		console.log(characterName, player)

		if (!lobby || !player) throw new Error('Player not found in a lobby')

		player.set({ character: characterName })

		io.to(lobby.name).emit('characterChosen', player.toJSON())
	})

	socket.on('startMatch', (playerID: string) => {
		console.log(playerID)
		const lobby = lobbySystem.getLobbyWithID(playerID)
		if (!lobby) return emitError(socket, 'Player not found in a lobby')
		lobby.set({ locked: true })
		io.to(lobby.name).emit('matchStarted')
	})
})

app.use(compression())
app.use(path, express.static('public'))

io.httpServer.listen(port, () => console.log(`listening on port ${port}`))
