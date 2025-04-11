import { createLazyFileRoute } from '@tanstack/react-router'
import CharacterSelection from '../../components/CharacterSelection'
import { socket } from '../../utils/socket'
import { useEffect, useState } from 'react'
import { Lobby, Player } from '../../types/socketEvents'
import useSocket from '../../hooks/useSocket'
import LoadingState from '../../components/LoadingState'
import LobbyInfo from '../../components/LobbyInfo'

export const Route = createLazyFileRoute('/lobbies/$lobbyName')({
	component: LobbyScreen,
})

function LobbyScreen() {
	const { lobbyName } = Route.useParams()
	const [lobby, setLobby] = useState<Lobby | undefined>(undefined)
	const [players, setPlayers] = useState<Player[] | undefined>(lobby?.players)

	useEffect(() => {
		if (lobby) setPlayers(lobby.players)
	}, [lobby])

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

	useSocket({
		eventName: 'characterChosen',
		callBack: (player) => {
			// Replace the player in the list with the new one
			setPlayers((prev) => prev?.filter((p) => p.id !== player.id)?.concat(player))
		},
	})

	return (
		<div className='relative flex flex-col w-full h-[calc(100dvh-var(--navbar-height))] bg-gray-900 justify-center items-center'>
			{lobby ? (
				<>
					<LobbyInfo lobbyName={lobby.name} players={players} />
					<CharacterSelection />
				</>
			) : (
				<LoadingState />
			)}
		</div>
	)
}
