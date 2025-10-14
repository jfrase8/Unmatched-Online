import { ScrollbarStyles } from 'src/styles/ScrollbarStyles'
import { cn } from 'src/utils/cn'

interface GridListProps {
	items: string[]
	className?: string
}
export default function GridList({ items, className }: GridListProps) {
	return (
		<div
			className={cn(
				'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 justify-items-center gap-4 overflow-y-auto w-full p-8',
				ScrollbarStyles,
				className
			)}
		>
			{items.map((item) => (
				<img src={item} key={item} />
			))}
		</div>
	)
}
