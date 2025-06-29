import { useCallback, useEffect } from 'react'
import { decks } from '../constants/deckInfo'
import DeckDisplay from './DeckDisplay'
import HandDisplay from './HandDisplay'
import Text from './Text'
import { useDeckStore } from 'src/stores/useDeckStore'
import { useLobbyStore } from 'src/stores/useLobbyStore'
import { localLoad } from 'src/utils/localStorage'
import { socket } from 'src/utils/socket'
import { useFlagStore } from 'src/stores/useFlagStore'
import useSocket from 'src/hooks/useSocket'

export default function MatchUI() {
	const {
		unchangingValues: { myPlayerName, lobbyName },
		updatePlayer,
		initializeLobby,
	} = useLobbyStore()
	const {
		drawnCard,
		addToHand,
		setDrawnCard,
		drawPile,
		removeFromDeck,
		hand,
		initializeDeck,
		setCharacterName,
		characterName,
	} = useDeckStore()

	const { initializedPage, setInitializedPage } = useFlagStore()

	useEffect(() => {
		// Initialize data after a reload or when first joining a new lobby
		if (!initializedPage) {
			// If this is our first time loading the page, use the player name
			// Else use the name saved to local storage because this is a refresh
			const nameForEvent =
				myPlayerName === ''
					? (localLoad('unchangingValues-lobby').myPlayerName as string)
					: myPlayerName

			const lobbyNameForEvent =
				myPlayerName === '' ? (localLoad('unchangingValues-lobby').lobbyName as string) : lobbyName
			// Set our id to new socket id if it has changed
			socket.emit('updatePlayerID', lobbyNameForEvent, socket.id, nameForEvent)
			// Set initializedPage flag to true
			setInitializedPage(true)
		}
	}, [initializeDeck, initializedPage, lobbyName, myPlayerName, setInitializedPage])

	useSocket({
		eventName: 'playerUpdated',
		callBack: (player) => {
			console.log('Player updated:', player)
			updatePlayer(player)
		},
	})

	// This socket event is emitted by server after updating our playerID
	useSocket({
		eventName: 'setLobby',
		callBack: (lobby) => {
			initializeLobby(lobby)
			const myCharacter = lobby.players.find((p) => p.id === socket.id)?.character
			if (!myCharacter) throw new Error('Your character was not found')
			initializeDeck(decks[myCharacter])
			setCharacterName(myCharacter)
		},
	})

	const clickEffect = useCallback(() => {
		if (drawnCard) {
			addToHand(drawnCard)
			removeFromDeck(drawnCard)
			setDrawnCard(undefined)
		} else {
			setDrawnCard(drawPile[0])
		}
	}, [addToHand, drawPile, drawnCard, removeFromDeck, setDrawnCard])

	return (
		<>
			<div className='size-full flex justify-center items-center border border-white'>
				<Text as='h1' className='text-3xl'>
					Game Board
				</Text>
			</div>
			{/* Hand Area */}
			<div className='flex w-full h-[50%] justify-center items-center border border-white gap-4'>
				<HandDisplay cards={hand} />
				{characterName && (
					<DeckDisplay
						drawnCard={drawnCard}
						cards={drawPile}
						onClick={clickEffect}
						cardBack={decks[characterName].cardBack}
					/>
				)}
			</div>
		</>
	)
}
