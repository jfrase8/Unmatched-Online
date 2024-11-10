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
	return <Component className={className}>{children}</Component>
}
