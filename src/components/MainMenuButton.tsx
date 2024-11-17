import { useNavigate } from '@tanstack/react-router'
import clsx from 'clsx'

interface MainMenuButtonProps {
	isCurrent: boolean
}

export default function MainMenuButton({isCurrent}: MainMenuButtonProps) {
	const navigate = useNavigate()

	const backToMenu = () => {
		navigate({ to: '/' })
	}

	return (
		<>
			<button
				onClick={backToMenu}
				className={clsx(`-translate-x-1 flex justify-center items-center transform transition-all duration-500 
					size-[--menu-button-h]
					hover:size-[--menu-button-hover-h] hover:-rotate-90`, isCurrent && '!size-[--menu-button-hover-h] !-rotate-90')}
			>
				<img src="src/assets/svg/back-to-home.svg"></img>
			</button>
		</>
	)
}
