import { characters } from '../constants/characterInfo'
import { CharacterNameEnum } from '../enums/CharacterNameEnum'

/** Takes a character name and returns the data associated with that character */
export function useCharacterData(character: CharacterNameEnum) {
	return characters.find((c) => c.title === character)
}
