import { CharacterColorMap } from '../../../../common/constants/CharacterColor'
import { characters } from '../../../../common/constants/characterInfo'
import { PlayerType } from '../../../../common/types/PlayerType'
import LoadingState from '../shared/LoadingState'
import NumberWheel from '../shared/NumberWheel'
import Text from '../shared/Text'

export default function AliceInventory({ stats: currentStats }: PlayerType) {
	const medusaData = characters.Alice

	if (!currentStats) return <LoadingState />

	return (
		<div className='flex flex-col gap-1 justify-center'>
			<Text as='h1'>Alice</Text>
			<NumberWheel
				max={medusaData.stats.health}
				min={0}
				selectedNumber={currentStats.mainCharacter.health}
				color={CharacterColorMap.Alice}
				bg={medusaData.deck.cardBack}
			/>
		</div>
	)
}
