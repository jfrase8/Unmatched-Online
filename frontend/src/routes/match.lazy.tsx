import { createLazyFileRoute } from '@tanstack/react-router'
import MatchUI from 'src/components/MatchUI'

export const Route = createLazyFileRoute('/match')({
	component: Match,
})

function Match() {
	return (
		<div className='flex flex-col size-full items-center relative'>
			<MatchUI />
		</div>
	)
}
