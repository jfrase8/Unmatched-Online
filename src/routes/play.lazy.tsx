import { createLazyFileRoute } from '@tanstack/react-router'
import ScrollableCardOptions, {
	OptionObj,
} from '../components/ScrollableCardOptions'
import Text from '../components/Text'
import { CharacterNameEnum } from '../enums/CharacterNameEnum'
import { useState } from 'react'
import CharacterDescription from '../components/CharacterDescription'
import { AttackTypeEnum } from '../enums/AttackTypeEnum'
import { CharacterColorEnum } from '../enums/CharacterColorEnum'

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
					selected={selectedCharacter}
				/>
			</div>
		</div>
	)
}

const options = [
	{
		bg: 'src/assets/img/medusa.png',
		bgColor: CharacterColorEnum.GREEN,
		title: CharacterNameEnum.MEDUSA,
		stats: {
			health: 16,
			move: 3,
			attackType: AttackTypeEnum.RANGED,
		},
	},
	{
		bg: 'src/assets/img/sinbad.png',
		bgColor: CharacterColorEnum.ORANGE,
		title: CharacterNameEnum.SINBAD,
		stats: {
			health: 20,
			move: 3,
			attackType: AttackTypeEnum.MELEE,
		},
	},
	{
		bg: 'src/assets/img/alice.png',
		bgColor: CharacterColorEnum.BLUE,
		title: CharacterNameEnum.ALICE,
		stats: {
			health: 5,
			move: 3,
			attackType: AttackTypeEnum.MELEE,
		},
	},
	{
		bg: 'src/assets/img/king-arthur.png',
		bgColor: CharacterColorEnum.RED,
		title: CharacterNameEnum.KING_ARTHUR,
		stats: {
			health: 30,
			move: 3,
			attackType: AttackTypeEnum.MELEE,
		},
	},
]
