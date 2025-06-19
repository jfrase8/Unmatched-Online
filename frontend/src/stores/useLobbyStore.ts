import { create } from 'zustand'
import { PlayerType } from '../../../common/types/PlayerType'
import { LobbyType } from '../../../common/types/LobbyType'

interface LobbyState {
	name: string | undefined
	players: PlayerType[]
	maxPlayers: number | undefined
	initializeLobby: (lobby: LobbyType) => void
	addPlayer: (player: PlayerType) => void
	removePlayer: (player: PlayerType) => void
}

export const useLobbyStore = create<LobbyState>()((set, get) => ({
	name: '',
	players: [],
	maxPlayers: undefined,
	initializeLobby: (lobby) => {
		console.log('Lobby initialized')
		set({ ...lobby })
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
