import { PlayerType } from './PlayerType'
import { PlayableCard } from '../../frontend/src/constants/deckInfo'

export type MatchPlayerType = {
	playerInfo: PlayerType
	hand: PlayableCard[]
	drawPile: PlayableCard[]
	discardPile: PlayableCard[]
	drawnCard: PlayableCard
	isTurn: boolean
}
