import { CharacterNameEnum } from '../enums/CharacterNameEnum'
import { AttackTypeEnum } from '../enums/AttackTypeEnum'
import { CharacterColorEnum } from '../enums/CharacterColorEnum'
import { SidekickNameEnum } from '../enums/SidekickNameEnum'

export const characters = [
	{
		title: CharacterNameEnum.MEDUSA,
		description:
			'The Gorgon with the gaze that felled thousands. With her harpies at her side, you better have a defense in hand when she turns her eyes to you.',
		optionBg: 'src/assets/img/medusa.png',
		bgColor: CharacterColorEnum.GREEN,
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
		deck: {
			images: {
				back: 'src/assets/img/Decks/Medusa/medusa_deck_back.png',
			},
		},
	},
	{
		title: CharacterNameEnum.SINBAD,
		description:
			'With every thrilling voyage, he grows in wisdom and power. Get to him and the faithful Porter quickly, before his experience makes him nigh unstoppable and your story ends too soon.',
		optionBg: 'src/assets/img/sinbad.png',
		bgColor: CharacterColorEnum.ORANGE,
		stats: {
			health: 20,
			move: 3,
			attackType: AttackTypeEnum.MELEE,
		},
		deck: {
			images: {
				back: 'src/assets/img/Decks/Sinbad/sinbad_deck_back.png',
			},
		},
	},
	{
		title: CharacterNameEnum.ALICE,
		description: `Big trouble in a little package. She's been through the looking glass and came back with a vorpal blade and the Jabberwock in tow. Catch her at the wrong size, and it'll be checkmate for you.`,
		optionBg: 'src/assets/img/alice.png',
		bgColor: CharacterColorEnum.BLUE,
		stats: {
			health: 5,
			move: 3,
			attackType: AttackTypeEnum.MELEE,
		},
		deck: {
			images: {
				back: 'src/assets/img/Decks/Alice/alice_deck_back.png',
				front: Object.keys(
					import.meta.glob('/src/assets/img/Decks/Alice/front/*.png', {
						eager: true,
					})
				),
			},
		},
	},
	{
		title: CharacterNameEnum.KING_ARTHUR,
		description:
			'With mighty Excalibur in his mailed fist and the tricky Merlin at his back, his greatest weapon is his faith and willingness to sacrifice to see that deed is done.',
		optionBg: 'src/assets/img/king-arthur.png',
		bgColor: CharacterColorEnum.RED,
		stats: {
			health: 30,
			move: 3,
			attackType: AttackTypeEnum.MELEE,
		},
		deck: {
			images: {
				back: 'src/assets/img/Decks/King Arthur/king_arthur_deck_back.png',
			},
		},
	},
]

export const options = characters.map((character) => ({
	title: character.title,
	bg: character.optionBg,
	bgColor: character.bgColor,
}))
export type OptionObj = (typeof options)[0]

export const characterStats = characters.map((character) => character.stats)
export type CharacterStats = (typeof characterStats)[0]

export const sideKicks = characters.map((character) => character.sideKick)
export type SideKick = (typeof sideKicks)[0]
