import { CharacterNameEnum } from '../../common/enums/CharacterNameEnum'
import { PlayerType } from '../../common/types/PlayerType'
import { LobbyType } from '../../common/types/LobbyType'
import { Server } from 'socket.io'
import { PlayableCard } from '../../common/constants/deckInfo'
import { createDeck } from '../utils/createDeck.mts'

export default class LobbySystem {
	lobbies: Lobby[]

	constructor(lobbies: Lobby[] = []) {
		this.lobbies = lobbies
	}

	createLobby(name: string, host: PlayerType) {
		const lobby = new Lobby(name, [new Player(host.id, host.name)], 2, host.name)
		this.lobbies.push(lobby)
		return lobby
	}

	// Get the lobby with this specific name
	getLobbyWithName(lobbyName: string) {
		return this.lobbies.find((lobby) => lobby.lobbyName === lobbyName)
	}

	// Get the lobby containing a specific player's ID
	getLobbyWithID(playerID: string) {
		return this.lobbies.find((lobby) => lobby.players.find((player) => player.id === playerID))
	}

	getLobbyWithPlayerName(playerName: string) {
		return this.lobbies.find((lobby) => lobby.players.find((player) => player.name === playerName))
	}
}

class Lobby implements LobbyType {
	lobbyName: string
	players: Player[]
	maxPlayers: number
	locked: boolean
	host: string

	constructor(name: string, players: Player[], maxPlayers = 2, host: string) {
		this.lobbyName = name
		this.players = players
		this.maxPlayers = maxPlayers
		this.locked = false
		this.host = host
	}

	emitEvent(event: string, io: Server, data?: unknown, excludePlayerIDs?: string[]) {
		for (const player of this.players) {
			// Send the event to all players not excluded
			if (!excludePlayerIDs?.some((id) => id === player.id)) io.to(player.id).emit(event, data)
		}
	}

	join(player: PlayerType) {
		this.players.push(new Player(player.id, player.name))
	}

	getPlayerWithID(playerID: string) {
		return this.players.find((player) => player.id === playerID)
	}

	getPlayerWithName(playerName: string) {
		return this.players.find((player) => player.name === playerName)
	}

	createDecks() {
		this.players.forEach((player) => {
			if (!player.character) throw new Error('Player does not have a character')
			player.set({ drawPile: createDeck(player.character) })
		})
	}

	get() {
		return {
			lobbyName: this.lobbyName,
			players: this.players,
			maxPlayers: this.maxPlayers,
			locked: this.locked,
			host: this.host,
		}
	}
	set(update: Partial<Lobby>) {
		Object.assign(this, update)
	}
}

class Player implements PlayerType {
	id: string
	name: string
	character?: CharacterNameEnum

	// Values for when a match has started
	hand?: PlayableCard[]
	drawPile?: PlayableCard[]
	discardPile?: PlayableCard[]
	drawnCard?: PlayableCard
	isTurn: boolean

	constructor(id: string, name: string, isTurn = false) {
		this.id = id
		this.name = name
		this.isTurn = isTurn
	}

	shuffleDeck() {
		if (!this.drawPile) throw new Error('No deck to shuffle')
		const shuffledDeck = [...this.drawPile]
		for (let i = this.drawPile.length - 1; i > 0; i--) {
			// Generate random index from 0 to i
			const j = Math.floor(Math.random() * (i + 1))
			// Swap elements at i and j
			;[shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]]
		}
		this.drawPile = shuffledDeck
	}

	drawStartingHand() {
		if (!this.drawPile) throw new Error('Player does not have a deck')
		this.hand = this.drawPile.splice(0, 5)
	}

	drawCard() {
		if (!this.drawPile) throw new Error('Player does not have a deck')
		this.drawnCard = this.drawPile[0]
		return this.drawnCard
	}

	addCardToHand(card: PlayableCard) {
		this.hand?.push(card)
		this.drawnCard = undefined
		return this.drawPile?.shift()
	}

	get() {
		return {
			id: this.id,
			name: this.name,
			character: this.character,
			hand: this.hand,
			drawPile: this.drawPile,
			discardPile: this.discardPile,
			drawnCard: this.drawnCard,
			isTurn: this.isTurn,
		}
	}
	set(update: Partial<Player>) {
		Object.assign(this, update)
	}
}
