import { decks } from '../../../common/constants/deckInfo'
import DeckDisplay from './DeckDisplay'
import HandDisplay from './HandDisplay'
import Text from './Text'
import { useLobbyStore } from 'src/stores/useLobbyStore'
import { socket } from 'src/utils/socket'
import OpponentDisplay from './OpponentDisplay'
import NumberWheel from './NumberWheel'
import { ClientEmitEnum } from '../../../common/enums/ClientEmitEnum'
import { LobbyType } from '../../../common/types/LobbyType'
import { CharacterColorMap } from '../../../common/constants/CharacterColor'
import { useMyPlayer } from 'src/hooks/useMyPlayer'

export default function MatchUI() {
	const { updateLobby } = useLobbyStore()
	const myPlayer = useMyPlayer()
	console.log('myPlayer:', myPlayer)
	// const {
	// 	deck: {
	// 		drawnCard,
	// 		addToHand,
	// 		setDrawnCard,
	// 		drawPile,
	// 		removeFromDeck,
	// 		hand,
	// 		initializeDeck,
	// 		setDeck,
	// 	},
	// 	setCharacterName,
	// 	characterName,
	// } = useMatchStore()

	// const { initializedPage, setInitializedPage } = useFlagStore()

	// useEffect(() => {
	// 	// Initialize data after a reload or when first joining a new lobby
	// 	if (!initializedPage) {
	// 		// If this is our first time loading the page, use the player name
	// 		// Else use the name saved to local storage because this is a refresh
	// 		const nameForEvent =
	// 			myPlayerName === ''
	// 				? (localLoad('unchangingValues-lobby').myPlayerName as string)
	// 				: myPlayerName

	// 		const lobbyNameForEvent =
	// 			myPlayerName === '' ? (localLoad('unchangingValues-lobby').lobbyName as string) : lobbyName
	// 		// Set our id to new socket id if it has changed
	// 		socket.emit('updatePlayerID', lobbyNameForEvent, socket.id, nameForEvent)
	// 		// Set initializedPage flag to true
	// 		setInitializedPage(true)
	// 	}
	// }, [initializeDeck, initializedPage, lobbyName, myPlayerName, setInitializedPage])

	// useSocket({
	// 	eventName: 'playerUpdated',
	// 	callBack: (player) => {
	// 		updatePlayer(player)
	// 	},
	// })

	// This socket event is emitted by server after updating our playerID
	// useSocket({
	// 	eventName: 'setLobby',
	// 	callBack: (lobby) => {
	// 		initializeLobby(lobby)
	// 		const myCharacter = lobby.players.find((p) => p.id === socket.id)?.character
	// 		if (!myCharacter) throw new Error('Your character was not found')

	// 		console.log('players', lobby.match)
	// 		if (lobby.match.players.length === 2) {
	// 			// If a match has already started (ie this is a refresh), dont reinitialize the deck
	// 			const playerName = lobby.players.find((p) => p.id === socket.id)?.name
	// 			const myPlayer = lobby.match.players.find((p) => p.playerName === playerName)
	// 			if (!myPlayer) throw new Error('Your player was not found in the match')
	// 			const { drawnCard, hand, drawPile, discardPile } = myPlayer
	// 			setDeck({ drawnCard, hand, drawPile, discardPile })
	// 			setCharacterName(myPlayer.characterName)
	// 			return
	// 		}

	// 		const deckObj = initializeDeck(decks[myCharacter])
	// 		setCharacterName(myCharacter)

	// 		// Send over info as a MatchPlayer object
	// 		const myPlayer = lobby.players.find((p) => p.id === socket.id)
	// 		socket.emit('saveMatchPlayer', {
	// 			playerName: myPlayer?.name,
	// 			characterName: myPlayer?.character,
	// 			...deckObj,
	// 			isTurn: false,
	// 		})
	// 	},
	// })

	const clickEffect = () => {
		if (!myPlayer) return
		const { drawnCard } = myPlayer
		console.log('click?', drawnCard)
		if (drawnCard)
			socket.emit(ClientEmitEnum.ADD_CARD_TO_HAND, drawnCard, (lobby: LobbyType) =>
				updateLobby(lobby)
			)
		else socket.emit(ClientEmitEnum.DRAW_CARD, (lobby: LobbyType) => updateLobby(lobby))

		// if (drawnCard) {
		// 	addToHand(drawnCard)
		// 	removeFromDeck(drawnCard)
		// 	setDrawnCard(undefined)
		// 	socket.emit('updatePlayerDeck', name, {
		// 		drawnCard: undefined,
		// 		drawPile: drawPile.slice(1),
		// 		hand: [...hand, drawnCard],
		// 	})
		// } else {
		// 	setDrawnCard(drawPile[0])
		// 	socket.emit('updatePlayerDeck', name, { drawnCard: drawPile[0] })
		// }
	}

	if (!myPlayer || !myPlayer.character || !myPlayer.drawPile || !myPlayer.hand) return null

	const { drawnCard, hand, drawPile, character } = myPlayer

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
				<NumberWheel max={16} min={0} selectedNumber={8} color={CharacterColorMap[character]} />
				<HandDisplay cards={hand} />
				{character && (
					<DeckDisplay
						drawnCard={drawnCard}
						cards={drawPile}
						onClick={clickEffect}
						cardBack={decks[character].cardBack}
					/>
				)}
			</div>
		</>
	)
}
