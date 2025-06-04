import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import compression from "compression-next";
import LobbySystem from "./LobbySystem.mts";
import {CharacterNameEnum} from '../common/enums/CharacterNameEnum'

const lobbySystem = new LobbySystem()

const port    = 8068;
const path    = "/unmatched";
const timeout = 20;

const app = express();

const io = new Server(createServer(app), {
    path: `${path}/socket.io`,
    connectionStateRecovery: {
        maxDisconnectionDuration: 1000 * 60 * timeout
    },
    cors: { origin: "http://localhost:5173" }
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id)

    // Creates a new lobby with this player as host
    socket.on('createLobby', (lobbyName: string, hostID: string) => {
        // Check if a lobby with this name already exists
        if (lobbySystem.getLobbyWithName(lobbyName) !== undefined) 
            socket.emit('errorMessage', 'A lobby with this name already exists')
        // Create a new lobby object
        
        else {
            const lobby = lobbySystem.createLobby(lobbyName, hostID)
            socket.join(lobbyName)
            socket.emit('lobbyCreated', lobby)
        }
    })

    // Joins the lobby with specified lobby name
    socket.on('joinLobby', (lobbyName: string, playerID: string) => {
        const lobby = lobbySystem.getLobbyWithName(lobbyName)
        console.log(lobby)
        // Check if the lobby exists
        if (!lobby) socket.emit('errorMessage', 'A lobby with this name does not exist')
        // Check if the lobby is already full
        else if (lobby.players.length === lobby.maxPlayers) socket.emit('errorMessage', 'This lobby is full')
        // Add this player to the lobby
        else {
            lobby.joinLobby(playerID)
            socket.join(lobbyName)
            io.to(lobbyName).emit('lobbyJoined')
        }
    })

    // Get the lobby with specified name
    socket.on('getLobby', (lobbyName: string) => {
        socket.emit('lobbyReturned', lobbySystem.getLobbyWithName(lobbyName))
    })

    socket.on('getPlayerInfo', (playerID: string) => {
        const player = lobbySystem.getLobbyWithID(playerID)?.getPlayer(playerID)
        io.to(playerID).emit('sendPlayerInfo', player)
    })

    socket.on('chooseCharacter', (characterName: CharacterNameEnum, playerID: string) => {
        const lobby = lobbySystem.getLobbyWithID(playerID)
        const player = lobby?.getPlayer(playerID)
        console.log(lobby, player)
        if (!lobby || !player) throw new Error('Player not found in a lobby')

        player.chooseCharacter(characterName)
        io.to(lobby.name).emit('characterChosen', player)
    })
});

app.use(compression());
app.use(path, express.static('public'));

io.httpServer.listen(port, () => console.log(`listening on port ${port}`));