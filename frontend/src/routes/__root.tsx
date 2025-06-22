import { createRootRoute, Outlet } from '@tanstack/react-router'
import Navbar from '../components/Navbar'

const RootRoute = createRootRoute({
	component: () => (
		<>
			<Navbar />
			<div className='min-h-[calc(100dvh-var(--navbar-height))] bg-gray-900 flex flex-col'>
				<Outlet />
			</div>
		</>
	),
})

export { RootRoute }
export const Route = RootRoute
