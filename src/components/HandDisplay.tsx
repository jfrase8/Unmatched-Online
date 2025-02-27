import { useRef } from 'react'
import { Card } from '../constants/deckInfo'
import { cn } from '../utils/cn'
import { getOverlapMargin } from '../utils/getOverlapMargin'

interface HandDisplayProps {
	cards: Card[]
}
export default function HandDisplay({ cards }: HandDisplayProps) {
	return (
		<div
			className={cn(
				'bg-slate-500 w-[50%] absolute bottom-0 h-[30%] rounded-t-3xl flex items-end justify-center transition-all duration-500 overflow-x-auto'
			)}
		>
			<div className='flex justify-center min-w-full'>
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
	const overlapMargin = index === 0 || cardsInHand < 4 ? 0 : getOverlapMargin(cardsInHand)

	return (
		<img
			src={imagePath}
			style={{ marginLeft: overlapMargin }}
			className='transition-all duration-500 h-[95%] w-[11rem]'
		></img>
	)
}
