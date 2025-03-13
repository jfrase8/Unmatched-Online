import { createLazyFileRoute } from '@tanstack/react-router'
import CharacterSelection from '../../components/CharacterSelection'
import Text from '../../components/Text'
import { socket } from '../../utils/socket'
import { useEffect, useState } from 'react'
import { Lobby } from '../../types/socketEvents'
import useSocket from '../../hooks/useSocket'
import LoadingState from '../../components/LoadingState'

export const Route = createLazyFileRoute('/lobbies/$lobbyName')({
	component: LobbyScreen,
})

function LobbyScreen() {
	const { lobbyName } = Route.useParams()
	const [lobby, setLobby] = useState<Lobby | undefined>(undefined)

	// Get the lobby info when you first load in
	useEffect(() => {
		socket.emit('getLobby', lobbyName)
	}, [lobbyName])

	useSocket({
		eventName: 'lobbyReturned',
		callBack: (lobby) => {
			setLobby(lobby)
		},
	})

	useSocket({
		eventName: 'lobbyJoined',
		callBack: () => {
			socket.emit('getLobby', lobbyName)
		},
	})

	return (
		<div className='relative flex flex-col w-full h-[calc(100dvh-var(--navbar-height))] bg-gray-900 justify-center items-center'>
			{lobby ? (
				<>
					<Text as='h1' className='absolute top-5 left-5 text-gray-400 pointer-events-none'>
						{lobbyName} - {lobby.players.length} / {lobby.maxPlayers} players
					</Text>
					<CharacterSelection />
				</>
			) : (
				<LoadingState />
			)}
		</div>
	)
}
