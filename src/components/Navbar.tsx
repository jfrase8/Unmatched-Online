import MainMenuButton from './MainMenuButton'
import GradientBar from './GradientBar'
import NavbarPage from './NavbarPage'

export default function Navbar() {
	return (
		<div className="flex flex-row gap-4 items-center justify-center p-2 bg-gray-600 h-[--navbar-height]">
			<GradientBar>
				<MainMenuButton />
				<NavbarPage pageTitle="Play" />
				<NavbarPage pageTitle="Tutorial" />
				<NavbarPage pageTitle="Settings" />
			</GradientBar>
		</div>
	)
}
