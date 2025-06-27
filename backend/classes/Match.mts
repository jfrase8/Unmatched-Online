import { MatchPlayerType } from '../../common/types/MatchPlayerType'
import { PlayerType } from '../../common/types/PlayerType'
import { PlayableCard } from '../../frontend/src/constants/deckInfo'

export default class Match {
	players: MatchPlayer[]
	constructor(players: MatchPlayer[]) {
		this.players = players
	}
}

class MatchPlayer implements MatchPlayerType {
	playerInfo: PlayerType
	hand: PlayableCard[]
	drawPile: PlayableCard[]
	discardPile: PlayableCard[]
	drawnCard: PlayableCard
	isTurn: boolean

	constructor(
		playerInfo: PlayerType,
		hand: PlayableCard[],
		drawPile: PlayableCard[],
		discardPile: PlayableCard[],
		drawnCard: PlayableCard,
		isTurn: boolean
	) {
		this.playerInfo = playerInfo
		this.hand = hand
		this.drawPile = drawPile
		this.discardPile = discardPile
		this.drawnCard = drawnCard
		this.isTurn = isTurn
	}

	get() {
		return {
			playerInfo: this.playerInfo,
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
