import clsx from 'clsx'
import Text from './Text'
import { forwardRef } from 'react'
import { OptionObj } from '../constants/characterInfo'
import { cn } from '../utils/cn'

interface ScrollableCardOptionsProps {
	/** The set of options to choose from */
	options: OptionObj[]
	/** What happens when you select an option */
	onSelect: (character: OptionObj) => void
	/** The selected option */
	selected: OptionObj | undefined
	/** If you should lock in the selected option */
	lockOption?: boolean
	className?: string
}

const ScrollableCardOptions = forwardRef<HTMLDivElement, ScrollableCardOptionsProps>(
	({ options, onSelect, selected, className, lockOption }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(
					`relative flex flex-row w-auto max-w-[90svw] h-[16rem] bg-slate-300 rounded-lg overflow-x-auto`,
					className
				)}
			>
				{options.map((option, i) => {
					const isSelected = selected?.title === option.title
					const optionClassName = lockOption
						? isSelected
							? 'brightness-110 pointer-events-none'
							: 'brightness-50 pointer-events-none'
						: ''
					return (
						<div key={i} className='flex items-center justify-center p-2 aspect-[300/500]'>
							<OptionCard option={option} onClick={onSelect} isSelected={isSelected} className={optionClassName} />
						</div>
					)
				})}
			</div>
		)
	}
)

interface OptionCardProps {
	option: OptionObj
	onClick: (character: OptionObj) => void
	isSelected: boolean
	className?: string
}

function OptionCard({ option, onClick, isSelected, className }: OptionCardProps) {
	return (
		<button
			className={clsx(
				`flex items-end justify-center bg-cover bg-no-repeat bg-center size-full rounded-lg border
                transition-all duration-500 hover:opacity-90 hover:shadow-black hover:shadow-lg`,
				isSelected && 'border-black shadow-black shadow-lg',
				className
			)}
			style={{
				backgroundImage: `url(${option.bg})`,
				backgroundColor: option.bgColor,
			}}
			onClick={() => onClick(option)}
		>
			<Text as='h1' className='text-[1.0rem]'>
				{option.title.toUpperCase()}
			</Text>
		</button>
	)
}

export default ScrollableCardOptions
