import { decks, PlayableCard } from '../../common/constants/deckInfo.ts'
import { CharacterNameEnum } from '../../common/enums/CharacterNameEnum.ts'

export function createDeck(character: CharacterNameEnum) {
	const deck = decks[character]

	const playableCards = deck.cards.reduce<PlayableCard[]>((acc, card) => {
		const copies = Array.from({ length: card.cardAmount }, (_, i) => ({
			...card,
			id: `${card.name}-${i + 1}`, // ensure unique id for each copy
		}))
		return acc.concat(copies)
	}, [])

	return playableCards
}
