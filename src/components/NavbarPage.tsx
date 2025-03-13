import { useNavigate } from '@tanstack/react-router'
import Text from './Text'
import clsx from 'clsx'

interface NavbarPageProps {
	pageTitle: string
	isCurrent: boolean
}

export default function NavbarPage({ pageTitle, isCurrent }: NavbarPageProps) {
	const navigate = useNavigate()

	return (
		<button
			onClick={() => navigate({ to: `/${pageTitle.toLowerCase()}` })}
			className={clsx(
				`relative h-[--nav-button-h] w-[--nav-button-w] p-2 text-black group shadow-white shadow-[0_4px_8px_0_rgba(0,0,0,0.25)]
				transition-all duration-500 border-2 border-cyan-400 rounded-md min-w-[20%]
				 hover:bg-cyan-400 hover:border-black`,
				isCurrent &&
					'!border-black !bg-cyan-400 !transition-none !rounded-none box-border'
			)}
		>
			<svg className="absolute size-full inset-0 z-0" viewBox="0 0 100% 100%">
				<g
					transform="scale(1) translate(-100, 0)"
					className={clsx(
						'transition-transform duration-700 group-hover:translate-x-[110%] group-hover:rotate-90',
						isCurrent && '!translate-x-[110%] !rotate-90'
					)}
				>
					<polygon
						points="50,15 61,39 88,39 66,57 75,84 50,69 25,84 34,57 12,39 39,39"
						fill="black"
						stroke="black"
					/>
				</g>
				<g
					transform="scale(0.25) translate(-100, 0)"
					className={clsx(
						'transition-transform duration-700 group-hover:translate-x-[110%] group-hover:rotate-90',
						isCurrent && '!translate-x-[110%] !rotate-90'
					)}
				>
					<polygon
						points="50,15 61,39 88,39 66,57 75,84 50,69 25,84 34,57 12,39 39,39"
						fill="white"
						stroke="black"
					/>
				</g>
			</svg>
			<div className="relative z-10 flex justify-center items-center h-full">
				<Text
					as="h1"
					className={`transition-all duration-300 text-black font-navBarButtons text-lg md:text-xl xl:text-[1.5rem]`}
				>
					{pageTitle.toUpperCase()}
				</Text>
			</div>
		</button>
	)
}
