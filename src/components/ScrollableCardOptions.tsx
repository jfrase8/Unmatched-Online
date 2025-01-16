import clsx from 'clsx'
import { AttackTypeEnum } from '../enums/AttackTypeEnum'
import { CharacterColorEnum } from '../enums/CharacterColorEnum'
import { CharacterNameEnum } from '../enums/CharacterNameEnum'
import Text from './Text'

interface ScrollableCardOptionsProps {
	options: OptionObj[]
	onSelect: (character: OptionObj) => void
	selected: OptionObj | undefined
}

export default function ScrollableCardOptions({
	options,
	onSelect,
	selected,
}: ScrollableCardOptionsProps) {
	return (
		<div className="flex flex-row mx-2 w-auto max-w-[90svw] h-[16rem] bg-slate-300 rounded-lg overflow-x-auto">
			{options.map((option, i) => (
				<div className="flex items-center justify-center p-2 aspect-[300/500]">
					<OptionCard
						option={option}
						key={i}
						onClick={onSelect}
						isSelected={selected?.title === option.title}
					/>
				</div>
			))}
		</div>
	)
}

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
