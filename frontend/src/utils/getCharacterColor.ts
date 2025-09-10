import { CharacterColorEnum } from '../../../common/enums/CharacterColorEnum'
import { CharacterNameEnum } from '../../../common/enums/CharacterNameEnum'

export function getCharacterColor(character?: CharacterNameEnum) {
	const characterKey = (
		Object.keys(CharacterNameEnum) as Array<keyof typeof CharacterNameEnum>
	).find((key) => CharacterNameEnum[key] === character)

	if (!characterKey) return undefined
	return CharacterColorEnum[characterKey]
}
