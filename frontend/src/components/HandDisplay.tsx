import { Card } from '../constants/deckInfo'
import { useHoveredElements } from '../hooks/useHoveredElemens'
import { useState } from 'react'
import { cn } from '../utils/cn'

interface HandDisplayProps {
	cards: Card[]
}
export default function HandDisplay({ cards }: HandDisplayProps) {
	const { handleHover, hoveredElements, handleMouseLeave } = useHoveredElements('.card')
	const [selected, setSelected] = useState<number>(-1)

	return (
		<>
			<div className='w-[40%] bg-slate-700 h-[30vh]'>
				<div className='flex items-center max-w-full z-[1] h-full border border-black overflow-x-auto overflow-y-hidden transition-all duration-500'>
					<div className='flex gap-2 min-w-max p-4 transition-all duration-500 h-full'>
						{cards.map((card, i) => {
							return (
								<CardDisplay
									key={i}
									{...card}
									index={i}
									cardsInHand={cards.length}
									hoveredElements={hoveredElements}
									handleHover={handleHover}
									handleMouseLeave={handleMouseLeave}
									setSelected={setSelected}
									selected={selected}
								/>
							)
						})}
					</div>
				</div>
			</div>
		</>
	)
}

interface CardDisplayProps {
	index: number
	cardsInHand: number
	hoveredElements: Element[]
	handleHover: (event: React.MouseEvent<HTMLButtonElement>) => void
	handleMouseLeave: () => void
	selected: number
	setSelected: (index: number) => void
}
export function CardDisplay({
	imagePath,
	index,
	cardsInHand,
	hoveredElements,
	handleHover,
	handleMouseLeave,
	selected,
	setSelected,
}: Card & CardDisplayProps) {
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
	const hovering = hoveredElements.some((e) => Number(e.getAttribute('data-index')) === index)

	const lowestIndex = !hoveredElements.some((e) => Number(e.getAttribute('data-index')) > index)

	return (
		<button
			className={cn(
				'shadow-lg rounded-md transition-all duration-500 border border-black h-full card',
				index !== 0 && getMargin(),
				hovering && lowestIndex && 'z-[100] scale-[110%]',
				selected === index && 'z-[100] scale-[110%] brightness-125'
			)}
			onMouseMove={handleHover}
			onMouseLeave={handleMouseLeave}
			data-index={index}
			onClick={() => (selected === index ? setSelected(-1) : setSelected(index))}
		>
			<img src={imagePath} className={'aspect-[--card-aspect] size-full rounded-md'} />
		</button>
	)
}
