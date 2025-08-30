import { CharacterNameEnum } from '../enums/CharacterNameEnum'

export type CharacterColor = (typeof CharacterColorMap)[CharacterNameEnum]

export const CharacterColorMap = {
	[CharacterNameEnum.MEDUSA]: '#26b64f',
	[CharacterNameEnum.SINBAD]: '#e19600',
	[CharacterNameEnum.ALICE]: '#008cce',
	[CharacterNameEnum.KING_ARTHUR]: '#ca2424',
} as const
