import { PlayableCard } from '../../frontend/src/constants/deckInfo'
import { CharacterNameEnum } from '../enums/CharacterNameEnum'

export type MatchPlayerType = {
	playerName: string
	characterName: CharacterNameEnum
	hand: PlayableCard[]
	drawPile: PlayableCard[]
	discardPile: PlayableCard[]
	drawnCard: PlayableCard
	isTurn: boolean
}
