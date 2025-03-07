import clsx from 'clsx'
import { Card } from '../constants/deckInfo'
import { useState } from 'react'

interface HandDisplayProps {
	cards: Card[]
}
export default function HandDisplay({ cards }: HandDisplayProps) {
	return (
		<div className='flex items-center max-w-[40%] h-[30vh] overflow-x-auto overflow-y-hidden bg-slate-400 transition-all duration-500'>
			<div className='flex gap-2 min-w-max p-4 transition-all duration-500 h-full'>
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
	const [hovering, setHovering] = useState(false)

	const getMargin = () => {
		if (cardsInHand < 4) return '-ml-[1rem]'
		switch (cardsInHand) {
			case 4:
				return '-ml-[2rem]'
			case 5:
				return '-ml-[3rem]'
			case 6:
				return '-ml-[4.2rem]'
			case 7:
				return '-ml-[5.4rem]'
			case 8:
				return '-ml-[6.3rem]'
			case 9:
				return '-ml-[7rem]'
			case 10:
				return '-ml-[7.5rem]'
		}
		if (cardsInHand > 10) return '-ml-[8rem]'
	}

	return (
		<div
			className={clsx(
				'shadow-lg rounded-md transition-all duration-500 border border-black h-full',
				index !== 0 && getMargin(),
				hovering && 'z-[100] scale-[110%]'
			)}
			onMouseEnter={() => setHovering(true)}
			onMouseLeave={() => setHovering(false)}
		>
			<img src={imagePath} className={clsx('aspect-[--card-aspect] size-full rounded-md')} />
		</div>
	)
}
