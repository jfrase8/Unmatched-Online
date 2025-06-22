import { LobbyType } from '../../../common/types/LobbyType'
import { PlayerType } from '../../../common/types/PlayerType'

export interface SocketEvents {
	lobbyCreated: LobbyType
	lobbyJoined: LobbyType
	errorMessage: string
	setLobby: LobbyType
	lobbyReturned: LobbyType
	characterChosen: PlayerType
	matchStarted: void
	playerUpdated: PlayerType
}

export type SocketCallback<T extends keyof SocketEvents> = (data: SocketEvents[T]) => void
