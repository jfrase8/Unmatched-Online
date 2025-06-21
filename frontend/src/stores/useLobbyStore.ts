import { create } from 'zustand'
import { PlayerType } from '../../../common/types/PlayerType'
import { LobbyType } from '../../../common/types/LobbyType'

interface LobbyState {
	name: string | undefined
	players: PlayerType[]
	maxPlayers: number | undefined
	host: string
	locked: boolean
	initializeLobby: (lobby: LobbyType) => void
	lockLobby: () => void
	updatePlayer: (player: PlayerType) => void
	addPlayer: (player: PlayerType) => void
	removePlayer: (player: PlayerType) => void
}

export const useLobbyStore = create<LobbyState>()((set, get) => ({
	name: '',
	players: [],
	maxPlayers: undefined,
	host: '',
	locked: false,
	initializeLobby: (lobby) => {
		set({ ...lobby, host: lobby.players.find((p) => p.host)?.id })
	},
	lockLobby: () => set({ locked: true }),
	updatePlayer: (player) => {
		const { players } = get()
		set({ players: players.map((p) => (p.id === player.id ? player : p)) })
	},
	addPlayer: (player) => {
		const { players } = get()
		set({ players: [...players, player] })
	},
	removePlayer: (player) => {
		const { players } = get()
		set({ players: players.filter((p) => p.id !== player.id) })
	},
}))
