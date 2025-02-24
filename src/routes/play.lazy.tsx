import { createLazyFileRoute } from '@tanstack/react-router'
import CreateJoinLobby from '../components/CreateJoinLobby'

export const Route = createLazyFileRoute('/play')({
	component: Play,
})

function Play() {
	return (
		<div className='flex w-full h-[calc(100dvh-var(--navbar-height))] bg-gray-900 justify-center items-center'>
			<CreateJoinLobby />
		</div>
	)
}
