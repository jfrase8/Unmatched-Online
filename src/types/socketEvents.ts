import { TakenCharacter } from '../components/CharacterSelection'
import { CharacterNameEnum } from '../enums/CharacterNameEnum'

export interface SocketEvents {
	lobbyCreated: Lobby
	lobbyJoined: Lobby
	errorMessage: string
	lobbyReturned: Lobby
	characterChosen: TakenCharacter
	sendPlayerInfo: Player
}

export type SocketCallback<T extends keyof SocketEvents> = (data: SocketEvents[T]) => void

export type Lobby = {
	name: string
	players: number[]
	maxPlayers: number
}

export type Player = {
	id: string
	name?: string
	character?: CharacterNameEnum
	host?: boolean
}
