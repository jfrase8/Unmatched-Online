import { PlayableCard } from '../constants/deckInfo'

export interface DeckObj {
	drawPile: PlayableCard[]
	hand: PlayableCard[]
	discardPile: PlayableCard[]
	drawnCard?: PlayableCard
}
