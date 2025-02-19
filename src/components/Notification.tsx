import { useMemo } from 'react'
import Text from './Text'
import { cn } from '../utils/cn'
import { NotificationTypeEnum } from '../enums/NotificationTypeEnum'

interface NotificationProps {
	message: string
	isShowing: boolean
	fade: 'in' | 'out' | null
	className: string
	type: NotificationTypeEnum
}
export default function Notification({ message, isShowing, fade, className, type }: NotificationProps) {
	const styles = useMemo(() => (fade === 'in' ? 'opacity-100' : 'opacity-0'), [fade])
	return (
		isShowing && (
			<div
				className={cn(
					'fixed top-10 w-fit h-10 bg-slate-500 rounded-lg py-2 px-4 transition-all duration-500 opacity-0 flex gap-2 justify-center items-center',
					styles,
					className
				)}
			>
				{type === NotificationTypeEnum.ERROR && <img src='src/assets/svg/error.svg' className='size-8'></img>}
				<Text as='h2'>{message}</Text>
			</div>
		)
	)
}
