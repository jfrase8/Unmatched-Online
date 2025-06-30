import { create } from 'zustand'
import { Deck, PlayableCard } from 'src/constants/deckInfo'
import { CharacterNameEnum } from '../../../common/enums/CharacterNameEnum'

interface OpponentState {
	characterName?: CharacterNameEnum
	cardsInDrawPile?: number
	hand: PlayableCard[]
	discardPile: PlayableCard[]

	initializeOpponent: (opponent: Deck) => void
}

export const useOpponentStore = create<OpponentState>()((set, get) => {
	return {
		characterName: undefined,
		cardsInDrawPile: undefined,
		hand: [],
		discardPile: [],

		initializeOpponent: (opponent) => {},
	}
})
