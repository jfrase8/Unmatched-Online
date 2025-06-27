import { createLazyFileRoute } from '@tanstack/react-router'
import MatchUI from 'src/components/MatchUI'

export const Route = createLazyFileRoute('/testPlay')({
	component: TestPlay,
})

function TestPlay() {
	return (
		<div className='flex flex-col size-full items-center relative'>
			<MatchUI />
		</div>
	)
}
