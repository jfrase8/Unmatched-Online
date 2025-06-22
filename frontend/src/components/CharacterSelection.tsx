import ScrollableCardOptions from '../components/ScrollableCardOptions'
import Text from '../components/Text'
import { useEffect, useMemo, useRef, useState } from 'react'
import CharacterDescription from '../components/CharacterDescription'
import SlidingPanel from '../components/SlidingPanel'
import { DirectionalEnum } from '../../../common/enums/DirectionalEnum'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { OptionObj, options } from '../constants/characterInfo'
import useSlidingPanel from '../hooks/useSlidingPanel'
import colors from 'tailwindcss/colors'
import useSocket from '../hooks/useSocket'
import { socket } from '../utils/socket'
import CharacterInfoPopup from './CharacterInfoPopup'
import { cn } from 'src/utils/cn'
import { useLobbyStore } from 'src/stores/useLobbyStore'
import { useRouter } from '@tanstack/react-router'

/** Component for selecting a character when in a lobby. */
export default function CharacterSelection() {
	const [selectedCharacter, setSelectedCharacter] = useState<OptionObj | undefined>(undefined) // The character the user has selected
	const [displayCharacter, setDisplayCharacter] = useState<OptionObj | undefined>(undefined) // The character that should be displayed on the panel
	const [isClosing, setIsClosing] = useState(false) // Track if the panel is currently closing
	const [showOverlay, setShowOverlay] = useState<string | undefined>(undefined) // Whether a characters deck/hero overlay should show

	const {
		host,
		lockLobby,
		updatePlayer,
		clientOnly: { myPlayerName },
		players,
		maxPlayers,
	} = useLobbyStore()
	const router = useRouter()
	const { getPanelState, changeDir, open, close } = useSlidingPanel()

	const hasChosen = players.some((p) => p.name === myPlayerName && p.character)

	console.log('!!', hasChosen, myPlayerName, selectedCharacter)

	const panelID = 'panel1'
	const panel = getPanelState('panel1')

	const waitToReopen = 700 // Milliseconds

	// isOpenRef is used so the useEffect will not be called infinitely
	const isOpenRef = useRef<boolean>()
	isOpenRef.current = panel.isOpen

	// isClosing must be a ref so the useEffect will not reset the timeout after closing
	const isClosingRef = useRef<boolean>()
	isClosingRef.current = isClosing

	// selectedCharacter needs to be a ref so that the timeout sets the display character to the newest selected character
	const selectedCharacterRef = useRef<OptionObj | undefined>()
	selectedCharacterRef.current = selectedCharacter

	// Direction ref
	const dirRef = useRef<DirectionalEnum>(DirectionalEnum.LEFT)
	dirRef.current = panel.dir

	// After a character is selected, set the panel to show, unless it is already showing, then time it so it closes then opens again
	useEffect(() => {
		if (isClosingRef.current) return // early return if the panel is in the middle of closing

		// Currently showing the panel
		if (isOpenRef.current) {
			close(panelID)
			setIsClosing(true)
			setTimeout(() => {
				open(panelID, dirRef.current)
				setDisplayCharacter(selectedCharacterRef.current)
				setIsClosing(false)
			}, waitToReopen)
		}
		// First time panel has been opened
		else if (selectedCharacter) {
			open(panelID, dirRef.current)
			setDisplayCharacter(selectedCharacterRef.current)
		}
	}, [close, open, selectedCharacter])

	const xl = useBreakpoint('xl')
	const xxl = useBreakpoint('2xl')

	useEffect(() => {
		if (xl) changeDir(panelID, DirectionalEnum.LEFT)
		else changeDir(panelID, DirectionalEnum.DOWN)
	}, [changeDir, xl])

	// Set selected character after a refresh
	useEffect(() => {
		if (hasChosen && !panel.isOpen)
			setSelectedCharacter(
				options.find((c) => c.title === players.find((p) => p.name === myPlayerName)?.character)
			)
	}, [hasChosen, myPlayerName, panel.isOpen, players])

	// Socket events
	useSocket({
		eventName: 'characterChosen',
		callBack: (player) => {
			updatePlayer(player)
		},
	})

	useSocket({
		eventName: 'matchStarted',
		callBack: () => {
			console.log('!! Match started')
			lockLobby()

			// Navigate
			router.navigate({ to: `/match` })
		},
	})

	const optionsClassName = useMemo(
		() => (selectedCharacter && xl ? 'transition-transform duration-700 translate-x-[50%]' : ''),
		[selectedCharacter, xl]
	)

	const buttonText = useMemo(() => (hasChosen ? 'Cancel' : 'Ready'), [hasChosen])

	const isHost = myPlayerName === host
	const allPlayersChosen = players.every((p) => p.character) && players.length === maxPlayers

	const disabled = useMemo(
		() =>
			!selectedCharacter ||
			players.some((p) => p.name !== myPlayerName && p.character === selectedCharacter.title),
		[myPlayerName, players, selectedCharacter]
	)

	return (
		<>
			{selectedCharacter && showOverlay && (
				<CharacterInfoPopup
					character={selectedCharacter.title}
					setShowPopup={setShowOverlay}
					infoContent={showOverlay}
				/>
			)}
			<div
				className={cn(
					'flex flex-col h-full xl:h-fit w-full px-12 pb-12 pt-2 xl:pt-8 items-center xl:bg-gray-800 transition-all duration-500',
					xxl && 'rounded-full max-w-[calc(100dvw-10rem)]'
				)}
			>
				<div className='flex flex-col items-center gap-4 size-full'>
					<Text as='h1' className='xs:text-[2rem] mt-4'>
						CHOOSE YOUR CHARACTER
					</Text>
					<div className={optionsClassName}>
						<SlidingPanel
							panelContent={
								<div
									className='flex border-2 border-slate-300 size-full rounded-lg justify-center items-center'
									style={{
										backgroundColor: 'black',
									}}
								>
									<CharacterDescription
										selected={displayCharacter}
										onDeckClick={() => setShowOverlay('deck')}
										onHeroClick={() => setShowOverlay('hero')}
									/>
								</div>
							}
							className='rounded-lg'
							isOpen={panel.isOpen}
							dir={panel.dir}
						>
							<ScrollableCardOptions
								options={options}
								onSelect={setSelectedCharacter}
								selected={selectedCharacter}
								lockOption={hasChosen}
							/>
						</SlidingPanel>
					</div>
					<button
						className={cn(
							'py-4 px-24 rounded-lg transition-all duration-[670ms]',
							selectedCharacter && 'hover:brightness-90 mt-[16rem] xl:m-0',
							isClosing && 'm-0'
						)}
						style={{
							backgroundColor: !disabled
								? !hasChosen
									? selectedCharacter!.bgColor
									: colors.slate['300']
								: 'gray',
						}}
						onClick={() => {
							socket.emit(
								'chooseCharacter',
								socket.id,
								hasChosen ? undefined : selectedCharacter?.title
							)
						}}
						disabled={disabled}
					>
						{buttonText}
					</button>
					{allPlayersChosen && isHost && (
						<button
							className={cn(
								'py-4 rounded-lg animate-pulse bg-cyan-400 w-[235px] hover:animate-none hover:bg-cyan-400'
							)}
							onClick={() => {
								socket.emit('startMatch', socket.id)
							}}
						>
							Start Game
						</button>
					)}
				</div>
			</div>
		</>
	)
}
