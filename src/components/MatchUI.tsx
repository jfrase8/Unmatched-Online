import { decks } from '../constants/deckInfo'
import { useDeck } from '../hooks/useDeck'
import DeckDisplay from './Deck'
import HandDisplay from './HandDisplay'
import Text from './Text'

export default function MatchUI() {
	const { addCardToHand, cardsInDeck, cardsInHand, drawCard, drawnCard, shuffleDeck } = useDeck(decks.Sinbad.cards)

	return (
		<>
			<div className='h-[100%] w-full flex justify-center items-center border border-white'>
				<Text as='h1' className='text-3xl'>
					Game Board
				</Text>
			</div>
			{/* Hand Area */}
			<div className='flex w-full h-[50%] justify-center items-end'>
				<HandDisplay cards={cardsInHand} />
				<DeckDisplay drawnCard={drawnCard} cards={cardsInDeck} />
			</div>
		</>
	)
}
