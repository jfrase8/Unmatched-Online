import { CharacterNameEnum } from '../enums/CharacterNameEnum'

export type PlayerType = {
	id: string
	name: string
	character?: CharacterNameEnum
	host?: boolean
}
