import { characters, CharacterStats, OptionObj, SideKick } from '../constants/characterInfo'
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter'
import { seperateCamelCase } from '../utils/seperateCamelCase'
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
	const characterStats = character.stats
	const sidekick = character.sideKick

	return (
		<div className='flex flex-col size-full p-2'>
			<div
				className='w-full max-h-1/2 flex justify-center items-center border p-2'
				style={{ borderColor: character.bgColor }}
			>
				<Text as='h2' className='text-white'>
					<b>Hero Ability:</b> {character.specialAbility}
				</Text>
			</div>
			<div className='flex size-full'>
				<div className='w-1/3 h-full flex flex-col border justify-center' style={{ borderColor: character.bgColor }}>
					<Text as='h1'>Stats</Text>
					{Object.keys(characterStats).map((key) => (
						<Text key={key} as='h2' className='text-white pl-4'>
							{`${seperateCamelCase(capitalizeFirstLetter(key))}: ${characterStats[key as keyof CharacterStats]}`}
						</Text>
					))}
				</div>
				<div className='w-1/3 h-full flex flex-col border justify-center' style={{ borderColor: character.bgColor }}>
					<Text as='h1'>Sidekick</Text>
					{sidekick
						? Object.keys(sidekick).map((key) => (
								<Text key={key} as='h2' className='text-white pl-4'>
									{`${seperateCamelCase(capitalizeFirstLetter(key))}: ${sidekick[key as keyof SideKick]}`}
								</Text>
							))
						: 'None'}
				</div>
				<div
					className='w-1/3 h-full flex flex-col border items-center gap-1 justify-center'
					style={{ borderColor: character.bgColor }}
				>
					<Text as='h1'>Deck Info</Text>
					<div className='w-[40%] h-fit flex justify-center items-center hover:rotate-90 transition-all duration-300 cursor-pointer'>
						<button className='size-fit' onClick={onDeckClick}>
							<img src={character.deck.cardBack} className='object-contain w-full h-fit' />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
