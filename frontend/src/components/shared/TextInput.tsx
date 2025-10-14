import { InputHTMLAttributes } from 'react'
import { Input } from 'react-aria-components'
import { cn } from 'src/utils/cn'
import { tv } from 'tailwind-variants'

const textInput = tv({
	slots: {
		input: `size-full p-2 rounded-lg text-center shadow-lg outline-none bg-slate-300 focus:bg-slate-100
                        transition-colors duration-500 ring-2 ring-slate-400`,
		wrapper: 'p-1 bg-slate-800 size-full rounded-xl',
	},
})

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
	wrapperClassName?: string
	className?: string
}
export default function TextInput({ wrapperClassName, className, ...inputProps }: TextInputProps) {
	const { input, wrapper } = textInput()
	return (
		<div className={cn(wrapper(), wrapperClassName)}>
			<Input {...inputProps} className={cn(input(), className)} />
		</div>
	)
}
