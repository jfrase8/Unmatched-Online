import { Card } from '../constants/deckInfo'
import FlippableCard from './FlippableCard'
import Text from './Text'

interface DeckProps {
	cards: Card[]
	drawnCard: Card | undefined
	onClick: () => void
	cardBack: string
}
export default function DeckDisplay({ cards, drawnCard, onClick, cardBack }: DeckProps) {
	return (
		<div className='flex h-[30vh] w-[20%] justify-center items-center'>
			<button className='relative h-full w-[60%]' onClick={onClick}>
				<FlippableCard front={cardBack} back={drawnCard?.imagePath} flip={!!drawnCard} />
			</button>
			<div className='h-full w-[40%] pt-4'>
				<div className='flex flex-col justify-start items-center w-full h-fit bg-black border border-white rounded-3xl'>
					<Text as='h1' className='text-white text-[1.8rem] p-1'>
						{' '}
						Draw Deck
					</Text>
					<Text as='h1' className='text-white text-[1.0rem] p-1 px-4'>
						Cards Left: {cards.length}
					</Text>
				</div>
			</div>
		</div>
	)
}
