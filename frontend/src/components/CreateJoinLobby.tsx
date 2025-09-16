import { DirectionalEnum } from '../../../common/enums/DirectionalEnum'
import useSlidingPanel, { PanelState } from '../hooks/useSlidingPanel'
import SlidingPanel from './shared/SlidingPanel'
import { useEffect, useState } from 'react'
import { cn } from '../utils/cn'
import { socket } from '../utils/socket'
import useSocket from '../hooks/useSocket'
import useNotification from '../hooks/useNotification'
import { NotificationTypeEnum } from '../../../common/enums/NotificationTypeEnum'
import NotificationList from './NotificationList'
import { useRouter } from '@tanstack/react-router'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { useLobbyStore } from 'src/stores/useLobbyStore'
import Text from './shared/Text'
import TextInput from './shared/TextInput'
import Btn from './shared/Btn'
import BackArrow from 'src/assets/svg/back_arrow_filled.svg?react'
import { localReset } from 'src/utils/localStorage'
import clsx from 'clsx'
import { ServerEmitEnum } from '../../../common/enums/ServerEmitEnum'
import { ClientEmitEnum } from '../../../common/enums/ClientEmitEnum'

export default function CreateJoinLobby() {
	const router = useRouter()

	// Stores
	const { updateLobby } = useLobbyStore()

	// Hooks
	const { getPanelState, open, close, changeDir } = useSlidingPanel()
	const { notifList, setNotif } = useNotification()
	const sm = useBreakpoint('sm')

	// State
	const [typedLobbyName, setTypedLobbyName] = useState<string>('')
	const [typedName, setTypedName] = useState<string>('')
	const [showNamePopup, setShowNamePopup] = useState(false)
	const [wentBack, setWentBack] = useState(false)

	// Panel data
	const createPanelID = 'panel1'
	const joinPanelID = 'panel2'
	const createPanel = getPanelState(createPanelID)
	const joinPanel = getPanelState(joinPanelID)
	const openDir = sm ? DirectionalEnum.RIGHT : DirectionalEnum.DOWN

	// Button text
	const createButtonText = createPanel.isOpen ? 'Confirm' : 'Create Lobby'
	const joinButtonText = joinPanel.isOpen ? 'Confirm' : 'Join Lobby'

	// Styles
	const getButtonStyles = (panel: PanelState) => {
		if (!panel.isOpen) return 'rounded-xl'
		return sm ? 'rounded-l-xl' : 'rounded-t-xl'
	}
	const getInputStyles = (panel: PanelState) => {
		if (!panel.isOpen) return 'rounded-lg'
		return sm
			? 'transition-all duration-500 rounded-none rounded-r-lg'
			: 'transition-all duration-500 rounded-none rounded-b-lg'
	}
	const getWrapperInputStyles = (panel: PanelState) => {
		if (!panel.isOpen) return 'rounded-xl'
		return sm
			? ' transition-all duration-500 rounded-none rounded-r-xl'
			: 'transition-all duration-500 rounded-none rounded-b-xl'
	}
	const wrapperClassName = clsx({
		'w-[32rem]': sm && (createPanel.isOpen || joinPanel.isOpen),
		'h-[13.5rem]': !sm && (createPanel.isOpen || joinPanel.isOpen),
	})

	// Change the direction of the panels on breakpoint change
	useEffect(() => {
		changeDir(createPanelID, openDir)
		changeDir(joinPanelID, openDir)
	}, [changeDir, openDir])

	// Called if an error message is received
	useSocket({
		eventName: ServerEmitEnum.ERROR_MESSAGE,
		callBack: (message: string) => {
			setNotif(message, NotificationTypeEnum.ERROR)
		},
	})

	// Called if lobby name is valid
	useSocket({
		eventName: ServerEmitEnum.LOBBY_NAME_VALID,
		callBack: () => {
			setShowNamePopup(true)
		},
	})

	// Called if name is valid
	useSocket({
		eventName: ServerEmitEnum.NAME_VALID,
		callBack: () => {
			if (createPanel.isOpen)
				return socket.emit(ClientEmitEnum.CREATE_LOBBY, typedLobbyName, {
					id: socket.id,
					name: typedName,
					host: true,
				})

			socket.emit(ClientEmitEnum.JOIN_LOBBY, typedLobbyName, { id: socket.id, name: typedName })
		},
	})

	useSocket({
		eventName: ServerEmitEnum.LOBBY_JOINED,
		callBack: (lobby) => {
			// Reset lobby local storage
			localReset('lobby-storage')

			// Set initial lobby data
			console.log('Setting lobby store data:', lobby, typedName)
			updateLobby({ ...lobby, myPlayerName: typedName, lobbyName: lobby.lobbyName })

			// Navigate
			router.navigate({ to: `/lobbies/${lobby.lobbyName}` })
		},
	})

	const checkLobbyName = (type: 'create' | 'join') => {
		if (typedLobbyName === '') return setNotif('Must input lobby name.', NotificationTypeEnum.ERROR)
		socket.emit(ClientEmitEnum.CHECK_LOBBY_NAME, typedLobbyName, type)
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
			{showNamePopup ? (
				<div className='relative w-[25rem] h-[50%] bg-slate-700 rounded-xl p-4 pt-8 border-2 border-slate-800 shadow-lg flex flex-col gap-4 justify-center items-center'>
					<button
						onClick={() => {
							setWentBack(true)
							setShowNamePopup(false)
						}}
						className='size-fit transition-colors duration-500 fill-slate-300 hover:fill-slate-800 absolute top-1 left-2'
					>
						<BackArrow className='size-8' />
					</button>
					<Text as='h1' className='pl-4 leading-none'>
						Enter your name:
					</Text>
					<TextInput
						placeholder='Enter Name...'
						value={typedName}
						onChange={(e) => setTypedName(e.target.value)}
					/>
					<Btn
						onClick={() => socket.emit(ClientEmitEnum.CHECK_NAME, typedLobbyName, typedName)}
						disabled={typedName === ''}
						className={cn(
							'w-full font-navBarButtons text-white',
							typedName === '' && 'text-slate-500'
						)}
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
								onClick={() =>
									!createPanel.isOpen ? openPanel(createPanelID) : checkLobbyName('create')
								}
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
								onClick={() =>
									!joinPanel.isOpen ? openPanel(joinPanelID) : checkLobbyName('join')
								}
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
