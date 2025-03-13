import { useCallback, useEffect } from 'react'
import { SocketCallback, SocketEvents } from '../types/socketEvents'
import { socket } from '../utils/socket'

interface useSocketProps<T extends keyof SocketEvents> {
	eventName: T
	callBack: SocketCallback<T>
}
export default function useSocket<T extends keyof SocketEvents>({ eventName, callBack }: useSocketProps<T>) {
	const memoizedCallback = useCallback(callBack, [eventName, callBack])
	useEffect(() => {
		socket.on(eventName as string, memoizedCallback)
		return () => {
			socket.off(eventName as string, memoizedCallback)
		}
	}, [eventName, memoizedCallback])
}
