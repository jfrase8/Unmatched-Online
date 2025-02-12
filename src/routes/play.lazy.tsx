import { createLazyFileRoute } from '@tanstack/react-router'
import CharacterSelection from '../components/CharacterSelection'

export const Route = createLazyFileRoute('/play')({
	component: Play,
})

function Play() {
	return (
		<div className='flex w-full h-[calc(100dvh-var(--navbar-height))] bg-gray-900 justify-center items-center'>
			<CharacterSelection />
		</div>
	)
}
