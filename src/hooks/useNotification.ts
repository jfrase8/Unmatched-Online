import { useCallback, useEffect, useMemo, useState } from 'react'

/** Hook for the Notification Component. You can set a custom time for how long
 * you want the notification to show beore disappearing.
 */
export default function useNotification(showTime: number = 3000) {
	const [isShowing, setIsShowing] = useState<boolean>(false)
	const [fade, setFade] = useState<'in' | 'out' | null>(null)
	const [message, setMessage] = useState<string>('')

	const fadeTime = 1000 // milliseconds

	const setNotif = useCallback((message: string) => {
		setMessage(message)
		setTimeout(() => setFade('in'), 1)
		setIsShowing(true)
	}, [])

	useEffect(() => {
		if (isShowing)
			setTimeout(() => {
				setFade('out')
				setTimeout(() => {
					setIsShowing(false)
					setFade(null)
				}, fadeTime)
			}, showTime)
	}, [isShowing, showTime])

	return useMemo(
		() => ({
			isShowing,
			fade,
			message,
			setNotif,
		}),
		[fade, isShowing, message, setNotif]
	)
}
