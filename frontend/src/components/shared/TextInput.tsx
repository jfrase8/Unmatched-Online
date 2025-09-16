import { InputHTMLAttributes } from 'react'
import { cn } from 'src/utils/cn'

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
	wrapperClassName?: string
	className?: string
}
export default function TextInput({ wrapperClassName, className, ...inputProps }: TextInputProps) {
	return (
		<div className={cn('p-1 bg-slate-800 size-full rounded-xl', wrapperClassName)}>
			<input
				{...inputProps}
				className={cn(
					`size-full p-2 rounded-lg text-center shadow-lg outline-none bg-slate-300 focus:bg-slate-100
                        transition-colors duration-500 ring-2 ring-slate-400`,
					className
				)}
			/>
		</div>
	)
}
