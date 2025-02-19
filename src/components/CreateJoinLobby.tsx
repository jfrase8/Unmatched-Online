import { DirectionalEnum } from '../enums/DirectionalEnum'
import useSlidingPanel from '../hooks/useSlidingPanel'
import SlidingPanel from './SlidingPanel'
import { useMemo, useState } from 'react'
import { cn } from '../utils/cn'
import { socket } from '../utils/socket'
import useSocket from '../hooks/useSocket'
import useNotification from '../hooks/useNotification'
import Notification from './Notification'
import { NotificationTypeEnum } from '../enums/NotificationTypeEnum'

export default function CreateJoinLobby() {
	const { dir, isOpen, open } = useSlidingPanel()
	const { setNotif, message, isShowing, fade } = useNotification()

	const [lobbyName, setLobbyName] = useState<string>('')

	const buttonClassName = useMemo(() => (isOpen ? 'rounded-l-xl' : 'rounded-xl'), [isOpen])
	const inputClassName = useMemo(() => (isOpen ? 'transition-all duration-500 rounded-r-xl' : 'rounded-xl'), [isOpen])
	const wrapperClassName = useMemo(() => (isOpen ? 'w-[32rem]' : ''), [isOpen])
	const createButtonText = useMemo(() => (isOpen ? 'Confirm' : 'Create Lobby'), [isOpen])

	// Listens to socket events with the name 'createLobbyError'
	useSocket({
		eventName: 'createLobbyError',
		callBack: (message: string) => {
			setNotif(message)
		},
	})

	console.log(message)

	const createLobby = () => {
		if (lobbyName === '') return setNotif('Must input lobby name.')
		socket.emit('createLobby', (socket.id, lobbyName))
	}

	return (
		<div
			className={cn(
				'w-[17rem] h-fit bg-slate-700 p-4 rounded-xl transition-all duration-700 relative',
				wrapperClassName
			)}
		>
			<Notification
				message={message}
				isShowing={isShowing}
				fade={fade}
				type={NotificationTypeEnum.ERROR}
				className='top-40 left-[50%] -translate-x-[50%]'
			/>
			<div className='flex flex-col gap-4 justify-center w-full'>
				<SlidingPanel
					panelContent={
						<div className={cn('p-1 bg-slate-800 size-full', inputClassName)}>
							<input
								className={cn('size-full p-2', inputClassName)}
								placeholder='Enter Lobby Name...'
								value={lobbyName}
								onChange={(e) => setLobbyName(e.target.value)}
							/>
						</div>
					}
					isOpen={isOpen}
					dir={dir}
				>
					<button
						className={cn(
							`hover:brightness-90 w-[15rem] p-4 font-navBarButtons text-white bg-slate-800 transition-transform duration-500`,
							buttonClassName
						)}
						onClick={() => (!isOpen ? open(DirectionalEnum.RIGHT) : createLobby())}
					>
						{createButtonText}
					</button>
				</SlidingPanel>

				<button className='w-[15rem] p-4 font-navBarButtons text-white bg-slate-800 rounded-xl'>Join Lobby</button>
			</div>
		</div>
	)
}
