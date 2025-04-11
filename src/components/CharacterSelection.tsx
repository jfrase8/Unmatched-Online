import ScrollableCardOptions from '../components/ScrollableCardOptions'
import Text from '../components/Text'
import { useEffect, useMemo, useRef, useState } from 'react'
import CharacterDescription from '../components/CharacterDescription'
import SlidingPanel from '../components/SlidingPanel'
import { DirectionalEnum } from '../enums/DirectionalEnum'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { OptionObj, options } from '../constants/characterInfo'
import useSlidingPanel from '../hooks/useSlidingPanel'
import colors from 'tailwindcss/colors'
import useSocket from '../hooks/useSocket'
import { SocketEvents } from '../types/socketEvents'
import { socket } from '../utils/socket'
import { CharacterNameEnum } from '../enums/CharacterNameEnum'
import CharacterInfoPopup from './CharacterInfoPopup'
import { cn } from 'src/utils/cn'

/** Component for selecting a character when in a lobby. */
export default function CharacterSelection() {
	const [selectedCharacter, setSelectedCharacter] = useState<OptionObj | undefined>(undefined) // The character the user has selected
	const [displayCharacter, setDisplayCharacter] = useState<OptionObj | undefined>(undefined) // The character that should be displayed on the panel
	const [takenCharacters, setTakenCharacters] = useState<TakenCharacter[]>([]) // Characters that have been chosen by other players
	const [isClosing, setIsClosing] = useState(false) // Track if the panel is currently closing
	const [ready, setReady] = useState(false) // Whether the player has clicked ready yet
	const [showOverlay, setShowOverlay] = useState<string | undefined>(undefined) // Whether a characters deck/hero overlay should show

	const { getPanelState, changeDir, open, close } = useSlidingPanel()

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

	// Socket events
	useSocket({
		eventName: 'characterChosen',
		callBack: (eventData: SocketEvents['characterChosen']) => {
			// Check if you chose the character
			if (eventData.playerID === socket.id) {
				setReady((prev) => !prev)
			} else {
				setTakenCharacters((prev) => [...prev, eventData])
			}
		},
	})

	const optionsClassName = useMemo(
		() => (selectedCharacter && xl ? 'transition-transform duration-700 translate-x-[50%]' : ''),
		[selectedCharacter, xl]
	)

	const buttonText = useMemo(() => (ready ? 'Cancel' : 'Ready'), [ready])

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
								lockOption={ready}
								takenCharacters={takenCharacters}
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
							backgroundColor: selectedCharacter ? (!ready ? selectedCharacter.bgColor : colors.slate['300']) : 'gray',
						}}
						onClick={() => {
							socket.emit('chooseCharacter', selectedCharacter?.title, socket.id)
						}}
						disabled={!selectedCharacter}
					>
						{buttonText}
					</button>
					{ready && takenCharacters.length >= 1 && (
						<button
							className={cn(
								'pt-[10rem] xl:py-4 rounded-lg animate-pulse bg-slate-300 w-[235px] hover:animate-none hover:bg-slate-200'
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

export type TakenCharacter = {
	characterName: CharacterNameEnum
	playerName: string
	playerID: string
}
