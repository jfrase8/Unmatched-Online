import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router'
import Navbar from '../components/navbar/Navbar'
import { cn } from 'src/utils/cn'

function RootLayout() {
	const { location } = useRouterState()
	const isMatch = location.pathname.includes('/testPlay') || location.pathname.includes('/match')
	return (
		<>
			{!isMatch && <Navbar />}
			<div
				className={cn(
					'min-h-[calc(100dvh-var(--navbar-height))] bg-gray-900 flex flex-col',
					isMatch && 'h-screen'
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
