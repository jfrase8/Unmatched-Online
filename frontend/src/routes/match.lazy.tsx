import { createLazyFileRoute } from '@tanstack/react-router'
import MatchUI from 'src/components/MatchUI'

export const Route = createLazyFileRoute('/match')({
	component: Match,
})

function Match() {
	return (
		<div className='flex flex-col w-full xl:justify-center gap-20 items-center relative min-h-[calc(100dvh-var(--navbar-height))]'>
			<MatchUI />
		</div>
	)
}
