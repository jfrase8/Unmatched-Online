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
			className={`relative h-[--nav-button-h] w-[--nav-button-w] p-2 text-black group shadow-white shadow-[0_4px_8px_0_rgba(0,0,0,0.25)]
				transition-all duration-500 border-2 border-cyan-400 bg-black rounded-md min-w-[20%]
				 hover:bg-cyan-400 hover:w-[--nav-button-hover-w] hover:h-[--nav-button-h] hover:border-black`}
		>
			<svg className="absolute size-full inset-0 z-0" viewBox="0 0 100% 100%">
				<g transform="scale(0.25) translate(-100, 0)" className='transition-transform duration-700 group-hover:translate-x-[110%] group-hover:rotate-90'>
    				<polygon points="50,15 61,39 88,39 66,57 75,84 50,69 25,84 34,57 12,39 39,39" fill="white" stroke='black'/>
  				</g>
			</svg>
			<div className="relative z-10 flex justify-center items-center h-full">
    <Text
      as="h1"
      className={`transition-all duration-300 text-white text-xxs xxs:text-sm font-navBarButtons lg:text-2xl xs:text-base
           group-hover:text-black`}
    >
      {pageTitle.toUpperCase()}
    </Text>
  </div>
		</button>
	)
}
