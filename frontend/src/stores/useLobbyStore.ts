import { create } from 'zustand'
import { PlayerType } from '../../../common/types/PlayerType'
import { persist } from 'zustand/middleware'
import { socket } from 'src/utils/socket'
import { LobbyType } from '../../../common/types/LobbyType'
import { ClientEmitEnum } from '../../../common/enums/ClientEmitEnum'

interface LobbyState {
	players: PlayerType[]
	maxPlayers: number | undefined
	host: string
	locked: boolean

	// Values saved to local storage so that they don't reset on refresh
	myPlayerName: string
	lobbyName: string

	updateLobby: (values: Partial<LobbyState>) => void

	fetchLobby: () => void

	reset: () => void
}

const DefaultState = {
	players: [],
	maxPlayers: undefined,
	host: '',
	locked: false,

	myPlayerName: '',
	lobbyName: '',
}

export const useLobbyStore = create<LobbyState>()(
	persist(
		(set, get) => {
			return {
				...DefaultState,

				updateLobby: (values) => set({ ...values }),

				fetchLobby: () => {
					const { myPlayerName, lobbyName } = get()
					if (myPlayerName && lobbyName) {
						console.log('!! Fetching lobby with socket')
						socket.emit(
							// Event name
							ClientEmitEnum.GET_AFTER_REFRESH,
							// Params
							{ lobbyName, playerName: myPlayerName },
							// Callback function
							(lobbyData: LobbyType) =>
								set({
									...lobbyData,
								})
						)
					}
				},

				reset: () => {
					set(DefaultState)
				},
			}
		},
		{
			name: 'lobby-storage',
			partialize: (state) => ({ myPlayerName: state.myPlayerName, lobbyName: state.lobbyName }),
			onRehydrateStorage: () => (state) => {
				if (state) {
					// Call socket after rehydration
					state.fetchLobby()
				}
			},
		}
	)
)
