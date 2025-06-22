import { create } from 'zustand'
import { PlayerType } from '../../../common/types/PlayerType'
import { LobbyType } from '../../../common/types/LobbyType'
import { localLoad, localSave } from 'src/utils/localStorage'
import { TakenCharacter } from 'src/components/CharacterSelection'
import { socket } from 'src/utils/socket'

interface LobbyState {
	name: string | undefined
	players: PlayerType[]
	myPlayerName: string
	takenCharacters: TakenCharacter[]
	maxPlayers: number | undefined
	host: string
	locked: boolean
	initializeLobby: (lobby?: LobbyType) => void
	lockLobby: () => void
	updatePlayer: (player: { name: string; opts: Partial<PlayerType> } | PlayerType) => void
	addPlayer: (player: PlayerType) => void
	removePlayer: (player: PlayerType) => void
	addTakenCharacter: (character: TakenCharacter) => void
	removeTakenCharacter: (playerName: string) => void
}

export const useLobbyStore = create<LobbyState>()((set, get) => {
	// Sets the new lobby state and also updates local storage
	const saveAndSet = (
		partial: Partial<LobbyState> | ((state: LobbyState) => Partial<LobbyState>)
	) => {
		set(partial)
		localSave('lobby', { ...get() })
	}

	return {
		name: '',
		players: [],
		myPlayerName: '',
		takenCharacters: [],
		maxPlayers: undefined,
		host: '',
		locked: false,
		initializeLobby: (lobby) => {
			const lobbyInfo = lobby || (localLoad('lobby') as LobbyState)
			const myPlayerName = lobbyInfo.players.find((p) => p.id === socket.id)?.name

			console.log('Initializing lobby:', lobby, lobbyInfo, myPlayerName)

			if (!lobby) return set({ ...lobbyInfo })
			saveAndSet({ ...lobbyInfo, host: lobbyInfo.players.find((p) => p.host)?.id, myPlayerName })
		},
		lockLobby: () => {
			saveAndSet({ locked: true })
		},
		updatePlayer: (player) => {
			const { players } = get()
			saveAndSet({
				players: players.map((p) =>
					p.name === player.name ? ('opts' in player ? { ...p, ...player.opts } : player) : p
				),
			})
		},
		addPlayer: (player) => {
			const { players } = get()
			saveAndSet({ players: [...players, player] })
		},
		removePlayer: (player) => {
			const { players } = get()
			saveAndSet({ players: players.filter((p) => p.id !== player.id) })
		},
		addTakenCharacter: (character: TakenCharacter) => {
			const { takenCharacters } = get()
			saveAndSet({ takenCharacters: [...takenCharacters, character] })
		},
		removeTakenCharacter: (playerName: string) => {
			const { takenCharacters } = get()
			saveAndSet({
				takenCharacters: takenCharacters.filter((char) => char.playerName !== playerName),
			})
		},
	}
})
