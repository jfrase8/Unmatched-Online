import { CharacterNameEnum } from '../../common/enums/CharacterNameEnum'
import { PlayerType } from '../../common/types/PlayerType'
import { LobbyType } from '../../common/types/LobbyType'

export default class LobbySystem {
	lobbies: Lobby[]

	constructor(lobbies: Lobby[] = []) {
		this.lobbies = lobbies
	}

	createLobby(name: string, host: PlayerType) {
		const lobby = new Lobby(name, [new Player(host.id, host.name, true)])
		this.lobbies.push(lobby)
		return lobby
	}

	// Get the lobby with this specific name
	getLobbyWithName(lobbyName: string) {
		return this.lobbies.find((lobby) => lobby.name === lobbyName)
	}

	// Get the lobby containing a specific player's ID
	getLobbyWithID(playerID: string) {
		return this.lobbies.find((lobby) => lobby.players.find((player) => player.id === playerID))
	}
}

class Lobby implements LobbyType {
	name: string
	players: Player[]
	maxPlayers: number

	constructor(name: string, players: Player[], maxPlayers = 2) {
		this.name = name
		this.players = players
		this.maxPlayers = maxPlayers
	}
	toJSON() {
		return {
			name: this.name,
			players: this.players,
			maxPlayers: this.maxPlayers,
		}
	}

	join(player: PlayerType) {
		this.players.push(new Player(player.id, player.name))
	}

	getPlayer(playerID: string) {
		return this.players.find((player) => player.id === playerID)
	}

	get() {
		return {
			name: this.name,
			players: this.players,
			maxPlayers: this.maxPlayers,
		}
	}
	set(update: Partial<Lobby>) {
		Object.assign(this, update)
	}
}

class Player implements PlayerType {
	id: string
	name: string
	character?: CharacterNameEnum
	host?: boolean

	constructor(id: string, name: string, host?: boolean) {
		this.id = id
		this.name = name
		this.host = host
	}
	toJSON() {
		return {
			id: this.id,
			name: this.name,
			host: this.host,
		}
	}

	get() {
		return {
			id: this.id,
			name: this.name,
			character: this.character,
			host: this.host,
		}
	}

	set(update: Partial<Player>) {
		Object.assign(this, update)
	}
}
