import { cn } from '../utils/cn'

interface TextProps {
	as: React.ElementType
	className?: string
	style?: React.CSSProperties
	children: React.ReactNode
}

export default function Text({ as: Component, className, style, children }: TextProps) {
	// Styles applied based on the text component chosen
	const h1 = 'text-white text-center font-navBarButtons text-[1.5rem] uppercase'
	const h2 = 'text-black text-center text-[1.25rem] font-bold'

	const styles = () => {
		switch (Component) {
			case 'h1':
				return h1
			case 'h2':
				return h2
			default:
				return ''
		}
	}

	return (
		<Component className={cn(styles(), className)} style={style}>
			{children}
		</Component>
	)
}
