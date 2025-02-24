export interface SocketEvents {
	lobbyCreated: Lobby
	errorMessage: string
	lobbyReturned: Lobby
}

export type SocketCallback<T extends keyof SocketEvents> = (data: SocketEvents[T]) => void

export type Lobby = {
	name: string
	players: number[]
	maxPlayers: number
}
