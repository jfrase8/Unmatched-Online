export interface SocketEvents {
	lobbyCreated: { hostID: number; lobbyName: string }
	createLobbyError: string
}
