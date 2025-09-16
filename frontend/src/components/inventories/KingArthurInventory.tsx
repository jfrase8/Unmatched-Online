import { CharacterColorMap } from '../../../../common/constants/CharacterColor'
import { characters } from '../../../../common/constants/characterInfo'
import { PlayerType } from '../../../../common/types/PlayerType'
import LoadingState from '../shared/LoadingState'
import NumberWheel from '../shared/NumberWheel'
import Text from '../shared/Text'

export default function KingArthurInventory({ stats: currentStats }: PlayerType) {
	const medusaData = characters['King Arthur']

	if (!currentStats) return <LoadingState />

	return (
		<div className='flex flex-col gap-1 justify-center'>
			<Text as='h1'>KingArthur</Text>
			<NumberWheel
				max={medusaData.stats.health}
				min={0}
				selectedNumber={currentStats.mainCharacter.health}
				color={CharacterColorMap['King Arthur']}
				bg={medusaData.deck.cardBack}
			/>
		</div>
	)
}
