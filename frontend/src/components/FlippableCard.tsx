import clsx from 'clsx'
import { cn } from 'src/utils/cn'

interface FlippableCardProps {
	/** Src path for the front image of the card */
	front: string
	/** Src path for the front image of the card */
	back?: string
	/** Whether the card is flipped or not */
	flip: boolean
	/** Class name for the card images */
	imageClassName?: string
}
export default function FlippableCard({ front, back, flip, imageClassName }: FlippableCardProps) {
	return (
		<div className='group [perspective:1000px]'>
			<div
				className={clsx(
					`grid justify-center items-center h-full rounded-md transition-all
                    duration-500 [transform-style:preserve-3d] `,
					flip && '[transform:rotateY(180deg)]'
				)}
			>
				<div className='col-start-1 row-start-1 rounded-md [backface-visibility:hidden]'>
					<img
						src={front}
						className={cn('aspect-[--card-aspect] h-[60vh] p-4 rounded-md object-cover', imageClassName)}
					/>
				</div>
				<div className='col-start-1 row-start-1 rounded-md [transform:rotateY(180deg)] [backface-visibility:hidden]'>
					<img
						src={back}
						className={cn('aspect-[--card-aspect] h-[60vh] p-4 rounded-md object-cover', imageClassName)}
					/>
				</div>
			</div>
		</div>
	)
}
