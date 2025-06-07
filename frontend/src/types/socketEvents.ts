import { CharacterNameEnum } from '../../../common/enums/CharacterNameEnum'

export interface SocketEvents {
	lobbyCreated: Lobby
	lobbyJoined: Lobby
	errorMessage: string
	lobbyReturned: Lobby
	characterChosen: Player
	sendPlayerInfo: Player
}

export type SocketCallback<T extends keyof SocketEvents> = (data: SocketEvents[T]) => void

export type Lobby = {
	name: string
	players: Player[]
	maxPlayers: number
}

export type Player = {
	id: string
	name?: string
	character?: CharacterNameEnum
	host?: boolean
}
