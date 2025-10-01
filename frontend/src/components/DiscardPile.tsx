import { useState } from 'react'
import { PlayableCard } from '../../../common/constants/deckInfo'
import Text from './shared/Text'
import { BlurredModal } from './shared/BlurredModal'
import GridList from './shared/GridList'
import { Button } from './shared/Button'

interface DiscardPileProps {
	cards: PlayableCard[]
	title: string
}
export default function DiscardPile({ cards, title }: DiscardPileProps) {
	const [showModal, setShowModal] = useState(false)
	return (
		<div className='flex flex-col gap-1 justify-start items-center bg-black h-[30vh] w-fit p-2'>
			<Text as='h1' className='text-xl w-full p-2'>
				{title}
			</Text>
			{cards.length > 0 && (
				<div
					className='relative aspect-[250/349] rounded-md h-full bg-cover bg-no-repeat bg-center cursor-pointer'
					style={{ backgroundImage: `url(${cards[cards.length - 1].imagePath})` }}
					onClick={() => setShowModal(true)}
				>
					<Button
						className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
						onPress={() => setShowModal(true)}
					>
						View
					</Button>
				</div>
			)}
			{showModal && (
				<BlurredModal headerText={title} setShowModal={setShowModal}>
					<GridList items={cards.map((card) => card.imagePath)} />
				</BlurredModal>
			)}
		</div>
	)
}
