import { createLazyFileRoute } from '@tanstack/react-router'
import CharacterSelection from '../components/CharacterSelection'

export const Route = createLazyFileRoute('/play')({
	component: Play,
})

function Play() {
	return (
		<div className='flex flex-col w-full justify-center gap-20 items-center relative'>
			{/* <CreateJoinLobby /> */}
			<CharacterSelection />
			{/* <MatchUI /> */}
		</div>
	)
}
