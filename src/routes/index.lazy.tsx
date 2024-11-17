import { createLazyFileRoute } from '@tanstack/react-router'
import Text from '../components/Text'

export const Route = createLazyFileRoute('/')({
	component: Index,
})

function Index() {
	return (
		<div className='flex w-full min-h-screen bg-gray-900 justify-center'>
			<Text as='h1' className='text-white mt-10 text-[4rem]'>
				Welcome to my Home Page
			</Text>
		</div>
	)
}
