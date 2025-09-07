import { useOpponent } from 'src/hooks/useOpponent'

export default function OpponentDeckDisplay() {
	const opponent = useOpponent()
	if (!opponent) return null
	return (
		<div className='h-full w-[10%] bg-slate-900 flex justify-center items-center'>
			Cards Left: {opponent.drawPile?.length}
		</div>
	)
}
