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
import useSocket from 'src/hooks/useSocket'
import { ServerEmitEnum } from '../../../common/enums/ServerEmitEnum'
import { characters } from '../../../common/constants/characterInfo'

export default function MatchUI() {
	const { updateLobby } = useLobbyStore()
	const myPlayer = useMyPlayer()

	const clickEffect = () => {
		if (!myPlayer) return
		const { drawnCard } = myPlayer
		console.log('click?', drawnCard)
		if (drawnCard)
			socket.emit(ClientEmitEnum.ADD_CARD_TO_HAND, drawnCard, (lobby: LobbyType) =>
				updateLobby(lobby)
			)
		else socket.emit(ClientEmitEnum.DRAW_CARD, (lobby: LobbyType) => updateLobby(lobby))
	}

	// Socket events
	useSocket({
		eventName: ServerEmitEnum.PLAYER_DREW_CARD,
		callBack: (lobby) => {
			console.log('Player Drew Card:', lobby)
			updateLobby(lobby)
		},
	})

	useSocket({
		eventName: ServerEmitEnum.PLAYER_PLAYED_CARD,
		callBack: (lobby) => {
			console.log('Player Played Card:', lobby)
			updateLobby(lobby)
		},
	})

	if (!myPlayer || !myPlayer.character || !myPlayer.drawPile || !myPlayer.hand || !myPlayer.stats)
		return null

	const { drawnCard, hand, drawPile, character, stats } = myPlayer

	const characterData = characters[character]

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
				<NumberWheel
					max={characterData.stats.health}
					min={0}
					selectedNumber={stats.mainCharacter.health}
					color={CharacterColorMap[character]}
				/>
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
