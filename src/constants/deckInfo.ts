import { CardEffectTimingEnum } from '../enums/CardEffectTimingEnum'
import { CardPlayableByEnum } from '../enums/CardPlayableByEnum'
import { CardTypeEnum } from '../enums/CardTypeEnum'
import { CharacterNameEnum } from '../enums/CharacterNameEnum'
import { universalCards } from './universalCards'

export type Card = {
	name: string
	effectTiming: CardEffectTimingEnum | CardEffectTimingEnum[]
	value?: number
	type: CardTypeEnum
	playableBy: CardPlayableByEnum
	boostValue: number
	cardAmount: number
	imagePath: string
}

export type Deck = {
	cardBack: string
	cards: Card[]
}

export const decks = {
	[CharacterNameEnum.MEDUSA]: {
		cardBack: '/assets/img/Decks/Medusa/medusa_deck_back.png',
		cards: [
			{
				name: 'A Momentary Glance',
				effectTiming: CardEffectTimingEnum.NONE,
				type: CardTypeEnum.SCHEME,
				playableBy: CardPlayableByEnum.MAIN,
				boostValue: 4,
				cardAmount: 2,
				imagePath: '/assets/img/Decks/Medusa/front/a_momentary_glance.png',
			},
			{
				name: 'Clutching Claws',
				effectTiming: CardEffectTimingEnum.AFTER_COMBAT,
				value: 3,
				type: CardTypeEnum.VERSATILE,
				playableBy: CardPlayableByEnum.SIDEKICK,
				boostValue: 2,
				cardAmount: 3,
				imagePath: '/assets/img/Decks/Medusa/front/clutching_claws.png',
			},
			{
				name: 'Dash',
				effectTiming: CardEffectTimingEnum.AFTER_COMBAT,
				value: 3,
				type: CardTypeEnum.VERSATILE,
				playableBy: CardPlayableByEnum.ANY,
				boostValue: 1,
				cardAmount: 3,
				imagePath: '/assets/img/Decks/Medusa/front/dash.png',
			},
			{
				...universalCards.feint,
				boostValue: 2,
				imagePath: '/assets/img/Decks/Medusa/front/feint.png',
			},
			{
				name: 'Gaze of Stone',
				effectTiming: CardEffectTimingEnum.AFTER_COMBAT,
				value: 2,
				type: CardTypeEnum.ATTACK,
				playableBy: CardPlayableByEnum.MAIN,
				boostValue: 4,
				cardAmount: 3,
				imagePath: '/assets/img/Decks/Medusa/front/gaze_of_stone.png',
			},
			{
				name: 'Hiss and Slither',
				effectTiming: CardEffectTimingEnum.AFTER_COMBAT,
				value: 4,
				type: CardTypeEnum.DEFENSE,
				playableBy: CardPlayableByEnum.MAIN,
				boostValue: 3,
				cardAmount: 3,
				imagePath: '/assets/img/Decks/Medusa/front/hiss_and_slither.png',
			},
			{
				...universalCards.regroup,
				boostValue: 2,
				imagePath: '/assets/img/Decks/Medusa/front/regroup.png',
			},
			{
				name: 'Second Shot',
				effectTiming: CardEffectTimingEnum.DURING_COMBAT,
				value: 3,
				type: CardTypeEnum.ATTACK,
				playableBy: CardPlayableByEnum.MAIN,
				boostValue: 3,
				cardAmount: 3,
				imagePath: '/assets/img/Decks/Medusa/front/second_shot.png',
			},
			{
				name: 'Snipe',
				effectTiming: CardEffectTimingEnum.AFTER_COMBAT,
				value: 3,
				type: CardTypeEnum.VERSATILE,
				playableBy: CardPlayableByEnum.ANY,
				boostValue: 1,
				cardAmount: 3,
				imagePath: '/assets/img/Decks/Medusa/front/snipe.png',
			},
			{
				name: 'The Hounds of Mighty Zeus',
				effectTiming: CardEffectTimingEnum.AFTER_COMBAT,
				value: 4,
				type: CardTypeEnum.VERSATILE,
				playableBy: CardPlayableByEnum.SIDEKICK,
				boostValue: 3,
				cardAmount: 2,
				imagePath: '/assets/img/Decks/Medusa/front/the_hounds_of_mighty_zeus.png',
			},
			{
				name: 'Winged Frenzy',
				effectTiming: CardEffectTimingEnum.NONE,
				type: CardTypeEnum.SCHEME,
				playableBy: CardPlayableByEnum.ANY,
				boostValue: 2,
				cardAmount: 2,
				imagePath: '/assets/img/Decks/Medusa/front/winged_frenzy.png',
			},
		],
	},
	[CharacterNameEnum.SINBAD]: {
		cardBack: '/assets/img/Decks/Sinbad/sinbad_deck_back.png',
		cards: [
			{
				name: 'By Fortune and Fate',
				effectTiming: CardEffectTimingEnum.AFTER_COMBAT,
				value: 3,
				type: CardTypeEnum.ATTACK,
				playableBy: CardPlayableByEnum.SIDEKICK,
				boostValue: 1,
				cardAmount: 3,
				imagePath: '/assets/img/Decks/Sinbad/front/by_fortune_and_fate.png',
			},
			{
				name: 'Commanding Impact',
				effectTiming: CardEffectTimingEnum.AFTER_COMBAT,
				value: 5,
				type: CardTypeEnum.ATTACK,
				playableBy: CardPlayableByEnum.ANY,
				boostValue: 2,
				cardAmount: 1,
				imagePath: '/assets/img/Decks/Sinbad/front/commanding_impact.png',
			},
			{
				name: 'Exploit',
				effectTiming: CardEffectTimingEnum.AFTER_COMBAT,
				value: 4,
				type: CardTypeEnum.VERSATILE,
				playableBy: CardPlayableByEnum.ANY,
				boostValue: 1,
				cardAmount: 2,
				imagePath: '/assets/img/Decks/Sinbad/front/exploit.png',
			},
			{
				...universalCards.feint,
				boostValue: 1,
				imagePath: '/assets/img/Decks/Sinbad/front/feint.png',
			},
			{
				name: 'Leap Away',
				effectTiming: CardEffectTimingEnum.AFTER_COMBAT,
				value: 4,
				type: CardTypeEnum.VERSATILE,
				playableBy: CardPlayableByEnum.ANY,
				boostValue: 1,
				cardAmount: 2,
				imagePath: '/assets/img/Decks/Sinbad/front/leap_away.png',
			},
			{
				...universalCards.momentousShift,
				cardAmount: 3,
				imagePath: '/assets/img/Decks/Sinbad/front/momentous_shift.png',
			},
			{
				...universalCards.regroup,
				boostValue: 1,
				imagePath: '/assets/img/Decks/Sinbad/front/regroup.png',
			},
			{
				name: 'Riches Beyond Compare',
				effectTiming: CardEffectTimingEnum.NONE,
				type: CardTypeEnum.SCHEME,
				playableBy: CardPlayableByEnum.MAIN,
				boostValue: 1,
				cardAmount: 2,
				imagePath: '/assets/img/Decks/Sinbad/front/riches_beyond_compare.png',
			},
			{
				name: 'Toil and Dagger',
				effectTiming: CardEffectTimingEnum.AFTER_COMBAT,
				value: 3,
				type: CardTypeEnum.VERSATILE,
				playableBy: CardPlayableByEnum.MAIN,
				boostValue: 1,
				cardAmount: 4,
				imagePath: '/assets/img/Decks/Sinbad/front/toil_and_dagger.png',
			},
			{
				name: 'Voyage Home',
				effectTiming: [CardEffectTimingEnum.DURING_COMBAT, CardEffectTimingEnum.AFTER_COMBAT],
				value: 2,
				type: CardTypeEnum.ATTACK,
				playableBy: CardPlayableByEnum.MAIN,
				boostValue: 1,
				cardAmount: 1,
				imagePath: '/assets/img/Decks/Sinbad/front/voyage_home.png',
			},
			{
				name: 'Voyage to the Cannibals with the Root of Madness',
				effectTiming: [CardEffectTimingEnum.DURING_COMBAT, CardEffectTimingEnum.AFTER_COMBAT],
				value: 2,
				type: CardTypeEnum.ATTACK,
				playableBy: CardPlayableByEnum.MAIN,
				boostValue: 0,
				cardAmount: 1,
				imagePath: '/assets/img/Decks/Sinbad/front/voyage_to_the_cannibals.png',
			},
			{
				name: 'Voyage to the City of the King of Serendib',
				effectTiming: [CardEffectTimingEnum.DURING_COMBAT, CardEffectTimingEnum.AFTER_COMBAT],
				value: 2,
				type: CardTypeEnum.ATTACK,
				playableBy: CardPlayableByEnum.MAIN,
				boostValue: 0,
				cardAmount: 1,
				imagePath: '/assets/img/Decks/Sinbad/front/voyage_to_the_city_of_the_king.png',
			},
			{
				name: 'Voyage to the Creature with Eyes Like Coals of Fire',
				effectTiming: [CardEffectTimingEnum.DURING_COMBAT, CardEffectTimingEnum.AFTER_COMBAT],
				value: 2,
				type: CardTypeEnum.ATTACK,
				playableBy: CardPlayableByEnum.MAIN,
				boostValue: 0,
				cardAmount: 1,
				imagePath: '/assets/img/Decks/Sinbad/front/voyage_to_the_creature.png',
			},
			{
				name: 'Voyage to the City of the Man-Eating Apes',
				effectTiming: [CardEffectTimingEnum.DURING_COMBAT, CardEffectTimingEnum.AFTER_COMBAT],
				value: 2,
				type: CardTypeEnum.ATTACK,
				playableBy: CardPlayableByEnum.MAIN,
				boostValue: 0,
				cardAmount: 1,
				imagePath: '/assets/img/Decks/Sinbad/front/voyage_to_the_city_of_the_man-eating_apes.png',
			},
			{
				name: 'Voyage to the Island that was a Whale',
				effectTiming: [CardEffectTimingEnum.DURING_COMBAT, CardEffectTimingEnum.AFTER_COMBAT],
				value: 2,
				type: CardTypeEnum.ATTACK,
				playableBy: CardPlayableByEnum.MAIN,
				boostValue: 0,
				cardAmount: 1,
				imagePath: '/assets/img/Decks/Sinbad/front/voyage_to_the_island.png',
			},
			{
				name: 'Voyage to the Valley of the Giant Snakes',
				effectTiming: [CardEffectTimingEnum.DURING_COMBAT, CardEffectTimingEnum.AFTER_COMBAT],
				value: 2,
				type: CardTypeEnum.ATTACK,
				playableBy: CardPlayableByEnum.MAIN,
				boostValue: 0,
				cardAmount: 1,
				imagePath: '/assets/img/Decks/Sinbad/front/voyage_to_the_valley.png',
			},
		],
	},
	[CharacterNameEnum.ALICE]: {
		cardBack: '/assets/img/Decks/Alice/alice_deck_back.png',
		cards: [
			{
				name: 'Claws that Catch',
				effectTiming: CardEffectTimingEnum.DURING_COMBAT,
				value: 3,
				type: CardTypeEnum.ATTACK,
				playableBy: CardPlayableByEnum.SIDEKICK,
				boostValue: 2,
				cardAmount: 2,
				imagePath: '/assets/img/Decks/Alice/front/claws_that_catch.png',
			},
			{
				name: 'Drink Me',
				effectTiming: CardEffectTimingEnum.NONE,
				type: CardTypeEnum.SCHEME,
				playableBy: CardPlayableByEnum.MAIN,
				boostValue: 2,
				cardAmount: 2,
				imagePath: '/assets/img/Decks/Alice/front/drink_me.png',
			},
			{
				name: 'Eat Me',
				effectTiming: CardEffectTimingEnum.NONE,
				type: CardTypeEnum.SCHEME,
				playableBy: CardPlayableByEnum.MAIN,
				boostValue: 3,
				cardAmount: 2,
				imagePath: '/assets/img/Decks/Alice/front/eat_me.png',
			},
			{
				...universalCards.feint,
				boostValue: 2,
				imagePath: '/assets/img/Decks/Alice/front/feint.png',
			},
			{
				name: `I'm Late, I'm Late`,
				effectTiming: CardEffectTimingEnum.AFTER_COMBAT,
				value: 2,
				type: CardTypeEnum.VERSATILE,
				playableBy: CardPlayableByEnum.MAIN,
				boostValue: 3,
				cardAmount: 3,
				imagePath: '/assets/img/Decks/Alice/front/im_late.png',
			},
			{
				name: 'Jaws that Bite',
				effectTiming: CardEffectTimingEnum.AFTER_COMBAT,
				value: 4,
				type: CardTypeEnum.ATTACK,
				playableBy: CardPlayableByEnum.SIDEKICK,
				boostValue: 2,
				cardAmount: 2,
				imagePath: '/assets/img/Decks/Alice/front/jaws_that_bite.png',
			},
			{
				...universalCards.regroup,
				boostValue: 2,
				imagePath: '/assets/img/Decks/Alice/front/regroup.png',
			},
			{
				name: 'Looking Glass',
				effectTiming: CardEffectTimingEnum.AFTER_COMBAT,
				value: 2,
				type: CardTypeEnum.DEFENSE,
				playableBy: CardPlayableByEnum.MAIN,
				boostValue: 4,
				cardAmount: 2,
				imagePath: '/assets/img/Decks/Alice/front/looking_glass.png',
			},
			{
				name: 'Mad as a Hatter',
				effectTiming: CardEffectTimingEnum.AFTER_COMBAT,
				value: 3,
				type: CardTypeEnum.VERSATILE,
				playableBy: CardPlayableByEnum.MAIN,
				boostValue: 1,
				cardAmount: 2,
				imagePath: '/assets/img/Decks/Alice/front/mad_as_a_hatter.png',
			},
			{
				name: 'Manxome Foe',
				effectTiming: CardEffectTimingEnum.DURING_COMBAT,
				value: 3,
				type: CardTypeEnum.VERSATILE,
				playableBy: CardPlayableByEnum.ANY,
				boostValue: 2,
				cardAmount: 2,
				imagePath: '/assets/img/Decks/Alice/front/manxome_foe.png',
			},
			{
				...universalCards.momentousShift,
				cardAmount: 2,
				imagePath: '/assets/img/Decks/Alice/front/momentous_shift.png',
			},
			{
				name: 'O Frabjous Day!',
				effectTiming: CardEffectTimingEnum.AFTER_COMBAT,
				value: 4,
				type: CardTypeEnum.ATTACK,
				playableBy: CardPlayableByEnum.MAIN,
				boostValue: 4,
				cardAmount: 1,
				imagePath: '/assets/img/Decks/Alice/front/o_frabjous_day.png',
			},
			{
				name: 'The Other Side of the Mushroom',
				effectTiming: CardEffectTimingEnum.AFTER_COMBAT,
				value: 3,
				type: CardTypeEnum.ATTACK,
				playableBy: CardPlayableByEnum.MAIN,
				boostValue: 4,
				cardAmount: 1,
				imagePath: '/assets/img/Decks/Alice/front/other_side_of_the_mushroom.png',
			},
			{
				...universalCards.skirmish,
				cardAmount: 2,
				imagePath: '/assets/img/Decks/Alice/front/skirmish.png',
			},
			{
				name: 'Snicker-Snack',
				effectTiming: CardEffectTimingEnum.AFTER_COMBAT,
				value: 3,
				type: CardTypeEnum.ATTACK,
				playableBy: CardPlayableByEnum.MAIN,
				boostValue: 4,
				cardAmount: 1,
				imagePath: '/assets/img/Decks/Alice/front/snicker-snack.png',
			},
		],
	},
	[CharacterNameEnum.KING_ARTHUR]: {
		cardBack: '/assets/img/Decks/King Arthur/king_arthur_deck_back.png',
		cards: [
			{
				name: 'Aid the Chosen One',
				effectTiming: CardEffectTimingEnum.AFTER_COMBAT,
				value: 4,
				type: CardTypeEnum.ATTACK,
				playableBy: CardPlayableByEnum.SIDEKICK,
				boostValue: 2,
				cardAmount: 1,
				imagePath: '/assets/img/Decks/King Arthur/front/aid_the_chosen_one.png',
			},
			{
				name: 'Bewilderment',
				effectTiming: [CardEffectTimingEnum.DURING_COMBAT, CardEffectTimingEnum.AFTER_COMBAT],
				value: 0,
				type: CardTypeEnum.DEFENSE,
				playableBy: CardPlayableByEnum.SIDEKICK,
				boostValue: 2,
				cardAmount: 2,
				imagePath: '/assets/img/Decks/King Arthur/front/bewilderment.png',
			},
			{
				name: 'Command the Storms',
				effectTiming: CardEffectTimingEnum.NONE,
				type: CardTypeEnum.SCHEME,
				playableBy: CardPlayableByEnum.SIDEKICK,
				boostValue: 2,
				cardAmount: 2,
				imagePath: '/assets/img/Decks/King Arthur/front/command_the_storms.png',
			},
			{
				...universalCards.feint,
				boostValue: 1,
				imagePath: '/assets/img/Decks/King Arthur/front/feint.png',
			},
			{
				name: `Divine Intervention`,
				effectTiming: CardEffectTimingEnum.AFTER_COMBAT,
				value: 3,
				type: CardTypeEnum.VERSATILE,
				playableBy: CardPlayableByEnum.MAIN,
				boostValue: 2,
				cardAmount: 2,
				imagePath: '/assets/img/Decks/King Arthur/front/divine_intervention.png',
			},
			{
				name: 'Excalibur',
				effectTiming: CardEffectTimingEnum.NONE,
				value: 6,
				type: CardTypeEnum.ATTACK,
				playableBy: CardPlayableByEnum.MAIN,
				boostValue: 3,
				cardAmount: 1,
				imagePath: '/assets/img/Decks/King Arthur/front/excalibur.png',
			},
			{
				...universalCards.regroup,
				boostValue: 1,
				imagePath: '/assets/img/Decks/King Arthur/front/regroup.png',
			},
			{
				name: 'Noble Sacrifice',
				effectTiming: CardEffectTimingEnum.DURING_COMBAT,
				value: 2,
				type: CardTypeEnum.ATTACK,
				playableBy: CardPlayableByEnum.MAIN,
				boostValue: 3,
				cardAmount: 3,
				imagePath: '/assets/img/Decks/King Arthur/front/noble_sacrifice.png',
			},
			{
				name: 'Prophecy',
				effectTiming: CardEffectTimingEnum.NONE,
				type: CardTypeEnum.SCHEME,
				playableBy: CardPlayableByEnum.SIDEKICK,
				boostValue: 2,
				cardAmount: 1,
				imagePath: '/assets/img/Decks/King Arthur/front/prophecy.png',
			},
			{
				name: 'Restless Spirits',
				effectTiming: CardEffectTimingEnum.NONE,
				type: CardTypeEnum.SCHEME,
				playableBy: CardPlayableByEnum.SIDEKICK,
				boostValue: 2,
				cardAmount: 1,
				imagePath: '/assets/img/Decks/King Arthur/front/restless_spirits.png',
			},
			{
				...universalCards.momentousShift,
				cardAmount: 3,
				imagePath: '/assets/img/Decks/King Arthur/front/momentous_shift.png',
			},
			{
				...universalCards.skirmish,
				cardAmount: 3,
				imagePath: '/assets/img/Decks/King Arthur/front/skirmish.png',
			},
			{
				name: 'Swift Strike',
				effectTiming: CardEffectTimingEnum.AFTER_COMBAT,
				value: 3,
				type: CardTypeEnum.ATTACK,
				playableBy: CardPlayableByEnum.ANY,
				boostValue: 2,
				cardAmount: 2,
				imagePath: '/assets/img/Decks/King Arthur/front/swift_strike.png',
			},
			{
				name: 'The Aid of Morgana',
				effectTiming: CardEffectTimingEnum.AFTER_COMBAT,
				value: 4,
				type: CardTypeEnum.ATTACK,
				playableBy: CardPlayableByEnum.MAIN,
				boostValue: 2,
				cardAmount: 1,
				imagePath: '/assets/img/Decks/King Arthur/front/the_aid_of_morgana.png',
			},
			{
				name: 'The Holy Grail',
				effectTiming: CardEffectTimingEnum.AFTER_COMBAT,
				value: 1,
				type: CardTypeEnum.DEFENSE,
				playableBy: CardPlayableByEnum.MAIN,
				boostValue: 2,
				cardAmount: 1,
				imagePath: '/assets/img/Decks/King Arthur/front/the_holy_grail.png',
			},
			{
				name: 'The Lady of the Lake',
				effectTiming: CardEffectTimingEnum.NONE,
				type: CardTypeEnum.SCHEME,
				playableBy: CardPlayableByEnum.MAIN,
				boostValue: 2,
				cardAmount: 1,
				imagePath: '/assets/img/Decks/King Arthur/front/the_lady_of_the_lake.png',
			},
		],
	},
}
