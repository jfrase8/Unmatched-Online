import { forwardRef, ReactNode, useRef, useState } from 'react'
import { AriaButtonProps, useButton } from '@react-aria/button'
import { tv, VariantProps } from 'tailwind-variants'

const button = tv({
	base: `px-4 py-2 rounded-md focus:outline-none focus:ring-4 bg-[length:200%_200%] transition-colors
    duration-200 border-2 font-navBarButtons`,
	variants: {
		variant: {
			primary: `bg-gradient-to-r from-slate-800 to-slate-900 border-slate-600 focus:ring-slate-800 text-white 
				hover:border-slate-700 hover:text-slate-300 disabled:text-slate-500 disabled:hover:border-slate-600`,
			secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
			generic:
				'text-black border-slate-900 hover:text-slate-900 focus:ring-slate-800 bg-slate-200 hover:bg-slate-300',
			pulsing:
				'animate-pulse bg-cyan-400 hover:animate-none hover:bg-cyan-400 border-slate-900 hover:border-slate-800',
		},
		animation: {
			wave: 'animate-wave',
		},
		shape: {
			pill: 'rounded-full',
		},
		isIcon: {
			true: 'size-fit p-2 fill-white hover:fill-slate-400 rounded-full',
		},
	},
	defaultVariants: {
		variant: 'primary',
		size: 'md',
	},
})

type ButtonAnimation = VariantProps<typeof button>['animation']

interface ButtonProps extends AriaButtonProps<'button'> {
	children: ReactNode
	variant?: VariantProps<typeof button>['variant']
	shape?: VariantProps<typeof button>['shape']
	isIcon?: boolean
	className?: string
	style?: React.CSSProperties
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, variant = 'primary', shape, isIcon, className, style, ...props }, forwardedRef) => {
		const [animation, setAnimation] = useState<ButtonAnimation>(undefined)

		const localRef = useRef<HTMLButtonElement>(null)

		const ref = forwardedRef && typeof forwardedRef !== 'function' ? forwardedRef : localRef

		const { buttonProps } = useButton(
			{
				...props,
				onPress: (e) => {
					// Remove the animation class
					setAnimation(undefined)

					// Force next tick to reapply it
					requestAnimationFrame(() => {
						setAnimation('wave')
					})
					props.onPress?.(e) // call user's onPress if provided
				},
			},
			ref
		)

		return (
			<button
				{...buttonProps}
				ref={ref}
				className={button({ variant, animation, shape, isIcon, class: className })}
				style={style}
			>
				{children}
			</button>
		)
	}
)
