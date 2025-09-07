import { useOpponent } from 'src/hooks/useOpponent'
import NumberWheel from './NumberWheel'
import { characters } from '../../../common/constants/characterInfo'
import { CharacterColorMap } from '../../../common/constants/CharacterColor'
import Text from './Text'

export default function OpponentCharacterDisplay() {
	const opponent = useOpponent()
	if (!opponent || !opponent.character) return null

	const characterInfo = characters[opponent.character]
	const characterColor = CharacterColorMap[opponent.character]
	return (
		<div className='h-full w-[30%] bg-slate-600 flex justify-center items-center flex-col'>
			<Text as='h1'>{opponent.character}</Text>
			<NumberWheel
				min={0}
				max={characterInfo.stats.health}
				selectedNumber={opponent.stats?.mainCharacter.health}
				color={characterColor}
			/>
		</div>
	)
}
