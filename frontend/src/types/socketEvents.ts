import { LobbyType } from '../../../common/types/LobbyType'
import { PlayerType } from '../../../common/types/PlayerType'
import { ServerEmitEnum } from '../../../common/enums/ServerEmitEnum'

export interface SocketEvents {
	[ServerEmitEnum.ERROR_MESSAGE]: string
	[ServerEmitEnum.LOBBY_NAME_VALID]: void
	[ServerEmitEnum.NAME_VALID]: void
	[ServerEmitEnum.LOBBY_JOINED]: LobbyType
	[ServerEmitEnum.CHARACTER_CHOSEN]: PlayerType[]
	[ServerEmitEnum.MATCH_STARTED]: LobbyType
	[ServerEmitEnum.PLAYER_DREW_CARD]: LobbyType
	[ServerEmitEnum.PLAYER_PLAYED_CARD]: LobbyType
}

export type SocketCallback<T extends keyof SocketEvents> = (data: SocketEvents[T]) => void
