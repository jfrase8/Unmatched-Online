import { Card } from '../constants/deckInfo'
import { useHoveredElements } from '../hooks/useHoveredElements'
import { useState } from 'react'
import { cn } from '../utils/cn'
import Text from './Text'

interface HandDisplayProps {
	cards: Card[]
}
export default function HandDisplay({ cards }: HandDisplayProps) {
	const { handleHover, hoveredElements, handleMouseLeave } = useHoveredElements('.card')
	const [selected, setSelected] = useState<number>(-1)

	return (
		<>
			<div className='w-[40%] bg-slate-700 h-[30vh] rounded-lg shadow-lg'>
				<div className='flex items-center max-w-full z-[1] h-full overflow-x-auto overflow-y-hidden transition-all duration-500'>
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

	const cardSelected = selected === index

	return (
		<>
			<button
				className={cn(
					'shadow-lg rounded-md transition-all duration-500 border border-black h-full card',
					index !== 0 && getMargin(),
					hovering && lowestIndex && selected === -1 && 'z-[100] scale-[110%]',
					cardSelected && 'z-[100] scale-[110%] brightness-125'
				)}
				onMouseMove={handleHover}
				onMouseLeave={handleMouseLeave}
				data-index={index}
				onClick={() => (cardSelected ? setSelected(-1) : setSelected(index))}
			>
				<img src={imagePath} className={'aspect-[--card-aspect] size-full rounded-md'} />
				{cardSelected && (
					<div className='flex flex-col gap-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
						<button
							className={`hover:bg-cyan-500 hover:animate-none duration-500 transition-colors 
								bg-cyan-600 rounded-full shadow-xl px-4 py-2 animate-pulse`}
						>
							<Text as='h1' className='text-[1.3rem]'>
								Play
							</Text>
						</button>
						<button
							className={`hover:bg-gray-600 duration-500 transition-colors bg-gray-500 shadow-xl px-4`}
						>
							<Text as='h2' className='text-[1.0rem]'>
								Cancel
							</Text>
						</button>
					</div>
				)}
			</button>
			{cardSelected && (
				<img
					src={imagePath}
					className='fixed top-0 right-0 h-[30rem] aspect-[--card-aspect] z-[10]'
				/>
			)}
		</>
	)
}
