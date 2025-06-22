import { CharacterNameEnum } from '../../common/enums/CharacterNameEnum'
import { PlayerType } from '../../common/types/PlayerType'
import { LobbyType } from '../../common/types/LobbyType'
import { Server } from 'socket.io'

export default class LobbySystem {
	lobbies: Lobby[]

	constructor(lobbies: Lobby[] = []) {
		this.lobbies = lobbies
	}

	createLobby(name: string, host: PlayerType) {
		const lobby = new Lobby(name, [new Player(host.id, host.name)], 2, host.name)
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
	locked: boolean
	host: string

	constructor(name: string, players: Player[], maxPlayers = 2, host: string) {
		this.name = name
		this.players = players
		this.maxPlayers = maxPlayers
		this.locked = false
		this.host = host
	}
	toJSON() {
		return {
			name: this.name,
			players: this.players,
			maxPlayers: this.maxPlayers,
			locked: this.locked,
			host: this.host,
		}
	}

	emitEvent(event: string, io: Server, data?: unknown, excludePlayerIDs?: string[]) {
		for (const player of this.players) {
			// Send the event to all players not excluded
			if (!excludePlayerIDs?.some((id) => id === player.id)) io.to(player.id).emit(event, data)
		}
	}

	join(player: PlayerType) {
		this.players.push(new Player(player.id, player.name))
	}

	getPlayerWithID(playerID: string) {
		return this.players.find((player) => player.id === playerID)
	}

	getPlayerWithName(playerName: string) {
		return this.players.find((player) => player.name === playerName)
	}

	get() {
		return {
			name: this.name,
			players: this.players,
			maxPlayers: this.maxPlayers,
			locked: this.locked,
			host: this.host,
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

	constructor(id: string, name: string, host?: boolean) {
		this.id = id
		this.name = name
	}
	toJSON() {
		return {
			id: this.id,
			name: this.name,
			character: this.character,
		}
	}

	get() {
		return {
			id: this.id,
			name: this.name,
			character: this.character,
		}
	}

	set(update: Partial<Player>) {
		Object.assign(this, update)
	}
}
