import { Dispatch, SetStateAction } from 'react'
import { ToggleType } from './CharacterDescription'
import { cn } from 'src/utils/cn'

interface ToggleProps {
	toggleOptions: ToggleType[]
	toggle: ToggleType
	setToggle: Dispatch<SetStateAction<ToggleType>>
}
export default function Toggle({ toggleOptions, toggle, setToggle }: ToggleProps) {
	return (
		<div className='flex justify-center items-center bg-slate-800 rounded-2xl p-1 h-fit w-full gap-1'>
			{toggleOptions.map((option, i) => (
				<button
					key={option}
					className={cn(
						'px-4 py-2 w-full h-full bg-slate-700 text-white transition-colors duration-500',
						i === 0 && 'rounded-l-xl',
						i === toggleOptions.length - 1 && 'rounded-r-xl',
						toggle === option && 'bg-slate-500'
					)}
					onClick={() => setToggle(option)}
				>
					{option}
				</button>
			))}
		</div>
	)
}
