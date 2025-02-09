import { useState } from 'react'
import {
	characters,
	CharacterStats,
	OptionObj,
	SideKick,
} from '../constants/characterInfo'
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter'
import { seperateCamelCase } from '../utils/seperateCamelCase'
import Text from './Text'
import DeckInfoPopup from './DeckInfoPopup'

interface CharacterDescriptionProps {
	selected: OptionObj | undefined
}

export default function CharacterDescription({
	selected,
}: CharacterDescriptionProps) {
	const [showPopup, setShowPopup] = useState<boolean>(false) // True if the Deck info popup should be displayed
	if (!selected) return

	// Get the full character info from selected
	const character = characters.find((c) => c.title === selected.title)
	if (!character) throw Error('Selected character info not found')
	const characterStats = character.stats
	const sidekick = character.sideKick

	return (
		<div className="flex flex-col size-full p-2">
			{showPopup && <DeckInfoPopup character={character.title} />}
			<div className="w-full h-1/3 flex justify-center items-center border border-white">
				<Text as="h2" className="text-white">
					{character.description}
				</Text>
			</div>
			<div className="flex size-full">
				<div className="w-1/3 h-full flex flex-col border border-white">
					<Text as="h1">Stats</Text>
					{Object.keys(characterStats).map((key) => (
						<Text key={key} as="h2" className="text-white pl-4">
							{`${seperateCamelCase(capitalizeFirstLetter(key))}: ${characterStats[key as keyof CharacterStats]}`}
						</Text>
					))}
				</div>
				<div className="w-1/3 h-full flex flex-col border border-white">
					<Text as="h1">Sidekick</Text>
					{sidekick
						? Object.keys(sidekick).map((key) => (
								<Text key={key} as="h2" className="text-white pl-4">
									{`${seperateCamelCase(capitalizeFirstLetter(key))}: ${sidekick[key as keyof SideKick]}`}
								</Text>
							))
						: 'None'}
				</div>
				<div className="w-1/3 h-full flex flex-col border border-white items-center gap-3">
					<Text as="h1">Deck Info</Text>
					<div className="w-[40%] h-fit flex justify-center items-center hover:w-[45%] transition-all duration-300 cursor-pointer">
						<button className="size-fit" onClick={() => setShowPopup(true)}>
							<img
								src={character.deck.images.back}
								className="object-contain w-full h-fit"
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
