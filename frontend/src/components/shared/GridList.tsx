interface GridListProps {
	items: string[]
}
export default function GridList({ items }: GridListProps) {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 justify-items-center gap-4 overflow-y-auto w-full p-8'>
			{items.map((item) => (
				<img src={item} key={item} />
			))}
		</div>
	)
}
