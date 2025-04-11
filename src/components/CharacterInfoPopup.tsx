import { Dispatch, SetStateAction, useMemo } from 'react'
import { CharacterNameEnum } from '../enums/CharacterNameEnum'
import { useCharacterData } from '../hooks/useCharacterInfo'
import { decks } from '../constants/deckInfo'
import { SortTypeEnum } from '../enums/SortTypeEnum'
import { sortDeck } from '../utils/sort'
import { BlurredPopup } from './BlurredPopup'
import { capitalizeFirstLetter } from 'src/utils/capitalizeFirstLetter'

interface CharacterInfoPopupProps {
	/** The name of the character to show the info for */
	character: CharacterNameEnum
	/** The state function for setting the popup type that should show */
	setShowPopup: Dispatch<SetStateAction<string | undefined>>
	/** The state value for the popup type that should show */
	infoContent: string
}

/** Modal component that shows when clicking on view more for a character when choosing a character to play */
export default function CharacterInfoPopup({ character, setShowPopup, infoContent }: CharacterInfoPopupProps) {
	const data = useCharacterData(character)

	const headerText = useMemo(
		() => `${data?.title} ${capitalizeFirstLetter(infoContent)} Info`,
		[data?.title, infoContent]
	)

	if (!data) return
	// We want the images displayed here to be sorted by card type
	const sortedImages = sortDeck(decks[character], SortTypeEnum.TYPE).map((card) => card.imagePath)

	return (
		<BlurredPopup headerText={headerText} borderColor={data.bgColor} setShowPopup={setShowPopup}>
			{infoContent === 'deck' ? (
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 justify-items-center gap-4 overflow-y-auto w-full p-8'>
					{sortedImages.map((img) => (
						<img src={img} key={img} />
					))}
				</div>
			) : (
				<div className='flex size-full justify-center items-center'>
					<img src={data.characterSheet} className='size-[85%] object-contain aspect-[1277/911]' />
				</div>
			)}
		</BlurredPopup>
	)
}
