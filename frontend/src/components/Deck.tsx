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
		<div className='flex h-[30vh] justify-end items-center gap-4 pr-6'>
			{cards.length > 0 && (
				<button className='aspect-[250/349] h-full' onClick={onClick}>
					<FlippableCard front={cardBack} back={drawnCard?.imagePath} flip={!!drawnCard} />
				</button>
			)}

			<div className='h-full aspect-[250/349]'>
				<div className='flex flex-col justify-start items-center w-full h-full bg-black border border-white rounded-3xl p-2'>
					<Text as='h1' className='text-white text-[1.8rem] text-center'>
						Draw Deck
					</Text>
					<Text as='h1' className='text-white text-[1.0rem]'>
						Cards Left: {cards.length}
					</Text>
				</div>
			</div>
		</div>
	)
}
