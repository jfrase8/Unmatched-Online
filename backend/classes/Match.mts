import { MatchPlayerType } from '../../common/types/MatchPlayerType'
import { PlayableCard } from '../../frontend/src/constants/deckInfo'
import { MatchType } from '../../common/types/MatchType'
import { CharacterNameEnum } from '../../common/enums/CharacterNameEnum'

export default class Match implements MatchType {
	players: MatchPlayer[]
	constructor(players: MatchPlayer[]) {
		this.players = players
	}
	addPlayer(player: MatchPlayerType) {
		this.players.push(new MatchPlayer(player))
	}
	findPlayer(playerName: string) {
		return this.players.find((player) => player.playerName === playerName)
	}
}

export class MatchPlayer implements MatchPlayerType {
	playerName: string
	characterName: CharacterNameEnum
	hand: PlayableCard[]
	drawPile: PlayableCard[]
	discardPile: PlayableCard[]
	drawnCard: PlayableCard
	isTurn: boolean

	constructor(matchPlayer: MatchPlayerType) {
		this.playerName = matchPlayer.playerName
		this.characterName = matchPlayer.characterName
		this.hand = matchPlayer.hand
		this.drawPile = matchPlayer.drawPile
		this.discardPile = matchPlayer.discardPile
		this.drawnCard = matchPlayer.drawnCard
		this.isTurn = matchPlayer.isTurn
	}

	get() {
		return {
			playerName: this.playerName,
			hand: this.hand,
			drawPile: this.drawPile,
			discardPile: this.discardPile,
			drawnCard: this.drawnCard,
			isTurn: this.isTurn,
		}
	}
	set(update: Partial<MatchPlayer>) {
		Object.assign(this, update)
	}
}
