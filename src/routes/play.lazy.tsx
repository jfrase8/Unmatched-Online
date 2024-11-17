import { createLazyFileRoute } from '@tanstack/react-router'
import ScrollableCardOptions from '../components/ScrollableCardOptions'
import Text from '../components/Text'

export const Route = createLazyFileRoute('/play')({
  component: Play,
})

function Play() {

  const options = [
    {
      bg: 'src/assets/img/monk.png',
      title: 'Monk'
    }, 
    {
      bg: 'src/assets/img/knight.png',
      title: 'Knight'
    },
    {
      bg: 'src/assets/img/frog.png',
      title: 'Frog'
    },
    {
      bg: 'src/assets/img/princess.png',
      title: 'Princess'
    }
  ]

  return (
    <div className='flex flex-col w-full min-h-screen bg-gray-900 items-center'>
      <Text as='h1' className='text-white text-center font-navBarButtons text-[2rem] mt-4'>CHOOSE YOUR CHARACTER</Text>
      <ScrollableCardOptions options={options}/>
    </div>
  )
}
