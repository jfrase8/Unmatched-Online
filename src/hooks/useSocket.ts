import { useEffect } from 'react'
import { SocketEvents } from '../types/socketEvents'
import { socket } from '../utils/socket'

interface useSocketProps<K extends keyof SocketEvents> {
	eventName: string
	callBack: (data: SocketEvents[K]) => void
}
export default function useSocket<K extends keyof SocketEvents>({ eventName, callBack }: useSocketProps<K>) {
	useEffect(() => {
		socket.on(eventName, callBack)
		return () => {
			socket.off(eventName, callBack)
		}
	}, [eventName, callBack])
}
