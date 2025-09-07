import { cn } from '../utils/cn'

interface TextProps {
	as: React.ElementType
	className?: string
	style?: React.CSSProperties
	children: React.ReactNode
}

const TextStyles = {
	h1: 'text-white text-center font-navBarButtons text-[1.5rem] uppercase',
	h2: 'text-black text-center text-[1.25rem] font-bold',
} as Record<string, string>

export default function Text({ as: Component, className, style, children }: TextProps) {
	return (
		<Component className={cn(TextStyles[Component as string], className)} style={style}>
			{children}
		</Component>
	)
}
