import { PlayableCard } from '../../../common/constants/deckInfo'

export default function getDiscardedVoyages(discardedCards: PlayableCard[]) {
	console.log('!!', discardedCards)
	return discardedCards.filter((card) => card.name.includes('Voyage'))
}
