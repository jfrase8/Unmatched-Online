import { PlayableCard } from '../constants/deckInfo'
import { CharacterNameEnum } from '../enums/CharacterNameEnum'

export type PlayerType = {
	id: string
	name: string
	character?: CharacterNameEnum
	stats?: PlayerStatsType
	hand?: PlayableCard[]
	drawPile?: PlayableCard[]
	discardPile?: PlayableCard[]
	drawnCard?: PlayableCard
	isTurn: boolean
}

export type PlayerStatsType = { mainCharacter: { health: number }; sidekick?: SidekickType }
export type SidekickType = { health: number } | { health: number }[]
