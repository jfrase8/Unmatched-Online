import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router'
import Navbar from '../components/Navbar'
import { cn } from 'src/utils/cn'

function RootLayout() {
	const { location } = useRouterState()
	const isTestPlay = location.pathname.includes('/testPlay')
	return (
		<>
			{!isTestPlay && <Navbar />}
			<div
				className={cn(
					'min-h-[calc(100dvh-var(--navbar-height))] bg-gray-900 flex flex-col',
					isTestPlay && 'h-screen'
				)}
			>
				<Outlet />
			</div>
		</>
	)
}

const RootRoute = createRootRoute({
	component: RootLayout,
})

export { RootRoute }
export const Route = RootRoute
