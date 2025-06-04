import { CharacterNameEnum } from "../common/enums/CharacterNameEnum"

export default class LobbySystem {
    lobbies: Lobby[]

    constructor(lobbies: Lobby[] = []) {
        this.lobbies = lobbies
    }

    createLobby(name: string, hostID: string) {
        const lobby = new Lobby(name, [new Player(hostID, `Player ${1}`, true)])
        this.lobbies.push(lobby)
        return lobby
    }

    // Get the lobby with this specific name
    getLobbyWithName(lobbyName: string) {
        return this.lobbies.find(lobby => lobby.name === lobbyName)
    }

    // Get the lobby containing a specific player's ID
    getLobbyWithID(playerID: string) {
        return this.lobbies.find(lobby => {
            for (const player of lobby.players) {
                if (player.id === playerID) return lobby
            }
        })
    }
}

class Lobby {
    name: string
    players: Player[]
    maxPlayers: number
    
    constructor(name: string, players: Player[], maxPlayers = 2) {
        this.name = name
        this.players = players
        this.maxPlayers = maxPlayers
    }

    joinLobby(playerID: string) {
        this.players.push(new Player(playerID, `Player ${this.players.length+1}`))
    }

    getPlayer(playerID: string) {
        return this.players.find(player => player.id === playerID)
    }
}

class Player {
    id: string
    name?: string
    character?: CharacterNameEnum
    host?: boolean

    constructor(id: string, name?: string, host?: boolean) {
        this.id = id
        this.name = name
        this.host = host
    }

    setName(name: string) {
        this.name = name
    }

    chooseCharacter(character: CharacterNameEnum) {
        this.character = character
    }
}