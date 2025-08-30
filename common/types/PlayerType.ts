import { PlayableCard } from '../constants/deckInfo'
import { CharacterNameEnum } from '../enums/CharacterNameEnum'

export type PlayerType = {
	id: string
	name: string
	character?: CharacterNameEnum
	hand?: PlayableCard[]
	drawPile?: PlayableCard[]
	discardPile?: PlayableCard[]
	drawnCard?: PlayableCard
	isTurn: boolean
}
