import { DirectionalEnum } from '../enums/DirectionalEnum'
import useSlidingPanel, { PanelState } from '../hooks/useSlidingPanel'
import SlidingPanel from './SlidingPanel'
import { useMemo, useState } from 'react'
import { cn } from '../utils/cn'
import { socket } from '../utils/socket'
import useSocket from '../hooks/useSocket'
import useNotification from '../hooks/useNotification'
import { NotificationTypeEnum } from '../enums/NotificationTypeEnum'
import NotificationList from './NotificationList'
import { useRouter } from '@tanstack/react-router'

export default function CreateJoinLobby() {
	const { getPanelState, open, close } = useSlidingPanel()
	const { notifList, setNotif } = useNotification()
	const router = useRouter()

	const [lobbyName, setLobbyName] = useState<string>('')

	const createPanelID = 'panel1'
	const joinPanelID = 'panel2'
	const createPanel = getPanelState(createPanelID)
	const joinPanel = getPanelState(joinPanelID)

	const createButtonText = useMemo(() => (createPanel.isOpen ? 'Confirm' : 'Create Lobby'), [createPanel.isOpen])
	const joinButtonText = useMemo(() => (joinPanel.isOpen ? 'Confirm' : 'Join Lobby'), [joinPanel.isOpen])
	const wrapperClassName = useMemo(
		() => (createPanel.isOpen || joinPanel.isOpen ? 'w-[32rem]' : ''),
		[createPanel.isOpen, joinPanel.isOpen]
	)

	const getButtonStyles = (panel: PanelState) => {
		return panel.isOpen ? 'rounded-l-xl' : 'rounded-xl'
	}

	const getInputStyles = (panel: PanelState) => {
		return panel.isOpen ? 'transition-all duration-500 rounded-r-xl' : 'rounded-xl'
	}

	// Listens to socket events with the name 'createLobbyError'
	useSocket({
		eventName: 'errorMessage',
		callBack: (message: string) => {
			setNotif(message, NotificationTypeEnum.ERROR)
		},
	})

	useSocket({
		eventName: 'lobbyCreated',
		callBack: (lobby) => {
			router.navigate({ to: `/lobbies/${lobby.name}` })
		},
	})

	useSocket({
		eventName: 'lobbyJoined',
		callBack: () => {
			router.navigate({ to: `/lobbies/${lobbyName}` })
		},
	})

	const createLobby = () => {
		if (lobbyName === '') return setNotif('Must input lobby name.', NotificationTypeEnum.ERROR)
		socket.emit('createLobby', lobbyName, socket.id)
	}

	const joinLobby = () => {
		socket.emit('joinLobby', lobbyName, socket.id)
	}

	const openPanel = (panelID: string) => {
		// Close the other panel
		if (panelID === createPanelID) close(joinPanelID)
		else close(createPanelID)

		// Open this panel
		open(panelID, DirectionalEnum.RIGHT)
	}

	return (
		<div
			className={cn(
				'w-[17rem] h-fit bg-slate-700 p-4 rounded-xl transition-all duration-700 relative',
				wrapperClassName
			)}
		>
			<NotificationList notifList={notifList} className='top-40 left-[50%] -translate-x-[50%]' />
			<div className='flex flex-col gap-4 justify-center w-full'>
				<SlidingPanel
					panelContent={
						<div className={cn('p-1 bg-slate-800 size-full', getInputStyles(createPanel))}>
							<input
								className={cn('size-full p-2', getInputStyles(createPanel))}
								placeholder='Enter Lobby Name...'
								value={lobbyName}
								onChange={(e) => setLobbyName(e.target.value)}
							/>
						</div>
					}
					isOpen={createPanel.isOpen}
					dir={createPanel.dir}
				>
					<button
						className={cn(
							`hover:brightness-90 w-[15rem] p-4 font-navBarButtons text-white bg-slate-800 transition-transform duration-500`,
							getButtonStyles(createPanel)
						)}
						onClick={() => (!createPanel.isOpen ? openPanel(createPanelID) : createLobby())}
					>
						{createButtonText}
					</button>
				</SlidingPanel>

				<SlidingPanel
					panelContent={
						<div className={cn('p-1 bg-slate-800 size-full', getInputStyles(joinPanel))}>
							<input
								className={cn('size-full p-2', getInputStyles(joinPanel))}
								placeholder='Enter Lobby Name...'
								value={lobbyName}
								onChange={(e) => setLobbyName(e.target.value)}
							/>
						</div>
					}
					isOpen={joinPanel.isOpen}
					dir={joinPanel.dir}
				>
					<button
						className={cn(
							`hover:brightness-90 w-[15rem] p-4 font-navBarButtons text-white bg-slate-800 transition-transform duration-500`,
							getButtonStyles(joinPanel)
						)}
						onClick={() => (!joinPanel.isOpen ? openPanel(joinPanelID) : joinLobby())}
					>
						{joinButtonText}
					</button>
				</SlidingPanel>
			</div>
		</div>
	)
}
