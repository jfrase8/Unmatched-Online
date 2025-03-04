import { Card } from '../constants/deckInfo'

interface HandDisplayProps {
	cards: Card[]
}
export default function HandDisplay({ cards }: HandDisplayProps) {
	return (
		<div className='relative flex justify-center items-center w-[40%] h-[30vh] overflow-x-auto bg-slate-400 p-2'>
			<div className='flex gap-2 min-w-max'>
				{cards.map((card, i) => (
					<CardDisplay key={i} {...card} index={i} cardsInHand={cards.length} />
				))}
			</div>
		</div>
	)
}

interface CardDisplayProps {
	index: number
	cardsInHand: number
}
export function CardDisplay({ name, imagePath, index, cardsInHand }: Card & CardDisplayProps) {
	return (
		<div
			className='bg-gray-200 shadow-lg rounded-md transition-all duration-500 flex-shrink-0'
			style={{
				// Dynamically set width & height based on parent height
				width: `calc(5vh + 5vw)`, // Scales with both height and width for consistency
				height: `90%`, // Keeps the height proportional to HandDisplay
			}}
		>
			<img src={imagePath} className='aspect-[] object-cover rounded-md' />
		</div>
	)
}
