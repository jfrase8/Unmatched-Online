import { create } from 'zustand'
import { PlayerType } from '../../../common/types/PlayerType'
import { LobbyType } from '../../../common/types/LobbyType'
import { socket } from 'src/utils/socket'
import { localLoad, localSave } from 'src/utils/localStorage'

type ClientOnlyType = {
	myPlayerName: string
}

interface LobbyState {
	// Server and client
	name: string
	players: PlayerType[]
	maxPlayers: number | undefined
	host: string
	locked: boolean

	// Client-only
	clientOnly: ClientOnlyType

	saveClientOnlyValues: () => void
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

		clientOnly: { myPlayerName: '' },

		saveClientOnlyValues: () => {
			const { clientOnly } = get()
			localSave('clientOnly-lobby', clientOnly)
		},
		initializeLobby: (lobby) => {
			const { saveClientOnlyValues } = get()
			const myPlayerName = lobby.players.find((p) => p.id === socket.id)?.name

			if (!myPlayerName) throw new Error('Your player name was not found')

			console.log('Initializing lobby:', lobby, myPlayerName)

			const localSave = localLoad('clientOnly-lobby') as ClientOnlyType

			console.log('Loaded save:', localSave)

			set({
				...lobby,
				clientOnly: localSave || { myPlayerName, takenCharacters: [] },
			})
			if (!localSave) saveClientOnlyValues()
		},
		setMyName: (name: string) => {
			const { clientOnly } = get()
			set({ clientOnly: { ...clientOnly, myPlayerName: name } })
		},
		setLobbyName: (name: string) => set({ name }),
		lockLobby: () => {
			set({ locked: true })
		},
		updatePlayer: (player) => {
			const { players } = get()
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
