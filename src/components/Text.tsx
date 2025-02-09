import { cn } from '../utils/cn'

interface TextProps {
	as: React.ElementType
	className?: string
	children: React.ReactNode
}

export default function Text({
	as: Component,
	className,
	children,
}: TextProps) {
	// Styles applied based on the text component chosen
	const h1 = 'text-white text-center font-navBarButtons text-[1.5rem] uppercase'

	const styles = () => {
		switch (Component) {
			case 'h1':
				return h1
			default:
				return ''
		}
	}

	return <Component className={cn(styles(), className)}>{children}</Component>
}
