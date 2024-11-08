import { useNavigate } from '@tanstack/react-router'

export default function MainMenuButton() {
	const navigate = useNavigate()

	const backToMenu = () => {
		navigate({ to: '/' })
	}

	return (
		<>
			<button
				onClick={backToMenu}
				className={`flex justify-center items-center transform transition-all duration-500 
					size-[--menu-button-h] 
					hover:size-[--menu-button-hover-h] hover:-rotate-90`}
			>
				<img src="src/assets/svg/back-to-home.svg" className=""></img>
			</button>
		</>
	)
}
