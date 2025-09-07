import { useLobbyStore } from 'src/stores/useLobbyStore'

export function useOpponent() {
	return useLobbyStore((state) =>
		state.players.find((p) => state.myPlayerName && p.name !== state.myPlayerName)
	)
}
