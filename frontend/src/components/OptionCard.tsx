import clsx from 'clsx'
import { OptionObj } from '../../../common/constants/characterInfo'
import Text from './Text'
import { useMemo } from 'react'

interface OptionCardProps {
	option: OptionObj
	onClick: (character: OptionObj) => void
	isSelected: boolean
	className?: string
	/** Name of the player who selected this option */
	playerWhoSelected?: string
}

export default function OptionCard({
	option,
	onClick,
	isSelected,
	className,
	playerWhoSelected,
}: OptionCardProps) {
	const displayedName = useMemo(
		() => (playerWhoSelected ? playerWhoSelected : ''),
		[playerWhoSelected]
	)
	return (
		<button
			className={clsx(
				`flex flex-col items-center justify-between bg-cover bg-no-repeat bg-center size-full rounded-lg border
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
			<span className='flex justify-center items-center h-fit pt-1 max-w-[120.59px]'>
				<Text as='h1' className='text-[1.0rem] text-black truncate'>
					{displayedName}
				</Text>
			</span>
			<Text as='h1' className='text-[1.0rem]'>
				{option.title.toUpperCase()}
			</Text>
		</button>
	)
}
