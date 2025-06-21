import clsx from 'clsx'
import { forwardRef } from 'react'
import { OptionObj } from '../constants/characterInfo'
import { cn } from '../utils/cn'
import OptionCard from './OptionCard'
import { TakenCharacter } from './CharacterSelection'

interface ScrollableCardOptionsProps {
	/** The set of options to choose from */
	options: OptionObj[]
	/** What happens when you select an option */
	onSelect: (character: OptionObj) => void
	/** The selected option */
	selected: OptionObj | undefined
	/** If you should lock in the selected option */
	lockOption?: boolean
	/** A list of the names of characters already chosen by other players */
	takenCharacters: TakenCharacter[]
	className?: string
}

const ScrollableCardOptions = forwardRef<HTMLDivElement, ScrollableCardOptionsProps>(
	({ options, onSelect, selected, className, lockOption, takenCharacters }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(
					`relative flex flex-row w-auto max-w-[90svw] h-[16rem] bg-slate-300 rounded-lg overflow-x-auto`,
					className
				)}
			>
				{options.map((option, i) => {
					const selectedByYou = selected?.title === option.title
					const chosenByOther = takenCharacters.some((char) => char.character === option.title)
					const chosenBaseStyle = (lockOption || chosenByOther) && 'pointer-events-none'
					const brightnessStyle = chosenByOther
						? 'brightness-[.4]'
						: selectedByYou
							? 'brightness-110'
							: lockOption && 'brightness-[.9]'

					return (
						<div key={i} className='flex items-center justify-center p-2 aspect-[300/500]'>
							<OptionCard
								option={option}
								onClick={onSelect}
								isSelected={selectedByYou}
								className={clsx(chosenBaseStyle, brightnessStyle)}
								playerWhoSelected={takenCharacters.find((char) => char.character === option.title)?.playerName}
							/>
						</div>
					)
				})}
			</div>
		)
	}
)

export default ScrollableCardOptions
