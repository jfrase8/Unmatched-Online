import clsx from 'clsx'
import { AttackTypeEnum } from '../enums/AttackTypeEnum'
import { CharacterColorEnum } from '../enums/CharacterColorEnum'
import { CharacterNameEnum } from '../enums/CharacterNameEnum'
import Text from './Text'
import { forwardRef } from 'react'

interface ScrollableCardOptionsProps {
	options: OptionObj[]
	onSelect: (character: OptionObj) => void
	selected: OptionObj | undefined
}

const ScrollableCardOptions = forwardRef<
	HTMLDivElement,
	ScrollableCardOptionsProps
>(({ options, onSelect, selected }, ref) => {
	return (
		<div
			ref={ref}
			className="relative flex flex-row w-auto max-w-[90svw] h-[16rem] bg-slate-300 rounded-lg overflow-x-auto"
		>
			{options.map((option, i) => (
				<div
					key={i}
					className="flex items-center justify-center p-2 aspect-[300/500]"
				>
					<OptionCard
						option={option}
						onClick={onSelect}
						isSelected={selected?.title === option.title}
					/>
				</div>
			))}
		</div>
	)
})

interface OptionCardProps {
	option: OptionObj
	onClick: (character: OptionObj) => void
	isSelected: boolean
}

function OptionCard({ option, onClick, isSelected }: OptionCardProps) {
	return (
		<button
			className={clsx(
				`flex items-end justify-center bg-cover bg-no-repeat bg-center size-full rounded-lg border
                transition-all duration-500 hover:opacity-90 hover:shadow-black hover:shadow-lg`,
				isSelected && 'border-black shadow-black shadow-lg'
			)}
			style={{
				backgroundImage: `url(${option.bg})`,
				backgroundColor: option.bgColor,
			}}
			onClick={() => onClick(option)}
		>
			<Text as="h1" className="text-white font-navBarButtons">
				{option.title.toUpperCase()}
			</Text>
		</button>
	)
}

export interface OptionObj {
	bg: string
	bgColor: CharacterColorEnum
	title: CharacterNameEnum
	stats: {
		health: number
		move: number
		attackType: AttackTypeEnum
	}
}

export default ScrollableCardOptions
