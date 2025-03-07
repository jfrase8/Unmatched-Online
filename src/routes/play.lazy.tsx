import { createLazyFileRoute } from '@tanstack/react-router'
import HandDisplay from '../components/HandDisplay'
import { decks } from '../constants/deckInfo'
import CreateJoinLobby from '../components/CreateJoinLobby'
import CharacterSelection from '../components/CharacterSelection'

export const Route = createLazyFileRoute('/play')({
	component: Play,
})

function Play() {
	return (
		<div className='flex w-full h-[calc(100dvh-var(--navbar-height))] bg-gray-900 justify-center items-center'>
			{/* <CreateJoinLobby /> */}
			<HandDisplay cards={[...decks.Alice.cards.slice(0, 3), ...decks.Alice.cards.slice(0, 1)]} />
			{/* <CharacterSelection /> */}
		</div>
	)
}
