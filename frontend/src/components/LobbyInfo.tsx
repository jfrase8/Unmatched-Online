import { useLobbyStore } from 'src/stores/useLobbyStore'
import { CharacterColorEnum } from '../../../common/enums/CharacterColorEnum'
import { CharacterNameEnum } from '../../../common/enums/CharacterNameEnum'
import Text from './Text'
import useSocket from 'src/hooks/useSocket'
import LockedIcon from 'src/assets/svg/locked.svg?react'
import UnlockedIcon from 'src/assets/svg/unlocked.svg?react'
import { cn } from 'src/utils/cn'
import { useBreakpoint } from 'src/hooks/useBreakpoint'

export default function LobbyInfo() {
	const {
		maxPlayers,
		players,
		addPlayer,
		host,
		unchangingValues: { lobbyName },
	} = useLobbyStore()

	const xl = useBreakpoint('xl')

	useSocket({
		eventName: 'lobbyJoined',
		callBack: (lobby) => {
			const newPlayer = lobby.players[lobby.players.length - 1]
			if (!newPlayer) throw new Error('Lobby only has 1 player when expecting a second')
			addPlayer(newPlayer)
		},
	})

	if (!maxPlayers) return

	return (
		<div
			className={cn(
				'mt-2 mx-2 xl:absolute xl:top-5 xl:left-5 flex flex-col items-start bg-slate-900 rounded-2xl p-4 shadow-lg border border-slate-400'
			)}
		>
			<div className='flex justify-start items-center gap-4'>
				<Text as='h1' className='text-gray-400 pointer-events-none'>
					{lobbyName} - {players.length} / {maxPlayers} {xl && 'players'}
				</Text>
				{players.length < maxPlayers ? (
					<UnlockedIcon className='size-10 stroke-slate-400 pb-1' />
				) : (
					<LockedIcon className='size-10 stroke-slate-400 pb-1' />
				)}
			</div>
			<div className='flex gap-4 xl:gap-0 xl:flex-col'>
				{players.map((player) => {
					const characterKey = (
						Object.keys(CharacterNameEnum) as Array<keyof typeof CharacterNameEnum>
					).find((key) => CharacterNameEnum[key] === player.character)
					// Get the character's color based on its key in CharacterColorEnum
					const playerColor = characterKey ? CharacterColorEnum[characterKey] : 'white'
					return (
						<div className='flex items-center gap-1' key={player.id}>
							<Text as='h2' className='text-white' style={{ color: playerColor }}>
								{player.name}
							</Text>
							<Text as='h2' className='text-slate-400 text-sm pt-1'>
								{player.name === host ? '(host)' : ''}
							</Text>
						</div>
					)
				})}
			</div>
		</div>
	)
}
