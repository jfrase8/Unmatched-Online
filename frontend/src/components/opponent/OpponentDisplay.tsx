import { useOpponent } from 'src/hooks/useOpponent'
import OpponentCharacterDisplay from './OpponentCharacterDisplay'
import OpponentDeckDisplay from './OpponentDeckDisplay'
import OpponentHandDisplay from './OpponentHandDisplay'
import DiscardPile from '../DiscardPile'

export default function OpponentDisplay() {
	const opponent = useOpponent()
	return (
		<div className='flex items-center w-full h-[40%] border-white bg-slate-300'>
			<OpponentCharacterDisplay />
			<OpponentHandDisplay />
			<OpponentDeckDisplay />
			<DiscardPile cards={opponent?.discardPile ?? []} title='Discard Pile' />
		</div>
	)
}
