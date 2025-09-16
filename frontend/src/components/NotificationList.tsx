import { useEffect, useState } from 'react'
import Text from './shared/Text'
import { cn } from '../utils/cn'
import { NotificationTypeEnum } from '../../../common/enums/NotificationTypeEnum'
import ErrorIcon from 'src/assets/svg/error.svg?react'

interface NotificationListProps {
	notifList: Notification[]
	className?: string
}
export default function NotificationList({ notifList, className }: NotificationListProps) {
	return (
		<div
			className={cn(
				'fixed size-fit flex flex-col-reverse items-center gap-4 max-h-[13rem] overflow-auto',
				className
			)}
		>
			{notifList.map((notif) => (
				<Notification key={notif.id} {...notif} />
			))}
		</div>
	)
}

export type Notification = {
	id: number
	message: string
	fade: 'in' | 'out' | null
	type: NotificationTypeEnum
}
type NotificationProps = {
	className?: string
} & Notification
function Notification({ message, fade, className, type }: NotificationProps) {
	const [delayedFade, setDelayedFade] = useState<'opacity-0' | 'opacity-100'>('opacity-0')

	useEffect(() => {
		if (fade === 'in') {
			const timeout = setTimeout(() => setDelayedFade('opacity-100'), 1)
			return () => clearTimeout(timeout)
		} else {
			setDelayedFade('opacity-0')
		}
	}, [fade])
	return (
		<div
			className={cn(
				' w-fit h-10 bg-slate-500 rounded-lg py-2 px-4 transition-all duration-500 opacity-0 flex gap-2 justify-center items-center mx-2',
				delayedFade,
				className
			)}
		>
			{type === NotificationTypeEnum.ERROR && (
				<ErrorIcon className='size-8 stroke-black stroke-2' />
			)}
			<Text as='h2'>{message}</Text>
		</div>
	)
}
