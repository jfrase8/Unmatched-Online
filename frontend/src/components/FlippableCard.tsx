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
		<div className='group [perspective:1000px] aspect-[250/349]'>
			{/* Add aspect ratio */}
			<div
				className={clsx(
					`relative w-full h-full transition-transform [transform-style:preserve-3d]`,
					flip ? '[transform:rotateY(180deg)] duration-500' : 'duration-0'
				)}
			>
				<div className='absolute inset-0 [backface-visibility:hidden]'>
					<img
						src={front}
						className={cn('w-full h-full rounded-md object-cover', imageClassName)}
					/>
				</div>
				<div className='absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]'>
					<img src={back} className={cn('w-full h-full rounded-md object-cover', imageClassName)} />
				</div>
			</div>
		</div>
	)
}
