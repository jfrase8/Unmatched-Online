import { CharacterColorMap } from '../../../../common/constants/CharacterColor'
import { characters } from '../../../../common/constants/characterInfo'
import { PlayerType } from '../../../../common/types/PlayerType'
import LoadingState from '../shared/LoadingState'
import NumberWheel from '../shared/NumberWheel'
import Text from '../shared/Text'

export default function MedusaInventory({ stats: currentStats }: PlayerType) {
	const medusaData = characters.Medusa

	if (!currentStats) return <LoadingState />

	return (
		<div className='flex flex-col gap-1 justify-center'>
			<Text as='h1'>Medusa</Text>
			<NumberWheel
				max={medusaData.stats.health}
				min={0}
				selectedNumber={currentStats.mainCharacter.health}
				color={CharacterColorMap.Medusa}
				bg={medusaData.deck.cardBack}
			/>
		</div>
	)
}
