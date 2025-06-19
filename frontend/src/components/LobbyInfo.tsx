import { useLobbyStore } from 'src/stores/useLobbyStore'
import { CharacterColorEnum } from '../../../common/enums/CharacterColorEnum'
import { CharacterNameEnum } from '../../../common/enums/CharacterNameEnum'
import Text from './Text'
import useSocket from 'src/hooks/useSocket'
import LockedIcon from 'src/assets/svg/locked.svg?react'
import UnlockedIcon from 'src/assets/svg/unlocked.svg?react'

export default function LobbyInfo() {
	const { name, maxPlayers, players, addPlayer } = useLobbyStore()

	useSocket({
		eventName: 'lobbyJoined',
		callBack: (lobby) => {
			console.log('!! Someone new joined:', lobby)
			const newPlayer = lobby.players[lobby.players.length - 1]
			if (!newPlayer) throw new Error('Lobby only has 1 player when expecting a second')
			addPlayer(newPlayer)
		},
	})

	if (!maxPlayers) return

	return (
		<div className='absolute top-5 left-5 flex flex-col items-start'>
			<div className='flex justify-start items-center gap-4'>
				<Text as='h1' className='text-gray-400 pointer-events-none'>
					{name} - {players.length} / {maxPlayers} players
				</Text>
				{players.length < maxPlayers ? (
					<UnlockedIcon className='size-10 stroke-slate-400 pb-1' />
				) : (
					<LockedIcon className='size-10 stroke-slate-400 pb-1' />
				)}
			</div>
			{players.map((player) => {
				const characterKey = (Object.keys(CharacterNameEnum) as Array<keyof typeof CharacterNameEnum>).find(
					(key) => CharacterNameEnum[key] === player.character
				)
				// Get the character's color based on its key in CharacterColorEnum
				const playerColor = characterKey ? CharacterColorEnum[characterKey] : 'white'
				return (
					<Text as='h2' className='text-white' style={{ color: playerColor }} key={player.id}>
						{player.name}
					</Text>
				)
			})}
		</div>
	)
}
