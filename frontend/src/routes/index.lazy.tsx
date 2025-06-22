import { createLazyFileRoute } from '@tanstack/react-router'
import Text from '../components/Text'

export const Route = createLazyFileRoute('/')({
	component: Index,
})

function Index() {
	return (
		<div className='flex w-full h-[calc(100dvh-var(--navbar-height))] bg-gray-900 justify-center items-center'>
			<Text as='h1' className='text-white text-[10rem] font-navBarButtons'>
				Unmatched Online
			</Text>
		</div>
	)
}
