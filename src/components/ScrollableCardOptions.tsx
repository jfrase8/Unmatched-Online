import { CharacterNameEnum } from '../enums/CharacterNameEnum'
import Text from './Text'

interface ScrollableCardOptionsProps {
	options: OptionObj[]
	onSelect: (character: OptionObj) => void
}

export default function ScrollableCardOptions({
	options,
	onSelect,
}: ScrollableCardOptionsProps) {
	return (
		<div className="flex flex-row mx-2 w-auto max-w-[90svw] h-[20rem] bg-white rounded-lg overflow-x-auto">
			{options.map((option, i) => (
				<div className="flex items-center justify-center p-2 aspect-[341/860]">
					<OptionCard option={option} key={i} onClick={onSelect} />
				</div>
			))}
		</div>
	)
}

interface OptionCardProps {
	option: OptionObj
	onClick: (character: OptionObj) => void
}

function OptionCard({ option, onClick }: OptionCardProps) {
	return (
		<button
			className={`flex items-end justify-center bg-cover bg-no-repeat size-full rounded-lg 
                transition-all duration-500 hover:opacity-90 hover:shadow-black hover:shadow-lg`}
			style={{
				backgroundImage: `url(${option.bg})`,
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
	title: CharacterNameEnum
	stats: {
		health: number
		damage: number
	}
}
