import { createLazyFileRoute } from '@tanstack/react-router'
import ScrollableCardOptions, {
	OptionObj,
} from '../components/ScrollableCardOptions'
import Text from '../components/Text'
import { CharacterNameEnum } from '../enums/CharacterNameEnum'
import { useState } from 'react'
import CharacterDescription from '../components/CharacterDescription'

export const Route = createLazyFileRoute('/play')({
	component: Play,
})

function Play() {
	const [selectedCharacter, setSelectedCharacter] = useState<
		OptionObj | undefined
	>(undefined)

	return (
		<div className="relative bg-gray-900">
			{selectedCharacter && (
				<CharacterDescription selected={selectedCharacter} />
			)}

			<div className="flex flex-col w-full min-h-screen items-center">
				<Text
					as="h1"
					className="text-white text-center font-navBarButtons text-[1.5rem] xs:text-[2rem] mt-4"
				>
					CHOOSE YOUR CHARACTER
				</Text>
				<ScrollableCardOptions
					options={options}
					onSelect={setSelectedCharacter}
				/>
			</div>
		</div>
	)
}

const options = [
	{
		bg: 'src/assets/img/monk.png',
		title: CharacterNameEnum.MONK,
		stats: {
			health: 10,
			damage: 10,
		},
	},
	{
		bg: 'src/assets/img/knight.png',
		title: CharacterNameEnum.KNIGHT,
		stats: {
			health: 20,
			damage: 8,
		},
	},
	{
		bg: 'src/assets/img/frog.png',
		title: CharacterNameEnum.FROG,
		stats: {
			health: 5,
			damage: 30,
		},
	},
	{
		bg: 'src/assets/img/princess.png',
		title: CharacterNameEnum.PRINCESS,
		stats: {
			health: 30,
			damage: 5,
		},
	},
]
