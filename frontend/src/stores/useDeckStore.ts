import { create } from 'zustand'
import { Deck, PlayableCard } from 'src/constants/deckInfo'
import { CharacterNameEnum } from '../../../common/enums/CharacterNameEnum'

interface DeckState {
	characterName?: CharacterNameEnum
	drawPile: PlayableCard[]
	hand: PlayableCard[]
	discardPile: PlayableCard[]
	drawnCard: PlayableCard | undefined

	// Functions
	setCharacterName: (characterName: CharacterNameEnum) => void
	initializeDeck: (deck: Deck) => void
	shuffleDeck: (deck?: PlayableCard[]) => PlayableCard[]
	setDrawnCard: (card?: PlayableCard) => void
	addToHand: (card: PlayableCard) => void
	removeFromHand: (card: PlayableCard) => void
	addToDeck: (card: PlayableCard) => void
	removeFromDeck: (card: PlayableCard) => void
	addToDiscard: (card: PlayableCard) => void
	removeFromDiscard: (card: PlayableCard) => void
}

export const useDeckStore = create<DeckState>()((set, get) => {
	return {
		characterName: undefined,
		drawPile: [],
		hand: [],
		discardPile: [],
		drawnCard: undefined,

		setCharacterName: (characterName) => set({ characterName }),
		initializeDeck: (deck) => {
			const { shuffleDeck } = get()

			const playableCards = deck.cards.reduce<PlayableCard[]>((acc, card) => {
				const copies = Array.from({ length: card.cardAmount }, (_, i) => ({
					...card,
					id: `${card.name}-${i + 1}`, // ensure unique id for each copy
				}))
				return acc.concat(copies)
			}, [])

			const shuffledDeck = shuffleDeck(playableCards)
			const startingFive = shuffledDeck.splice(0, 5)
			set({
				hand: startingFive,
				drawPile: shuffledDeck,
			})
		},
		shuffleDeck: (deck) => {
			const { drawPile } = get()
			const cards = deck || drawPile
			for (let i = cards.length - 1; i > 0; i--) {
				// Generate random index from 0 to i
				const j = Math.floor(Math.random() * (i + 1))
				// Swap elements at i and j
				;[cards[i], cards[j]] = [cards[j], cards[i]]
			}
			set({ drawPile: cards })
			return cards
		},
		setDrawnCard: (card) => set({ drawnCard: card }),
		addToHand: (card) => set({ hand: [...get().hand, card] }),
		removeFromHand: (card) => set({ hand: get().hand.filter((c) => c.id !== card.id) }),
		addToDeck: (card) => set({ drawPile: [...get().drawPile, card] }),
		removeFromDeck: (card) => set({ drawPile: get().drawPile.filter((c) => c.id !== card.id) }),
		addToDiscard: (card) => set({ discardPile: [...get().discardPile, card] }),
		removeFromDiscard: (card) =>
			set({ discardPile: get().discardPile.filter((c) => c.id !== card.id) }),
	}
})
