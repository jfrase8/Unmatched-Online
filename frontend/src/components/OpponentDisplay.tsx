import OpponentCharacterDisplay from './OpponentCharacterDisplay'
import OpponentDeckDisplay from './OpponentDeckDisplay'
import OpponentHandDisplay from './OpponentHandDisplay'

export default function OpponentDisplay() {
	return (
		<div className='flex items-center w-full h-[40%] border-white bg-slate-300'>
			<OpponentCharacterDisplay />
			<OpponentHandDisplay />
			<OpponentDeckDisplay />
		</div>
	)
}
