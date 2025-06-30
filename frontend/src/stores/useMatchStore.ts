import { create } from 'zustand'
import { Deck, PlayableCard } from 'src/constants/deckInfo'
import { CharacterNameEnum } from '../../../common/enums/CharacterNameEnum'
import { DeckObj } from '../../../common/types/DeckObj'

interface MatchState {
	characterName?: CharacterNameEnum
	deck: {
		drawPile: PlayableCard[]
		hand: PlayableCard[]
		discardPile: PlayableCard[]
		drawnCard: PlayableCard | undefined
		initializeDeck: (deck: Deck) => DeckObj
		shuffleDeck: (deck?: PlayableCard[]) => PlayableCard[]
		setDrawnCard: (card?: PlayableCard) => void
		addToHand: (card: PlayableCard) => void
		removeFromHand: (card: PlayableCard) => void
		addToDeck: (card: PlayableCard) => void
		removeFromDeck: (card: PlayableCard) => void
		addToDiscard: (card: PlayableCard) => void
		removeFromDiscard: (card: PlayableCard) => void

		setDeck: (deckObj: DeckObj) => void
	}

	// Functions
	setCharacterName: (characterName: CharacterNameEnum) => void
}

export const useMatchStore = create<MatchState>()((set, get) => {
	return {
		characterName: undefined,
		deck: {
			drawPile: [],
			hand: [],
			discardPile: [],
			drawnCard: undefined,

			initializeDeck: (deck) => {
				const { deck: deckObj } = get()

				const playableCards = deck.cards.reduce<PlayableCard[]>((acc, card) => {
					const copies = Array.from({ length: card.cardAmount }, (_, i) => ({
						...card,
						id: `${card.name}-${i + 1}`, // ensure unique id for each copy
					}))
					return acc.concat(copies)
				}, [])

				const shuffledDeck = deckObj.shuffleDeck(playableCards)
				const startingFive = shuffledDeck.splice(0, 5)
				set({
					deck: {
						...deckObj,
						hand: startingFive,
						drawPile: shuffledDeck,
					},
				})
				return {
					drawPile: shuffledDeck,
					hand: startingFive,
					discardPile: [],
					drawnCard: undefined,
				}
			},
			shuffleDeck: (deck) => {
				const { deck: deckObj } = get()
				const cards = deck || deckObj.drawPile
				for (let i = cards.length - 1; i > 0; i--) {
					// Generate random index from 0 to i
					const j = Math.floor(Math.random() * (i + 1))
					// Swap elements at i and j
					;[cards[i], cards[j]] = [cards[j], cards[i]]
				}
				set({ deck: { ...deckObj, drawPile: cards } })
				return cards
			},
			setDrawnCard: (card) => set({ deck: { ...get().deck, drawnCard: card } }),
			addToHand: (card) => set({ deck: { ...get().deck, hand: [...get().deck.hand, card] } }),
			removeFromHand: (card) =>
				set({ deck: { ...get().deck, hand: get().deck.hand.filter((c) => c.id !== card.id) } }),
			addToDeck: (card) =>
				set({ deck: { ...get().deck, drawPile: [...get().deck.drawPile, card] } }),
			removeFromDeck: (card) =>
				set({
					deck: { ...get().deck, drawPile: get().deck.drawPile.filter((c) => c.id !== card.id) },
				}),
			addToDiscard: (card) =>
				set({ deck: { ...get().deck, discardPile: [...get().deck.discardPile, card] } }),
			removeFromDiscard: (card) =>
				set({
					deck: {
						...get().deck,
						discardPile: get().deck.discardPile.filter((c) => c.id !== card.id),
					},
				}),

			setDeck: (deckObj) => set({ deck: { ...get().deck, ...deckObj } }),
		},

		setCharacterName: (characterName) => set({ characterName }),
	}
})
