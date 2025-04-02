import { characters, OptionObj } from '../constants/characterInfo'
import Text from './Text'

interface CharacterDescriptionProps {
	selected: OptionObj | undefined
	onDeckClick: () => void
	onHeroClick: () => void
}

export default function CharacterDescription({ selected, onDeckClick, onHeroClick }: CharacterDescriptionProps) {
	if (!selected) return null

	// Get the full character info from selected
	const character = characters.find((c) => c.title === selected.title)
	if (!character) throw Error('Selected character info not found')

	return (
		<div className='flex size-full p-2'>
			<div
				className='w-full flex justify-center items-center border p-2 gap-8'
				style={{ borderColor: character.bgColor }}
			>
				<div className='flex flex-col justify-center w-[50%] h-full'>
					<Text as='h1'>Hero Ability</Text>
					<div className='overflow-y-auto size-fit px-2 flex flex-col justify-center- items-center gap-4'>
						<Text as='h2' className='text-white text-base'>
							{character.specialAbility}
						</Text>
						<button
							className='size-fit py-2 px-8 text-black bg-slate-400 rounded-2xl border-slate-700 hover:bg-slate-500 transition-colors'
							onClick={onHeroClick}
						>
							More Info
						</button>
					</div>
				</div>
				<div className='flex flex-col justify-center items-center h-full w-[30%]'>
					<Text as='h1'>Deck Info</Text>
					<div className='w-[70%] h-full flex justify-center items-center hover:rotate-90 transition-all duration-300 cursor-pointer'>
						<button className='size-fit' onClick={onDeckClick}>
							<img src={character.deck.cardBack} className='object-contain w-full h-fit' />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
