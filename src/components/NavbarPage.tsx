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
			className={`bg-gray-900 border-2 border-black h-[--menu-button-h] w-[--nav-button-w] p-2 text-cyan-200
                rounded-xl`}
		>
			<Text as="h1" className="text-base">
				{pageTitle}
			</Text>
		</button>
	)
}
