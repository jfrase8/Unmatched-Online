import { useCallback, useState } from 'react'
import { Notification } from '../components/NotificationList'
import { NotificationTypeEnum } from '../enums/NotificationTypeEnum'

/** Hook for the Notification Component. You can set a custom time for how long
 * you want the notification to show beore disappearing.
 */
export default function useNotification(showTime: number = 3000) {
	const [notifList, setNotifList] = useState<Notification[]>([])
	const fadeTime = 1000 // Time for fade-out effect

	const setNotif = useCallback(
		(message: string, type: NotificationTypeEnum) => {
			const id = Date.now()
			const newNotif: Notification = { id, message, fade: 'in', type }
			setNotifList((prev) => [...prev, newNotif])

			setTimeout(() => {
				setNotifList((prev) => prev.map((notif) => (notif.id === id ? { ...notif, fade: 'out' } : notif)))

				setTimeout(() => {
					setNotifList((prev) => prev.filter((notif) => notif.id !== id))
				}, fadeTime)
			}, showTime)
		},
		[showTime, fadeTime]
	)

	return { notifList, setNotif }
}
