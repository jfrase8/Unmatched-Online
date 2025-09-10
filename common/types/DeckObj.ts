import { PlayableCard } from '../../frontend/src/constants/deckInfo'

export interface DeckObj {
	drawPile: PlayableCard[]
	hand: PlayableCard[]
	discardPile: PlayableCard[]
	drawnCard?: PlayableCard
}
