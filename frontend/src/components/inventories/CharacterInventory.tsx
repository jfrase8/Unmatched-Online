import { CharacterNameEnum } from '../../../../common/enums/CharacterNameEnum'
import { PlayerType } from '../../../../common/types/PlayerType'
import AliceInventory from './AliceInventory'
import KingArthurInventory from './KingArthurInventory'
import MedusaInventory from './MedusaInventory'
import SinbadInventory from './SinbadInventory'

interface CharacterInventoryProps {
	character: CharacterNameEnum
	player: PlayerType
}
export default function CharacterInventory({ character, player }: CharacterInventoryProps) {
	const CharacterComponent = CharacterInventoryMap[character]
	return <CharacterComponent {...player} />
}

const CharacterInventoryMap = {
	[CharacterNameEnum.MEDUSA]: MedusaInventory,
	[CharacterNameEnum.SINBAD]: SinbadInventory,
	[CharacterNameEnum.KING_ARTHUR]: KingArthurInventory,
	[CharacterNameEnum.ALICE]: AliceInventory,
}
