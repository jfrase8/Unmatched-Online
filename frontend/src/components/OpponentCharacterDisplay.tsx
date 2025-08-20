import { useOpponentStore } from 'src/stores/useOpponentStore'

export default function OpponentCharacterDisplay() {
	const { characterName } = useOpponentStore()
	return (
		<div className='h-full w-[30%] bg-slate-600 flex justify-center items-center'>
			{characterName}
		</div>
	)
}
