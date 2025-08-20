import { useCallback, useEffect } from 'react'
import { decks } from '../constants/deckInfo'
import DeckDisplay from './DeckDisplay'
import HandDisplay from './HandDisplay'
import Text from './Text'
import { useMatchStore } from 'src/stores/useMatchStore'
import { useLobbyStore } from 'src/stores/useLobbyStore'
import { localLoad } from 'src/utils/localStorage'
import { socket } from 'src/utils/socket'
import { useFlagStore } from 'src/stores/useFlagStore'
import useSocket from 'src/hooks/useSocket'
import OpponentDisplay from './OpponentDisplay'
import NumberWheel from './NumberWheel'
import { getCharacterColor } from 'src/utils/getCharacterColor'

export default function MatchUI() {
	const {
		unchangingValues: { myPlayerName, lobbyName },
		updatePlayer,
		initializeLobby,
	} = useLobbyStore()
	const {
		deck: {
			drawnCard,
			addToHand,
			setDrawnCard,
			drawPile,
			removeFromDeck,
			hand,
			initializeDeck,
			setDeck,
		},
		setCharacterName,
		characterName,
	} = useMatchStore()

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

			console.log('players', lobby.match)
			if (lobby.match.players.length === 2) {
				// If a match has already started (ie this is a refresh), dont reinitialize the deck
				const playerName = lobby.players.find((p) => p.id === socket.id)?.name
				const myPlayer = lobby.match.players.find((p) => p.playerName === playerName)
				if (!myPlayer) throw new Error('Your player was not found in the match')
				const { drawnCard, hand, drawPile, discardPile } = myPlayer
				setDeck({ drawnCard, hand, drawPile, discardPile })
				setCharacterName(myPlayer.characterName)
				return
			}

			const deckObj = initializeDeck(decks[myCharacter])
			setCharacterName(myCharacter)

			// Send over info as a MatchPlayer object
			const myPlayer = lobby.players.find((p) => p.id === socket.id)
			socket.emit('saveMatchPlayer', {
				playerName: myPlayer?.name,
				characterName: myPlayer?.character,
				...deckObj,
				isTurn: false,
			})
		},
	})

	const clickEffect = useCallback(() => {
		if (drawnCard) {
			addToHand(drawnCard)
			removeFromDeck(drawnCard)
			setDrawnCard(undefined)
			socket.emit('updatePlayerDeck', myPlayerName, {
				drawnCard: undefined,
				drawPile: drawPile.slice(1),
				hand: [...hand, drawnCard],
			})
		} else {
			setDrawnCard(drawPile[0])
			socket.emit('updatePlayerDeck', myPlayerName, { drawnCard: drawPile[0] })
		}
	}, [addToHand, drawPile, drawnCard, hand, myPlayerName, removeFromDeck, setDrawnCard])

	return (
		<>
			<OpponentDisplay />
			<div className='size-full flex justify-center items-center border border-white'>
				<Text as='h1' className='text-3xl'>
					Game Board
				</Text>
			</div>
			{/* Hand Area */}
			<div className='flex w-full h-[50%] justify-center items-center border border-white gap-4'>
				<NumberWheel max={16} min={0} selectedNumber={8} color={getCharacterColor(characterName)} />
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
