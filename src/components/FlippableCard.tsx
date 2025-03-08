import clsx from 'clsx'

interface FlippableCardProps {
	front: string
	back?: string
	flip: boolean
}
export default function FlippableCard({ front, back, flip }: FlippableCardProps) {
	return (
		<div className='group [perspective:1000px]'>
			<div
				className={clsx(
					`grid justify-center items-center h-full rounded-md shadow-xl transition-all
                    duration-500 [transform-style:preserve-3d] `,
					flip && '[transform:rotateY(180deg)]'
				)}
			>
				<div className='col-start-1 row-start-1 rounded-md [backface-visibility:hidden]'>
					<img src={front} className='aspect-[--card-aspect] h-[30vh] p-4 rounded-md object-cover' />
				</div>
				<div className='col-start-1 row-start-1 rounded-md [transform:rotateY(180deg)] [backface-visibility:hidden]'>
					<img src={back} className='aspect-[--card-aspect] h-[30vh] p-4 rounded-md object-cover' />
				</div>
			</div>
		</div>
	)
}
