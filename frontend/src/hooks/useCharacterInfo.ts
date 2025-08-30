import { characters } from '../../../common/constants/characterInfo'
import { CharacterNameEnum } from '../../../common/enums/CharacterNameEnum'

/** Takes a character name and returns the data associated with that character */
export function useCharacterData(character?: CharacterNameEnum) {
	return characters.find((c) => c.title === character) ?? undefined
}
