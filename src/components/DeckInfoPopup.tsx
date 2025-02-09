import { CharacterNameEnum } from '../enums/CharacterNameEnum'
import { useCharacterData } from '../hooks/useCharacterInfo'
import Text from './Text'

interface DeckInfoPopupProps {
	character: CharacterNameEnum
}
export default function DeckInfoPopup({ character }: DeckInfoPopupProps) {
	const data = useCharacterData(character)
	if (!data) return
	const images = data.deck.images.front

	return (
		<div
			className="fixed inset-10 rounded-lg flex flex-col justify-center items-center z-[100] backdrop-blur bg-black/50 border-l-4 border-b-4"
			style={{ borderColor: data.bgColor }}
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
				{images?.map((img) => <img src={img} />)}
			</div>
		</div>
	)
}
