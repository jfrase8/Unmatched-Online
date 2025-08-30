import { CharacterNameEnum } from '../enums/CharacterNameEnum'
import { AttackTypeEnum } from '../enums/AttackTypeEnum'
import { SidekickNameEnum } from '../enums/SidekickNameEnum'
import { Deck, decks } from './deckInfo'
import { CharacterColor, CharacterColorMap } from './CharacterColor'

export type Character = {
	title: CharacterNameEnum
	description: string
	specialAbility: string
	optionBg: string
	characterSheet: string
	splitCharacterSheet: { front: string; back: string }
	bgColor: CharacterColor
	stats: { health: number; move: number; attackType: AttackTypeEnum }
	sideKick: { name: SidekickNameEnum; health: number; attackType: AttackTypeEnum; amount: number }
	deck: Deck
}

export const characters = {
	[CharacterNameEnum.MEDUSA]: {
		description:
			'The Gorgon with the gaze that felled thousands. With her harpies at her side, you better have a defense in hand when she turns her eyes to you.',
		specialAbility: `At the start of your turn, you may deal 1 damage to an opposing fighter in Medusa's zone.`,
		optionBg: '/assets/img/medusa.png',
		characterSheet: '/assets/img/main-menu/medusa_character_sheet.jpg',
		splitCharacterSheet: {
			front: '/assets/img/main-menu/medusa_char_sheet_front.jpg',
			back: '/assets/img/main-menu/medusa_char_sheet_back.jpg',
		},
		bgColor: CharacterColorMap[CharacterNameEnum.MEDUSA],
		stats: {
			health: 16,
			move: 3,
			attackType: AttackTypeEnum.RANGED,
		},
		sideKick: {
			name: SidekickNameEnum.HARPY,
			health: 1,
			attackType: AttackTypeEnum.MELEE,
			amount: 3,
		},
		deck: decks.Medusa,
	},
	[CharacterNameEnum.SINBAD]: {
		description:
			'With every thrilling voyage, he grows in wisdom and power. Get to him and the faithful Porter quickly, before his experience makes him nigh unstoppable and your story ends too soon.',
		specialAbility: `When you maneuver, you may move fighters +1 space for each VOYAGE card in your discard pile.`,
		optionBg: '/assets/img/sinbad.png',
		characterSheet: '/assets/img/main-menu/sinbad_character_sheet.jpg',
		bgColor: CharacterColorMap[CharacterNameEnum.SINBAD],
		stats: {
			health: 15,
			move: 2,
			attackType: AttackTypeEnum.MELEE,
		},
		sideKick: {
			name: SidekickNameEnum.THE_PORTER,
			health: 6,
			attackType: AttackTypeEnum.MELEE,
			amount: 1,
		},
		deck: decks.Sinbad,
	},
	[CharacterNameEnum.ALICE]: {
		description: `Big trouble in a little package. She's been through the looking glass and came back with a vorpal blade and the Jabberwock in tow. Catch her at the wrong size, and it'll be checkmate for you.`,
		specialAbility: `When you place Alice, choose whether she starts the game BIG or SMALL.
						When Alice is BIG, add 2 to the value of her attack cards.
						When Alice is SMALL, add 1 to the value of her defense cards.`,
		optionBg: '/assets/img/alice.png',
		characterSheet: '/assets/img/main-menu/alice_character_sheet.jpg',
		bgColor: CharacterColorMap[CharacterNameEnum.ALICE],
		stats: {
			health: 13,
			move: 2,
			attackType: AttackTypeEnum.MELEE,
		},
		sideKick: {
			name: SidekickNameEnum.THE_JABBERWOCK,
			health: 8,
			attackType: AttackTypeEnum.MELEE,
			amount: 1,
		},
		deck: decks.Alice,
	},
	[CharacterNameEnum.KING_ARTHUR]: {
		description:
			'With mighty Excalibur in his mailed fist and the tricky Merlin at his back, his greatest weapon is his faith and willingness to sacrifice to see that deed is done.',
		specialAbility: `When King Arthur attacks, you may BOOST that attack, Play the BOOST card, face down, along with your attack card.
							If your opponent cancels the effects on your attack card, the BOOST is discarded without effect.`,
		optionBg: '/assets/img/king-arthur.png',
		characterSheet: '/assets/img/main-menu/king_arthur_character_sheet.jpg',
		bgColor: CharacterColorMap[CharacterNameEnum.KING_ARTHUR],
		stats: {
			health: 18,
			move: 2,
			attackType: AttackTypeEnum.MELEE,
		},
		sideKick: {
			name: SidekickNameEnum.MERLIN,
			health: 7,
			attackType: AttackTypeEnum.RANGED,
			amount: 1,
		},
		deck: decks[CharacterNameEnum.KING_ARTHUR],
	},
}

export type CharacterStats = {
	health: number
	move: number
	attackType: AttackTypeEnum
}

export type SideKick = {
	name: SidekickNameEnum
	health: number
	attackType: AttackTypeEnum
	amount: number
}

export type OptionObj = {
	title: CharacterNameEnum
	bg: string
	bgColor: CharacterColor
}

export const options = Object.keys(characters).map((key) => ({
	title: key as CharacterNameEnum,
	bg: characters[key as CharacterNameEnum].optionBg,
	bgColor: characters[key as CharacterNameEnum].bgColor,
}))
