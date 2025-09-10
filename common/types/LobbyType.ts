import { PlayerType } from './PlayerType'
import { MatchType } from './MatchType'

export type LobbyType = {
	name: string
	players: PlayerType[]
	maxPlayers: number
	locked: boolean
	host: string
	match: MatchType
}
