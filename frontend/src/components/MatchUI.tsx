import { useCallback, useEffect } from 'react'
import { decks } from '../constants/deckInfo'
import DeckDisplay from './DeckDisplay'
import HandDisplay from './HandDisplay'
import Text from './Text'
import { useDeckStore } from 'src/stores/useDeckStore'

export default function MatchUI() {
	const { drawnCard, addToHand, setDrawnCard, drawPile, removeFromDeck, hand, initializeDeck } =
		useDeckStore()

	useEffect(() => {
		initializeDeck(decks.Sinbad)
	}, [initializeDeck])

	const clickEffect = useCallback(() => {
		if (drawnCard) {
			addToHand(drawnCard)
			removeFromDeck(drawnCard)
			setDrawnCard(undefined)
		} else {
			setDrawnCard(drawPile[0])
		}
	}, [addToHand, drawPile, drawnCard, removeFromDeck, setDrawnCard])

	return (
		<>
			<div className='size-full flex justify-center items-center border border-white'>
				<Text as='h1' className='text-3xl'>
					Game Board
				</Text>
			</div>
			{/* Hand Area */}
			<div className='flex w-full h-[50%] justify-center items-center border border-white gap-4'>
				<HandDisplay cards={hand} />
				<DeckDisplay
					drawnCard={drawnCard}
					cards={drawPile}
					onClick={clickEffect}
					cardBack={decks.Sinbad.cardBack}
				/>
			</div>
		</>
	)
}
