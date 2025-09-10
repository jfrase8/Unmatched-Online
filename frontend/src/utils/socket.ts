import { io, Socket } from 'socket.io-client'

const path = '/unmatched/socket.io'

export const socket: Socket = io('http://localhost:8068', { path: path })
