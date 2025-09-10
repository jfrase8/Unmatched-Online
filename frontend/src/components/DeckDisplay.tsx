import { Card } from '../constants/deckInfo'
import FlippableCard from './FlippableCard'
import Text from './Text'

interface DeckDisplayProps {
	cards: Card[]
	drawnCard: Card | undefined
	onClick: () => void
	cardBack: string
}
export default function DeckDisplay({ cards, drawnCard, onClick, cardBack }: DeckDisplayProps) {
	return (
		<div className='flex flex-col h-[30vh] gap-2'>
			<div className='h-[5vh] w-full bg-slate-700 flex justify-center items-center shadow-lg rounded-lg'>
				<Text as='h1' className='text-center text-[1.2rem]'>
					Cards Left: {cards.length}
				</Text>
			</div>
			<div className='flex h-[25vh] justify-end items-center gap-4 pr-6'>
				{cards.length > 0 && (
					<button className='relative aspect-[250/349] h-full group' onClick={onClick}>
						{!drawnCard && (
							<div
								className={`group-hover:bg-cyan-500 group-hover:animate-none duration-500 transition-colors absolute z-[2] top-1/2 left-1/2 
							-translate-x-1/2 -translate-y-1/2 bg-cyan-600 rounded-full shadow-xl p-4 animate-pulse`}
							>
								<Text as='h1' className='text-[1.3rem]'>
									Manuever
								</Text>
							</div>
						)}
						<FlippableCard front={cardBack} back={drawnCard?.imagePath} flip={!!drawnCard} />
					</button>
				)}
				<div className='h-full aspect-[250/349]'>
					<div className='flex flex-col justify-start items-center w-full h-full bg-black border border-white rounded-3xl p-2'>
						<Text as='h1' className='text-white text-[1.8rem] text-center'>
							Discarded cards
						</Text>
					</div>
				</div>
			</div>
		</div>
	)
}
