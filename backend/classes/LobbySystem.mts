import { CharacterNameEnum } from '../../common/enums/CharacterNameEnum.ts'
import { PlayerStatsType, PlayerType } from '../../common/types/PlayerType.ts'
import { LobbyType } from '../../common/types/LobbyType.ts'
import { Server } from 'socket.io'
import { PlayableCard } from '../../common/constants/deckInfo.ts'
import { createDeck } from '../utils/createDeck.mts'
import { characters } from '../../common/constants/characterInfo.ts'
import { CombatRoleEnum } from '../../common/enums/CombatRoleEnum.ts'

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
	stats?: PlayerStatsType
	hand?: PlayableCard[]
	drawPile?: PlayableCard[]
	discardPile?: PlayableCard[]
	drawnCard?: PlayableCard
	isTurn: boolean
	combatRole: CombatRoleEnum
	combatCard?: PlayableCard

	constructor(id: string, name: string, isTurn = false) {
		this.id = id
		this.name = name
		this.isTurn = isTurn
		this.combatRole = CombatRoleEnum.NONE
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

	// Starts an attack phase
	attack(defender: Player, attackCard: PlayableCard) {
		this.combatRole = CombatRoleEnum.ATTACKER
		this.combatCard = attackCard
		defender.set({ combatRole: CombatRoleEnum.DEFENDER })
	}

	// Defends against an attack
	defend(defenseCard: PlayableCard) {
		this.combatCard = defenseCard
	}

	// Plays the scheme card
	playScheme(schemeCard: PlayableCard) {
		// Do the effects on the scheme card //

		// ! Temporary Effect
		if (!this.stats?.mainCharacter || !this.character)
			throw new Error('Player does not have a main character')

		// Gain up to 2 health points (don't go over max health)
		const newHealth = this.stats.mainCharacter.health + 2
		if (newHealth > characters[this.character].stats.health)
			this.stats.mainCharacter.health = characters[this.character].stats.health
		else this.stats.mainCharacter.health += 2

		// Discard the scheme card
		this.hand = this.hand?.filter((card) => card.id !== schemeCard.id)
		this.discardPile?.push(schemeCard)
	}

	setStats() {
		if (!this.character) throw new Error('Player does not have a character')
		const characterData = characters[this.character]

		const sidekick = (() => {
			if (!characterData.sideKick) return undefined
			if (characterData.sideKick.amount !== 1)
				return Array.from({ length: characterData.sideKick.amount }, () => ({
					health: characterData.sideKick.health,
				}))
			return { health: characterData.sideKick.health }
		})()
		this.stats = {
			mainCharacter: {
				health: characterData.stats.health,
			},
			sidekick,
		}
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
