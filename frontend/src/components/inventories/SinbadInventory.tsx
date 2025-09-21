import getDiscardedVoyages from 'src/utils/getDiscardedVoyages'
import { CharacterColorMap } from '../../../../common/constants/CharacterColor'
import { characters } from '../../../../common/constants/characterInfo'
import { PlayerType, SingleSidekickType } from '../../../../common/types/PlayerType'
import NumberWheel from '../shared/NumberWheel'
import Text from '../shared/Text'
import LoadingState from '../shared/LoadingState'
import DiscardPile from '../DiscardPile'

export default function SinbadInventory({ discardPile, stats: currentStats, id }: PlayerType) {
	console.log('!!', currentStats, discardPile, id)
	if (!currentStats || !discardPile) return <LoadingState />
	const SinbadData = characters.Sinbad
	const sidekickStats = currentStats.sidekick as SingleSidekickType

	const discardedVoyages = getDiscardedVoyages(discardPile)

	return (
		<div className='flex gap-6 justify-center items-center h-full'>
			{/* Discarded Voyage Cards */}
			<DiscardPile
				cards={discardedVoyages}
				title={`Discarded Voyages: ${discardedVoyages.length}`}
			/>

			<div className='flex gap-2'>
				{/* Sidekick Health Tracker */}
				<div className='flex flex-col gap-1 justify-center items-center'>
					<Text as='h1' className='text-lg'>
						{SinbadData.sideKick.name}
					</Text>
					<NumberWheel
						max={SinbadData.sideKick.health}
						min={0}
						selectedNumber={sidekickStats.health}
						color={CharacterColorMap.Sinbad}
						size='small'
					/>
				</div>
				{/* Sinbad Health Tracker */}
				<div className='flex flex-col gap-1 justify-center items-center'>
					<Text as='h1'>Sinbad</Text>
					<NumberWheel
						max={SinbadData.stats.health}
						min={0}
						selectedNumber={currentStats.mainCharacter.health}
						color={CharacterColorMap.Sinbad}
						bg={SinbadData.deck.cardBack}
					/>
				</div>
			</div>
		</div>
	)
}
