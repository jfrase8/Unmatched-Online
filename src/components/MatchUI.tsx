import { useMemo } from 'react'
import { decks } from '../constants/deckInfo'
import { useDeck } from '../hooks/useDeck'
import DeckDisplay from './Deck'
import HandDisplay from './HandDisplay'
import GameBoard from './GameBoard/GameBoard'

export default function MatchUI() {
	const { addCardToHand, cardsInDeck, cardsInHand, drawCard, drawnCard, shuffleDeck } = useDeck(decks.Sinbad.cards)

	const clickEffect = useMemo(
		() => (!drawnCard ? drawCard : () => addCardToHand(drawnCard)),
		[addCardToHand, drawCard, drawnCard]
	)

	return (
		<>
			<GameBoard />
			{/* Hand Area */}
			<div className='flex w-full h-[50%] justify-center items-end'>
				<HandDisplay cards={cardsInHand} />
				<DeckDisplay drawnCard={drawnCard} cards={cardsInDeck} onClick={clickEffect} cardBack={decks.Sinbad.cardBack} />
			</div>
		</>
	)
}
