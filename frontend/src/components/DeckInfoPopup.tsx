import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { CharacterNameEnum } from '../../../common/enums/CharacterNameEnum'
import { useCharacterData } from '../hooks/useCharacterInfo'
import Text from './Text'
import { decks } from '../constants/deckInfo'
import { SortTypeEnum } from '../../../common/enums/SortTypeEnum'
import { sortDeck } from '../utils/sort'

interface DeckInfoPopupProps {
	character: CharacterNameEnum
	setShowPopup: Dispatch<SetStateAction<boolean>>
}
export default function DeckInfoPopup({ character, setShowPopup }: DeckInfoPopupProps) {
	const elementRef = useRef<HTMLDivElement>(null)
	const data = useCharacterData(character)

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			// Check if the click was outside the element
			if (elementRef.current && !elementRef.current.contains(e.target as Node)) {
				setShowPopup(false)
			}
		}

		// Add event listener on mount
		document.addEventListener('mousedown', handleClickOutside)

		// Clean up the event listener on unmount
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [setShowPopup])

	if (!data) return
	// We want the images displayed here to be sorted by card type
	const sortedImages = sortDeck(decks[character], SortTypeEnum.TYPE).map((card) => card.imagePath)

	return (
		<div className='fixed inset-0 flex flex-col justify-center items-center z-[100] backdrop-blur bg-gray-400/10 cursor-pointer'>
			<div
				className='cursor-default fixed inset-10 rounded-lg flex flex-col justify-center items-center z-[100] backdrop-blur bg-black/50 border-l-4 border-b-4'
				style={{ borderColor: data.bgColor }}
				ref={elementRef}
			>
				<div
					className='h-fit w-full rounded-tr-lg'
					style={{
						backgroundColor: data.bgColor,
					}}
				>
					<Text as='h1'>{data.title} Deck Info</Text>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 justify-items-center gap-4 overflow-y-auto w-full p-8'>
					{sortedImages.map((img) => (
						<img src={img} key={img} />
					))}
				</div>
			</div>
		</div>
	)
}
