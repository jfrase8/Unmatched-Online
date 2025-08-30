import { CardEffectTimingEnum } from '../enums/CardEffectTimingEnum'
import { CardPlayableByEnum } from '../enums/CardPlayableByEnum'
import { CardTypeEnum } from '../enums/CardTypeEnum'

export const universalCards = {
	/** Things that are different: Boost Value */
	feint: {
		name: 'Feint',
		value: 2,
		effectTiming: CardEffectTimingEnum.IMMEDIATELY,
		type: CardTypeEnum.VERSATILE,
		playableBy: CardPlayableByEnum.ANY,
		cardAmount: 3,
	},
	/** Things that are different: Boost Value */
	regroup: {
		name: 'Regroup',
		value: 1,
		effectTiming: CardEffectTimingEnum.AFTER_COMBAT,
		type: CardTypeEnum.VERSATILE,
		playableBy: CardPlayableByEnum.ANY,
		cardAmount: 3,
	},
	/** Things that are different: Card Amount */
	momentousShift: {
		name: 'Momentous Shift',
		value: 3,
		effectTiming: CardEffectTimingEnum.DURING_COMBAT,
		type: CardTypeEnum.VERSATILE,
		playableBy: CardPlayableByEnum.ANY,
		boostValue: 1,
	},
	/** Things that are different: Card Amount */
	skirmish: {
		name: 'Skirmish',
		value: 4,
		effectTiming: CardEffectTimingEnum.AFTER_COMBAT,
		type: CardTypeEnum.VERSATILE,
		playableBy: CardPlayableByEnum.ANY,
		boostValue: 1,
	},
}
