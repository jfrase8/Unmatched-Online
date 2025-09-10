import MainMenuButton from './MainMenuButton'
import GradientBar from './GradientBar'
import NavbarPage from './NavbarPage'
import { useRouterState } from '@tanstack/react-router'

export default function Navbar() {
	// Get the state of the current route
	const router = useRouterState()

	const pathname = router.location.pathname

	return (
		<div className='flex flex-row gap-4 items-center justify-center p-2 bg-gray-600 h-[--navbar-height]'>
			<GradientBar>
				<MainMenuButton isCurrent={pathname.endsWith('/')} />
				<NavbarPage pageTitle='Play' isCurrent={pathname.includes('/play')} />
				<NavbarPage pageTitle='Tutorial' isCurrent={pathname.includes('/tutorial')} />
				<NavbarPage pageTitle='Settings' isCurrent={pathname.includes('/settings')} />
				<NavbarPage pageTitle='Test Play' isCurrent={pathname.includes('/testPlay')} />
			</GradientBar>
		</div>
	)
}
