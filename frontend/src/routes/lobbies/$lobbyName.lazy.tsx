import { createLazyFileRoute } from '@tanstack/react-router'
import CharacterSelection from '../../components/character-selection/CharacterSelection'
import LobbyInfo from '../../components/LobbyInfo'

export const Route = createLazyFileRoute('/lobbies/$lobbyName')({
	component: LobbyScreen,
})

function LobbyScreen() {
	return (
		<div className='flex flex-col w-full xl:justify-center items-center relative min-h-[calc(100dvh-var(--navbar-height))]'>
			<LobbyInfo />
			<CharacterSelection />
		</div>
	)
}
