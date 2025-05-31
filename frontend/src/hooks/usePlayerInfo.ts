import { useEffect, useState } from 'react'
import { Player, SocketEvents } from '../types/socketEvents'
import useSocket from './useSocket'
import { socket } from '../utils/socket'

export function usePlayerInfo(socketID?: string) {
	if (!socketID) throw new Error('Could not find a connected socket')

	const [playerInfo, setPlayerInfo] = useState<Player | undefined>(undefined)

	console.log(playerInfo)

	useEffect(() => {
		socket.emit('getPlayerInfo', socket.id)
	}, [])

	useSocket({
		eventName: 'sendPlayerInfo',
		callBack: (player: SocketEvents['sendPlayerInfo']) => {
			// Check if you chose the character
			setPlayerInfo(player)
		},
	})

	return { ...playerInfo }
}
