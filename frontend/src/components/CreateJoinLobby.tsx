import { DirectionalEnum } from '../../../common/enums/DirectionalEnum'
import useSlidingPanel, { PanelState } from '../hooks/useSlidingPanel'
import SlidingPanel from './SlidingPanel'
import { useEffect, useMemo, useState } from 'react'
import { cn } from '../utils/cn'
import { socket } from '../utils/socket'
import useSocket from '../hooks/useSocket'
import useNotification from '../hooks/useNotification'
import { NotificationTypeEnum } from '../../../common/enums/NotificationTypeEnum'
import NotificationList from './NotificationList'
import { useRouter } from '@tanstack/react-router'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { useLobbyStore } from 'src/stores/useLobbyStore'
import Text from './Text'
import TextInput from './TextInput'
import Btn from './Btn'
import BackArrow from 'src/assets/svg/back_arrow_filled.svg?react'

export default function CreateJoinLobby() {
	const { initializeLobby } = useLobbyStore()
	const { getPanelState, open, close, changeDir } = useSlidingPanel()
	const { notifList, setNotif } = useNotification()
	const router = useRouter()
	const sm = useBreakpoint('sm')

	const [typedLobbyName, setTypedLobbyName] = useState<string>('')
	const [typedName, setTypedName] = useState<string>('')
	const [showNamePanel, setShowNamePanel] = useState<'join' | 'create' | undefined>(undefined)
	const [wentBack, setWentBack] = useState(false)

	const createPanelID = 'panel1'
	const joinPanelID = 'panel2'
	const createPanel = getPanelState(createPanelID)
	const joinPanel = getPanelState(joinPanelID)
	const openDir = useMemo(() => (sm ? DirectionalEnum.RIGHT : DirectionalEnum.DOWN), [sm])

	const createButtonText = useMemo(() => (createPanel.isOpen ? 'Confirm' : 'Create Lobby'), [createPanel.isOpen])
	const joinButtonText = useMemo(() => (joinPanel.isOpen ? 'Confirm' : 'Join Lobby'), [joinPanel.isOpen])
	const wrapperClassName = useMemo(() => {
		if (!createPanel.isOpen && !joinPanel.isOpen) return ''
		return sm ? 'w-[32rem]' : 'h-[13.5rem]'
	}, [createPanel.isOpen, joinPanel.isOpen, sm])

	const getButtonStyles = (panel: PanelState) => {
		if (!panel.isOpen) return 'rounded-xl'
		return sm ? 'rounded-l-xl' : 'rounded-t-xl'
	}

	const getInputStyles = (panel: PanelState) => {
		if (!panel.isOpen) return 'rounded-lg'
		return sm ? 'transition-all duration-500 rounded-none rounded-r-lg' : 'transition-all duration-500 rounded-b-lg'
	}

	const getWrapperInputStyles = (panel: PanelState) => {
		if (!panel.isOpen) return 'rounded-xl'
		return sm ? ' transition-all duration-500 rounded-none rounded-r-xl' : 'transition-all duration-500 rounded-b-xl'
	}

	useEffect(() => {
		changeDir(createPanelID, openDir)
		changeDir(joinPanelID, openDir)
	}, [changeDir, openDir])

	useSocket({
		eventName: 'errorMessage',
		callBack: (message: string) => {
			setNotif(message, NotificationTypeEnum.ERROR)
		},
	})

	useSocket({
		eventName: 'lobbyCreated',
		callBack: (lobby) => {
			// Initalize the lobby
			initializeLobby(lobby)

			// Navigate
			router.navigate({ to: `/lobbies/${lobby.name}` })
		},
	})

	useSocket({
		eventName: 'lobbyJoined',
		callBack: (lobby) => {
			// Initalize the lobby
			initializeLobby(lobby)

			// Navigate
			router.navigate({ to: `/lobbies/${lobby.name}` })
		},
	})

	const createLobby = () => {
		if (typedLobbyName === '') return setNotif('Must input lobby name.', NotificationTypeEnum.ERROR)
		setShowNamePanel('create')
	}

	const setName = (lobbyAction: 'join' | 'create') => {
		if (lobbyAction === 'create')
			socket.emit('createLobby', typedLobbyName, { id: socket.id, name: typedName, host: true })
		else socket.emit('joinLobby', typedLobbyName, { id: socket.id, name: typedName })
	}

	const joinLobby = () => {
		if (typedLobbyName === '') return setNotif('Must input lobby name.', NotificationTypeEnum.ERROR)
		setShowNamePanel('join')
	}

	const openPanel = (panelID: string) => {
		// Close the other panel
		if (panelID === createPanelID) close(joinPanelID)
		else close(createPanelID)

		// Open this panel
		open(panelID, openDir)
	}

	return (
		<>
			<NotificationList notifList={notifList} className='top-40 left-[50%] -translate-x-[50%]' />
			{showNamePanel ? (
				<div className='relative w-[25rem] h-[50%] bg-slate-700 rounded-xl p-4 pt-8 border-2 border-slate-800 shadow-lg flex flex-col gap-4 justify-center items-center'>
					<button
						onClick={() => {
							setWentBack(true)
							setShowNamePanel(undefined)
						}}
						className='size-fit transition-colors duration-500 fill-slate-300 hover:fill-slate-800 absolute top-1 left-2'
					>
						<BackArrow className='size-8' />
					</button>
					<Text as='h1' className='pl-4 leading-none'>
						Enter your name:
					</Text>
					<TextInput placeholder='Enter Name...' value={typedName} onChange={(e) => setTypedName(e.target.value)} />
					<Btn
						onClick={() => setName(showNamePanel)}
						disabled={typedName === ''}
						className={cn('w-full font-navBarButtons text-white', typedName === '' && 'text-slate-500')}
					>
						Confirm
					</Btn>
				</div>
			) : (
				<div
					className={cn(
						'w-[17rem] h-[10rem] bg-slate-700 p-4 rounded-xl relative',
						!wentBack && 'transition-all duration-700',
						wrapperClassName
					)}
				>
					<div
						className={cn(
							'flex flex-col gap-4 size-full justify-start transition-all duration-500',
							!sm && getPanelState(createPanelID).isOpen && 'gap-[4.5rem]'
						)}
					>
						<SlidingPanel
							panelContent={
								<>
									<TextInput
										placeholder='Enter Lobby Name...'
										value={typedLobbyName}
										onChange={(e) => setTypedLobbyName(e.target.value)}
										className={getInputStyles(createPanel)}
										wrapperClassName={getWrapperInputStyles(createPanel)}
									/>
								</>
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
								<>
									<TextInput
										placeholder='Enter Lobby Name...'
										value={typedLobbyName}
										onChange={(e) => setTypedLobbyName(e.target.value)}
										className={getInputStyles(joinPanel)}
										wrapperClassName={getWrapperInputStyles(joinPanel)}
									/>
								</>
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
			)}
		</>
	)
}
