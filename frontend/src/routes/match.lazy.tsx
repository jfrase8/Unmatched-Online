import { createRoute, redirect } from '@tanstack/react-router'
import MatchUI from 'src/components/MatchUI'
import { RootRoute } from './__root'

export const Route = createRoute({
	getParentRoute: () => RootRoute,
	path: '/match',
	loader: async () => {
		const isReload =
			(performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming)?.type ===
			'reload'
		if (isReload) {
			throw redirect({ to: '/' })
		}
		return {}
	},
	component: Match,
})

function Match() {
	return (
		<div className='size-full flex flex-col gap-20 items-center relative'>
			<MatchUI />
		</div>
	)
}
