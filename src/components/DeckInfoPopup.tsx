import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { CharacterNameEnum } from '../enums/CharacterNameEnum'
import { useCharacterData } from '../hooks/useCharacterInfo'
import Text from './Text'

interface DeckInfoPopupProps {
	character: CharacterNameEnum
	setShowPopup: Dispatch<SetStateAction<boolean>>
}
export default function DeckInfoPopup({
	character,
	setShowPopup,
}: DeckInfoPopupProps) {
	const elementRef = useRef<HTMLDivElement>(null)
	const data = useCharacterData(character)

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			// Check if the click was outside the element
			if (
				elementRef.current &&
				!elementRef.current.contains(e.target as Node)
			) {
				setShowPopup(false)
			}
		}

		// Add event listener on mount
		document.addEventListener('mousedown', handleClickOutside)

		// Clean up the event listener on unmount
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	if (!data) return
	const images = data.deck.images.front

	return (
		<div
			className="fixed inset-10 rounded-lg flex flex-col justify-center items-center z-[100] backdrop-blur bg-black/50 border-l-4 border-b-4"
			style={{ borderColor: data.bgColor }}
			ref={elementRef}
		>
			<div
				className="h-fit w-full rounded-tr-lg"
				style={{
					backgroundColor: data.bgColor,
				}}
			>
				<Text as="h1">{data.title} Deck Info</Text>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 justify-items-center gap-4 overflow-y-auto w-full p-8">
				{images?.map((img) => <img src={img} key={img} />)}
			</div>
		</div>
	)
}
