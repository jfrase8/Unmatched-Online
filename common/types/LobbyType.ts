import { PlayerType } from './PlayerType'

export type LobbyType = {
	lobbyName: string
	players: PlayerType[]
	maxPlayers: number
	locked: boolean
	host: string
}
