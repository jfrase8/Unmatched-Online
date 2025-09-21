import { CharacterColorMap } from '../../../../common/constants/CharacterColor'
import { characters } from '../../../../common/constants/characterInfo'
import { PlayerType, SingleSidekickType } from '../../../../common/types/PlayerType'
import LoadingState from '../shared/LoadingState'
import NumberWheel from '../shared/NumberWheel'
import Text from '../shared/Text'

export default function KingArthurInventory({ stats: currentStats }: PlayerType) {
	const KingArthurData = characters['King Arthur']
	if (!currentStats) return <LoadingState />
	const sidekickStats = currentStats.sidekick as SingleSidekickType

	return (
		<div className='flex gap-6 justify-center items-center h-full'>
			<div className='flex gap-2'>
				{/* Sidekick Health Tracker */}
				<div className='flex flex-col gap-1 justify-center items-center'>
					<Text as='h1' className='text-lg'>
						{KingArthurData.sideKick.name}
					</Text>
					<NumberWheel
						max={KingArthurData.sideKick.health}
						min={0}
						selectedNumber={sidekickStats.health}
						color={CharacterColorMap['King Arthur']}
						size='small'
					/>
				</div>
				{/* King Arthur Health Tracker */}
				<div className='flex flex-col gap-1 justify-center items-center'>
					<Text as='h1'>King Arthur</Text>
					<NumberWheel
						max={KingArthurData.stats.health}
						min={0}
						selectedNumber={currentStats.mainCharacter.health}
						color={CharacterColorMap['King Arthur']}
						bg={KingArthurData.deck.cardBack}
					/>
				</div>
			</div>
		</div>
	)
}
