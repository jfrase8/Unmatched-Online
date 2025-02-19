export interface SocketEvents {
	lobbyCreated: { hostID: number; lobbyName: string }
	createLobbyError: string
}

export type SocketCallback<T extends keyof SocketEvents> = (data: SocketEvents[T]) => void
