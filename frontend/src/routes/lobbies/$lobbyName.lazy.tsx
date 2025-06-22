import { createLazyFileRoute } from '@tanstack/react-router'
import CharacterSelection from '../../components/CharacterSelection'
import LobbyInfo from '../../components/LobbyInfo'
import { useEffect } from 'react'
import { useLobbyStore } from 'src/stores/useLobbyStore'
import { socket } from 'src/utils/socket'

export const Route = createLazyFileRoute('/lobbies/$lobbyName')({
	component: LobbyScreen,
})

function LobbyScreen() {
	const { name, initializeLobby, myPlayerName, updatePlayer } = useLobbyStore()

	useEffect(() => {
		// Initialize data after a reload
		if (name === '') {
			// Reinitialize the lobby
			initializeLobby()

			// Set our id to new socket id
			socket.emit('setPlayerID', name, socket.id, myPlayerName)
			updatePlayer({ name: myPlayerName, opts: { id: socket.id } })
		}
	}, [initializeLobby, myPlayerName, name, updatePlayer])

	return (
		<div className='flex flex-col w-full xl:justify-center items-center relative min-h-[calc(100dvh-var(--navbar-height))]'>
			<LobbyInfo />
			<CharacterSelection />
		</div>
	)
}
