import { useOpponent } from 'src/hooks/useOpponent'
import CharacterInventory from '../inventories/CharacterInventory'

export default function OpponentCharacterDisplay() {
	const opponent = useOpponent()
	if (!opponent || !opponent.character || !opponent.stats) return null

	return (
		<div className='relative h-full w-[30%] bg-slate-600 flex justify-center items-center flex-col'>
			<CharacterInventory character={opponent.character} player={opponent} />
		</div>
	)
}
