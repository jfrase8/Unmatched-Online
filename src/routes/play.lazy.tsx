import { createLazyFileRoute } from '@tanstack/react-router'
import MatchUI from '../components/MatchUI'
import CreateJoinLobby from '../components/CreateJoinLobby'

export const Route = createLazyFileRoute('/play')({
	component: Play,
})

function Play() {
	return (
		<div className='flex flex-col w-full h-[calc(100dvh-var(--navbar-height))] bg-gray-900 justify-center items-center relative overflow-y-hidden'>
			{/* <CreateJoinLobby /> */}
			{/* <CharacterSelection /> */}
			<MatchUI />
		</div>
	)
}
