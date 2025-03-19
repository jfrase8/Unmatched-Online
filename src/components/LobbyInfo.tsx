import { CharacterColorEnum } from '../enums/CharacterColorEnum'
import { CharacterNameEnum } from '../enums/CharacterNameEnum'
import { Player } from '../types/socketEvents'
import Text from './Text'

interface LobbyInfoProps {
	name: string
	players: Player[]
	maxPlayers: number
}
export default function LobbyInfo({ lobbyName, players, maxPlayers }: LobbyInfoProps) {
	return (
		<div className='absolute top-5 left-5 flex flex-col items-start'>
			<Text as='h1' className='text-gray-400 pointer-events-none'>
				{name} - {players.length} / {maxPlayers} players
			</Text>
			{players.map((player) => {
				const characterKey = (Object.keys(CharacterNameEnum) as Array<keyof typeof CharacterNameEnum>).find(
					(key) => CharacterNameEnum[key] === player.character
				)
				// Get the character's color based on its key in CharacterColorEnum
				const playerColor = characterKey ? CharacterColorEnum[characterKey] : 'white'
				return (
					<Text as='h2' className='text-white' style={{ color: playerColor }}>
						{player.name}
					</Text>
				)
			})}
		</div>
	)
}
