import { createLazyFileRoute } from '@tanstack/react-router'
import CharacterSelection from '../components/CharacterSelection'

export const Route = createLazyFileRoute('/play')({
	component: Play,
})

function Play() {
	return (
		<div className='flex flex-col w-full xl:justify-center gap-20 items-center relative min-h-[calc(100dvh-var(--navbar-height))]'>
			{/* <CreateJoinLobby /> */}
			<CharacterSelection />
			{/* <MatchUI /> */}
		</div>
	)
}
