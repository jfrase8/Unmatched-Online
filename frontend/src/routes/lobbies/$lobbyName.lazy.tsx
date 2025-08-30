import { createLazyFileRoute } from '@tanstack/react-router'
import CharacterSelection from '../../components/CharacterSelection'
import LobbyInfo from '../../components/LobbyInfo'

export const Route = createLazyFileRoute('/lobbies/$lobbyName')({
	component: LobbyScreen,
})

function LobbyScreen() {
	// const {
	// 	host,
	// 	myPlayerName
	// } = useLobbyStore()

	// const { initializedPage, setInitializedPage } = useFlagStore()

	// const lobbyNameFromParams = Route.useParams().lobbyName

	// useEffect(() => {
	// 	// Initialize data after a reload or when first joining a new lobby
	// 	if (!initializedPage) {
	// 		// If this is our first time loading the page, use the player name we set before navigating
	// 		// Else use the name saved to local storage because this is a refresh
	// 		const nameForEvent =
	// 			myPlayerName === ''
	// 				? (localLoad('unchangingValues-lobby').myPlayerName as string)
	// 				: myPlayerName
	// 		// Set our id to new socket id if it has changed
	// 		socket.emit('updatePlayerID', lobbyNameFromParams, socket.id, nameForEvent)
	// 		setInitializedPage(true)
	// 	}
	// }, [host, initializedPage, lobbyNameFromParams, myPlayerName, setInitializedPage])

	// useSocket({
	// 	eventName: 'playerUpdated',
	// 	callBack: (player) => {
	// 		updatePlayer(player)
	// 	},
	// })

	// // This socket event is emitted by server after updating our playerID
	// useSocket({
	// 	eventName: 'setLobby',
	// 	callBack: (lobby) => {
	// 		initializeLobby(lobby)
	// 	},
	// })

	return (
		<div className='flex flex-col w-full xl:justify-center items-center relative min-h-[calc(100dvh-var(--navbar-height))]'>
			<LobbyInfo />
			<CharacterSelection />
		</div>
	)
}
