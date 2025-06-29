import { create } from 'zustand'
import { PlayerType } from '../../../common/types/PlayerType'
import { LobbyType } from '../../../common/types/LobbyType'
import { socket } from 'src/utils/socket'
import { localLoad, localSave } from 'src/utils/localStorage'

type UnchangingValuesType = {
	myPlayerName: string
	lobbyName: string
}

interface LobbyState {
	players: PlayerType[]
	maxPlayers: number | undefined
	host: string
	locked: boolean

	unchangingValues: UnchangingValuesType

	saveUnchangingValues: () => void
	initializeLobby: (lobby: LobbyType) => void
	setMyName: (name: string) => void
	setLobbyName: (host: string) => void
	lockLobby: () => void
	updatePlayer: (player: { name: string; opts: Partial<PlayerType> } | PlayerType) => void
	addPlayer: (player: PlayerType) => void
	removePlayer: (player: PlayerType) => void
}

export const useLobbyStore = create<LobbyState>()((set, get) => {
	return {
		name: '',
		players: [],
		maxPlayers: undefined,
		host: '',
		locked: false,

		unchangingValues: { myPlayerName: '', lobbyName: '' },

		saveUnchangingValues: () => {
			const { unchangingValues } = get()
			console.log('Saving unchanging values:', unchangingValues)
			localSave('unchangingValues-lobby', unchangingValues)
		},
		initializeLobby: (lobby) => {
			const { saveUnchangingValues } = get()
			const myPlayerName = lobby.players.find((p) => p.id === socket.id)?.name

			if (!myPlayerName) throw new Error('Your player name was not found')

			console.log('Initializing lobby:', lobby, myPlayerName)

			const localSave = localLoad('unchangingValues-lobby') as UnchangingValuesType

			console.log('Loaded save:', localSave)

			set({
				...lobby,
				unchangingValues: localSave || { myPlayerName, lobbyName: lobby.name },
			})
			if (!localSave) saveUnchangingValues()
		},
		setMyName: (name: string) => {
			const { unchangingValues } = get()
			set({ unchangingValues: { ...unchangingValues, myPlayerName: name } })
		},
		setLobbyName: (lobbyName: string) => {
			const { unchangingValues } = get()
			set({ unchangingValues: { ...unchangingValues, lobbyName } })
		},
		lockLobby: () => {
			set({ locked: true })
		},
		updatePlayer: (player) => {
			const { players } = get()
			console.log('Updating player:', player)
			set({
				players: players.map((p) =>
					p.name === player.name ? ('opts' in player ? { ...p, ...player.opts } : player) : p
				),
			})
		},
		addPlayer: (player) => {
			const { players } = get()
			set({ players: [...players, player] })
		},
		removePlayer: (player) => {
			const { players } = get()
			set({ players: players.filter((p) => p.id !== player.id) })
		},
	}
})
