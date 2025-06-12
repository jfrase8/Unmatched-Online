import { Socket } from 'socket.io'

export default function emitError(socket: Socket, error: string) {
	socket.emit('errorMessage', error)
}
