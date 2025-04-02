import { Dispatch, SetStateAction } from 'react'
import { CharacterNameEnum } from '../enums/CharacterNameEnum'
import { useCharacterData } from '../hooks/useCharacterInfo'
import { decks } from '../constants/deckInfo'
import { SortTypeEnum } from '../enums/SortTypeEnum'
import { sortDeck } from '../utils/sort'
import { BlurredPopup } from './BlurredPopup'
import Text from './Text'
import { seperateCamelCase } from 'src/utils/seperateCamelCase'
import { capitalizeFirstLetter } from 'src/utils/capitalizeFirstLetter'
import { CharacterStats, SideKick } from 'src/constants/characterInfo'

interface CharacterInfoPopupProps {
	character: CharacterNameEnum
	setShowPopup: Dispatch<SetStateAction<string | undefined>>
	infoContent: string
}
export default function CharacterInfoPopup({ character, setShowPopup, infoContent }: CharacterInfoPopupProps) {
	const data = useCharacterData(character)

	if (!data) return
	// We want the images displayed here to be sorted by card type

	const sortedImages = sortDeck(decks[character], SortTypeEnum.TYPE).map((card) => card.imagePath)

	const characterStats = data.stats
	const sidekick = data.sideKick

	return (
		<BlurredPopup headerText={data.title} borderColor={data.bgColor} setShowPopup={setShowPopup}>
			{infoContent === 'deck' ? (
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 justify-items-center gap-4 overflow-y-auto w-full p-8'>
					{sortedImages.map((img) => (
						<img src={img} key={img} />
					))}
				</div>
			) : (
				<div className='flex size-full'>
					<div className='w-1/3 h-full flex flex-col border justify-center' style={{ borderColor: data.bgColor }}>
						<Text as='h1'>Stats</Text>
						{Object.keys(characterStats).map((key) => (
							<Text key={key} as='h2' className='text-white pl-4'>
								{`${seperateCamelCase(capitalizeFirstLetter(key))}: ${characterStats[key as keyof CharacterStats]}`}
							</Text>
						))}
					</div>
					<div className='w-1/3 h-full flex flex-col border justify-center' style={{ borderColor: data.bgColor }}>
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
						style={{ borderColor: data.bgColor }}
					></div>
				</div>
			)}
		</BlurredPopup>
	)
}
