import { PlayerType } from './PlayerType'

export type LobbyType = {
	name: string
	players: PlayerType[]
	maxPlayers: number
}
