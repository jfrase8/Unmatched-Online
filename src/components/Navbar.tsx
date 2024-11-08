import { Link } from '@tanstack/react-router'
import MainMenuButton from './MainMenuButton'

export default function Navbar() {
	return (
		<div className="flex flex-row items-center justify-between p-2 bg-gray-600 h-[--navbar-height]">
			<MainMenuButton />
			<Link to="/about" className="[&.active]:font-bold">
				New Page
			</Link>
		</div>
	)
}
