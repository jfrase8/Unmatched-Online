import { useCallback, useEffect, useState } from 'react'
import { Card } from '../constants/deckInfo'

export function useDeck(cards: Card[]) {
	const [cardsInDeck, setCardsInDeck] = useState(cards)
	const [drawnCard, setDrawnCard] = useState<Card | undefined>(undefined)
	const [cardsInHand, setCardsInHand] = useState<Card[]>([])

	// Shuffles the deck
	const shuffleDeck = useCallback((cards: Card[]) => {
		for (let i = cards.length - 1; i > 0; i--) {
			// Generate random index from 0 to i
			const j = Math.floor(Math.random() * (i + 1))
			// Swap elements at i and j
			;[cards[i], cards[j]] = [cards[j], cards[i]]
		}
		return cards
	}, [])

	// Draws a new card from the deck
	const drawCard = () => {
		const cardsLeftOver = [...cardsInDeck]
		const drawnCard = cardsLeftOver.pop()
		setDrawnCard(drawnCard)
	}

	// Moves the drawn card from the deck to your hand
	const addCardToHand = (card: Card) => {
		setCardsInDeck((prev) => prev.slice(0, -1))
		setCardsInHand((prev) => [...prev, card])
		setDrawnCard(undefined)
	}

	// Initial shuffle of cards
	useEffect(() => {
		setCardsInDeck(shuffleDeck(cards))
	}, [cards, shuffleDeck])

	return { drawnCard, drawCard, shuffleDeck, cardsInDeck, cardsInHand, addCardToHand }
}
