import { io, Socket } from 'socket.io-client'

const path = '/unmatched/socket.io'

export const socket: Socket = io('https://axiomdev.net', { path: path })
