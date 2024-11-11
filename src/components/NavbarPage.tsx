import { useNavigate } from '@tanstack/react-router'
import Text from './Text'

interface NavbarPageProps {
	pageTitle: string
}

export default function NavbarPage({ pageTitle }: NavbarPageProps) {
	const navigate = useNavigate()
	return (
		<button
			onClick={() => navigate({ to: `/${pageTitle.toLowerCase()}` })}
			className={`relative bg-cyan-500 h-[--menu-button-h] w-[--nav-button-w] p-2 text-black group shadow-white shadow-[0_4px_8px_0_rgba(0,0,0,0.25)]
				transition-all duration-500  border-opacity-0 border-black border-[4px] box-border
				 hover:bg-cyan-400 hover:border-opacity-100 hover:border-[4px] hover:h-[--gradient-bar-h] hover:w-[--nav-button-hover-w] hover:shadow-none`}
		>
			<svg className="absolute size-full inset-0 z-0" viewBox="0 0 100% 50%">
				<line
					className="transition-transform duration-700 group-hover:-translate-y-[25%]"
					x1="0%"
					y1="20%"
					x2="100%"
					y2="20%"
					stroke="black"
					stroke-width={2}
				></line>
				<line
					className="transition-transform duration-700 group-hover:translate-y-[25%]"
					x1="0%"
					y1="80%"
					x2="100%"
					y2="80%"
					stroke="black"
					stroke-width={2}
				></line>
				<line
					className="transition-transform duration-700 group-hover:-translate-x-[25%]"
					x1="20%"
					y1="0%"
					x2="20%"
					y2="100%"
					stroke="black"
					stroke-width={2}
				></line>
				<line
					className="transition-transform duration-700 group-hover:translate-x-[25%]"
					x1="80%"
					y1="0%"
					x2="80%"
					y2="100%"
					stroke="black"
					stroke-width={2}
				></line>
			</svg>
			<Text
				as="h1"
				className="transition-all duration-500 text-base z-20 group-hover:text-3xl font-navBarButtons"
			>
				{pageTitle.toUpperCase()}
			</Text>
		</button>
	)
}
