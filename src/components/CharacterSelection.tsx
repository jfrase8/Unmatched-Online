import ScrollableCardOptions from '../components/ScrollableCardOptions'
import Text from '../components/Text'
import { useEffect, useMemo, useRef, useState } from 'react'
import CharacterDescription from '../components/CharacterDescription'
import SlidingPanel from '../components/SlidingPanel'
import { DirectionalEnum } from '../enums/DirectionalEnum'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { OptionObj, options } from '../constants/characterInfo'
import useSlidingPanel from '../hooks/useSlidingPanel'
import clsx from 'clsx'
import DeckInfoPopup from '../components/DeckInfoPopup'
import colors from 'tailwindcss/colors'

export default function CharacterSelection() {
	const [selectedCharacter, setSelectedCharacter] = useState<OptionObj | undefined>(undefined) // The character the user has selected
	const [displayCharacter, setDisplayCharacter] = useState<OptionObj | undefined>(undefined) // The character that should be displayed on the panel
	const [isClosing, setIsClosing] = useState<boolean>(false) // Track if the panel is currently closing
	const [ready, setReady] = useState<boolean>(false) // Whether the player has clicked ready yet
	const [showDeckOverlay, setShowDeckOverlay] = useState<boolean>(false) // Whether a characters deck overlay should show

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

	const optionsClassName = useMemo(
		() => (selectedCharacter ? 'transition-transform duration-700 translate-x-[50%]' : ''),
		[selectedCharacter]
	)

	const buttonText = useMemo(() => (ready ? 'Cancel' : 'Ready'), [ready])

	return (
		<>
			{selectedCharacter && showDeckOverlay && (
				<DeckInfoPopup character={selectedCharacter.title} setShowPopup={setShowDeckOverlay} />
			)}
			<div
				className={clsx(
					'flex flex-col h-fit w-full px-12 pb-12 pt-8 items-center bg-gray-800',
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
									<CharacterDescription selected={displayCharacter} onDeckClick={() => setShowDeckOverlay(true)} />
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
							/>
						</SlidingPanel>
					</div>
					<button
						className={clsx(
							'py-4 px-24 rounded-lg transition-all duration-300',
							selectedCharacter && 'hover:brightness-90'
						)}
						style={{
							backgroundColor: selectedCharacter ? (!ready ? selectedCharacter.bgColor : colors.slate['300']) : 'gray',
						}}
						onClick={() => {
							setReady((prev) => !prev)
						}}
						disabled={!selectedCharacter}
					>
						{buttonText}
					</button>
				</div>
			</div>
		</>
	)
}
