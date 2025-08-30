import { useLobbyStore } from 'src/stores/useLobbyStore'

export function useMyPlayer() {
	return useLobbyStore((state) => state.players.find((p) => p.name === state.myPlayerName))
}
