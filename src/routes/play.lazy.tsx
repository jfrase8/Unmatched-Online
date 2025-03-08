import { createLazyFileRoute } from '@tanstack/react-router'
import HandDisplay from '../components/HandDisplay'
import { decks } from '../constants/deckInfo'
import CreateJoinLobby from '../components/CreateJoinLobby'
import CharacterSelection from '../components/CharacterSelection'
import Text from '../components/Text'
import DeckDisplay from '../components/Deck'
import { useDeck } from '../hooks/useDeck'

export const Route = createLazyFileRoute('/play')({
	component: Play,
})

function Play() {
	const { addCardToHand, cardsInDeck, cardsInHand, drawCard, drawnCard, shuffleDeck } = useDeck(decks.Sinbad.cards)

	return (
		<div className='flex flex-col w-full h-[calc(100dvh-var(--navbar-height))] bg-gray-900 justify-center items-center relative'>
			{/* <CreateJoinLobby /> */}

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
			{/* <CharacterSelection /> */}
		</div>
	)
}
