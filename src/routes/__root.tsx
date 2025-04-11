import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Navbar from '../components/Navbar'

export const Route = createRootRoute({
	component: () => (
		<>
			<Navbar />
			<div className='min-h-[calc(100dvh-var(--navbar-height))] bg-gray-900 flex flex-col'>
				<Outlet />
			</div>
			<TanStackRouterDevtools initialIsOpen={false} />
		</>
	),
})
