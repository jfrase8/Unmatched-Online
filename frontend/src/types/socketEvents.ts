import { LobbyType } from '../../../common/types/LobbyType'
import { PlayerType } from '../../../common/types/PlayerType'

export interface SocketEvents {
	lobbyCreated: LobbyType
	lobbyJoined: LobbyType
	errorMessage: string
	lobbyReturned: LobbyType
	characterChosen: PlayerType
	sendPlayerInfo: PlayerType
	matchStarted: void
}

export type SocketCallback<T extends keyof SocketEvents> = (data: SocketEvents[T]) => void
