export interface SocketEvents {
	lobbyCreated: Lobby
	lobbyJoined: Lobby
	errorMessage: string
	lobbyReturned: Lobby
	characterChosen: {
		playerID: number
		characterName: string
	}
}

export type SocketCallback<T extends keyof SocketEvents> = (data: SocketEvents[T]) => void

export type Lobby = {
	name: string
	players: number[]
	maxPlayers: number
}
