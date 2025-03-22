/** Sort takes a character's deck and sorts it based on the specified method. */

import { Deck } from '../constants/deckInfo'
import { CardTypeEnum } from '../enums/CardTypeEnum'
import { SortTypeEnum } from '../enums/SortTypeEnum'

export function sortDeck(deck: Deck, sortMethod: SortTypeEnum) {
	switch (sortMethod) {
		case SortTypeEnum.TYPE:
			return typeSort(deck)
		default:
			return typeSort(deck)
	}
}

/** Sorts based on the card type (Attack, Defense, Versatile, Scheme) */
function typeSort(deck: Deck) {
	return deck.cards.sort((a, b) => typeSortOrder[a.type] - typeSortOrder[b.type])
}

const typeSortOrder = {
	[CardTypeEnum.SCHEME]: 1,
	[CardTypeEnum.ATTACK]: 2,
	[CardTypeEnum.DEFENSE]: 3,
	[CardTypeEnum.VERSATILE]: 4,
}
