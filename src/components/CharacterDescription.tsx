import { characters, OptionObj } from '../constants/characterInfo'
import Text from './Text'

interface CharacterDescriptionProps {
	selected: OptionObj | undefined
	onDeckClick: () => void
}

export default function CharacterDescription({ selected, onDeckClick }: CharacterDescriptionProps) {
	if (!selected) return

	// Get the full character info from selected
	const character = characters.find((c) => c.title === selected.title)
	if (!character) throw Error('Selected character info not found')

	return (
		<div className='flex size-full p-2'>
			<div className='w-full flex justify-center items-center border p-2' style={{ borderColor: character.bgColor }}>
				<div className='flex flex-col justify-center size-full'>
					<Text as='h2' className='text-white'>
						Hero Info
					</Text>
				</div>
				<div className='flex flex-col justify-center items-center size-full'>
					<Text as='h1'>Deck Info</Text>
					<div className='w-[40%] h-full flex justify-center items-center hover:rotate-90 transition-all duration-300 cursor-pointer'>
						<button className='size-fit' onClick={onDeckClick}>
							<img src={character.deck.cardBack} className='object-contain w-full h-fit' />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
