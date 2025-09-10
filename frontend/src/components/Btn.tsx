import { ButtonHTMLAttributes } from 'react'
import { cn } from 'src/utils/cn'

type BtnProps = {
	disabledStyles?: string
	className?: string
	children: React.ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>
export default function Btn({ disabledStyles, className, children, ...buttonProps }: BtnProps) {
	return (
		<button
			className={cn(
				`size-fit py-2 px-8 text-black border-2 bg-slate-800 rounded-2xl border-slate-800 hover:brightness-90 transition-all shadow-lg duration-500`,
				className,
				buttonProps.disabled && (disabledStyles || 'opacity-30 pointer-events-none bg-white')
			)}
			{...buttonProps}
		>
			{children}
		</button>
	)
}
