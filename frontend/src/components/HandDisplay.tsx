import { Card, PlayableCard } from '../../../common/constants/deckInfo'
import { useHoveredElements } from '../hooks/useHoveredElements'
import { useState } from 'react'
import { cn } from '../utils/cn'
import Text from './Text'
import HandDisplayWrapper from './HandDisplayWrapper'
import { getCardMargin } from 'src/utils/getCardMargin'
import { ClientEmitEnum } from '../../../common/enums/ClientEmitEnum'
import { socket } from 'src/utils/socket'
import { CardTypeEnum } from '../../../common/enums/CardTypeEnum'

interface HandDisplayProps {
	cards: PlayableCard[]
	isOpponent?: boolean
}
export default function HandDisplay({ cards }: HandDisplayProps) {
	const { handleHover, hoveredElements, handleMouseLeave } = useHoveredElements('.card')
	const [selected, setSelected] = useState<number>(-1)

	return (
		<>
			<HandDisplayWrapper>
				{cards.map((card, i) => {
					return (
						<CardDisplay
							key={i}
							card={card}
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
			</HandDisplayWrapper>
		</>
	)
}

interface CardDisplayProps {
	card: PlayableCard
	index: number
	cardsInHand: number
	hoveredElements: Element[]
	handleHover: (event: React.MouseEvent<HTMLDivElement>) => void
	handleMouseLeave: () => void
	selected: number
	setSelected: (index: number) => void
}
export function CardDisplay({
	card,
	index,
	cardsInHand,
	hoveredElements,
	handleHover,
	handleMouseLeave,
	selected,
	setSelected,
}: Card & CardDisplayProps) {
	const hovering = hoveredElements.some((e) => Number(e.getAttribute('data-index')) === index)

	const lowestIndex = !hoveredElements.some((e) => Number(e.getAttribute('data-index')) > index)

	const cardSelected = selected === index

	const playCard = () => {
		socket.emit(ClientEmitEnum.PLAY_CARD, card)
		if (card.type === CardTypeEnum.SCHEME) setSelected(-1)
	}

	return (
		<>
			<div
				className={cn(
					'card shadow-lg rounded-md transition-all duration-500 border border-black h-full hover:cursor-pointer',
					index !== 0 && getCardMargin(cardsInHand),
					hovering && lowestIndex && selected === -1 && 'z-[100] scale-[110%]',
					cardSelected && 'z-[100] scale-[110%] brightness-125'
				)}
				onMouseMove={handleHover}
				onMouseLeave={handleMouseLeave}
				data-index={index}
				onClick={() => (cardSelected ? setSelected(-1) : setSelected(index))}
			>
				<img src={card.imagePath} className={'aspect-[--card-aspect] size-full rounded-md'} />
				{cardSelected && (
					<div className='flex flex-col gap-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
						<button
							className={`hover:bg-cyan-500 hover:animate-none duration-500 transition-colors 
								bg-cyan-600 rounded-full shadow-xl px-4 py-2 animate-pulse`}
							onClick={(e) => {
								e.stopPropagation()
								playCard()
							}}
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
			</div>
			{cardSelected && (
				<img
					src={card.imagePath}
					className='fixed top-0 right-0 h-[30rem] aspect-[--card-aspect] z-[10]'
				/>
			)}
		</>
	)
}
