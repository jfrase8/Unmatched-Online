import { createLazyFileRoute } from '@tanstack/react-router'
import ScrollableCardOptions from '../components/ScrollableCardOptions'
import Text from '../components/Text'
import { useEffect, useMemo, useRef, useState } from 'react'
import CharacterDescription from '../components/CharacterDescription'
import SlidingPanel from '../components/SlidingPanel'
import { DirectionalEnum } from '../enums/DirectionalEnum'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { OptionObj, options } from '../constants/characterInfo'
import useSlidingPanel from '../hooks/useSlidingPanel'

export const Route = createLazyFileRoute('/play')({
	component: Play,
})

function Play() {
	const [selectedCharacter, setSelectedCharacter] = useState<OptionObj | undefined>(undefined) // The character the user has selected
	const [displayCharacter, setDisplayCharacter] = useState<OptionObj | undefined>(undefined) // The character that should be displayed on the panel
	const [isClosing, setIsClosing] = useState<boolean>(false) // Track if the panel is currently closing

	const { dir, isOpen, changeDir, open, close } = useSlidingPanel()

	const slidingPanelRef = useRef<HTMLDivElement>(null)

	const waitToReopen = 700 // Milliseconds

	// isOpenRef is used so the useEffect will not be called infinitely
	const isOpenRef = useRef<boolean>()
	isOpenRef.current = isOpen

	// isClosing must be a ref so the useEffect will not reset the timeout after closing
	const isClosingRef = useRef<boolean>()
	isClosingRef.current = isClosing

	// selectedCharacter needs to be a ref so that the timeout sets the display character to the newest selected character
	const selectedCharacterRef = useRef<OptionObj | undefined>()
	selectedCharacterRef.current = selectedCharacter

	// Direction ref
	const dirRef = useRef<DirectionalEnum>(DirectionalEnum.LEFT)
	dirRef.current = dir

	// After a character is selected, set the panel to show, unless it is already showing, then time it so it closes then opens again
	useEffect(() => {
		if (isClosingRef.current) return // early return if the panel is in the middle of closing

		// Currently showing the panel
		if (isOpenRef.current) {
			close()
			setIsClosing(true)
			setTimeout(() => {
				open(dirRef.current)
				setDisplayCharacter(selectedCharacterRef.current)
				setIsClosing(false)
			}, waitToReopen)
		}
		// First time panel has been opened
		else if (selectedCharacter) {
			open(dirRef.current)
			setDisplayCharacter(selectedCharacterRef.current)
		}
	}, [close, open, selectedCharacter])

	// Will be true if the screen size is above small
	const sm = useBreakpoint('sm')

	useEffect(() => {
		if (sm) changeDir(DirectionalEnum.LEFT)
		else changeDir(DirectionalEnum.DOWN)
	}, [changeDir, sm])

	const optionsClassName = useMemo(
		() => (selectedCharacter ? 'transition-transform duration-700 translate-x-[50%]' : ''),
		[selectedCharacter]
	)

	return (
		<div className='flex w-full h-[calc(100dvh-var(--navbar-height))] bg-gray-900 justify-center items-center'>
			<div className='flex flex-col size-full items-center'>
				<div className={'flex flex-col items-center'}>
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
									<CharacterDescription selected={displayCharacter} />
								</div>
							}
							className='rounded-lg'
							isOpen={isOpen}
							dir={dir}
						>
							<ScrollableCardOptions
								ref={slidingPanelRef}
								options={options}
								onSelect={setSelectedCharacter}
								selected={selectedCharacter}
							/>
						</SlidingPanel>
					</div>
				</div>
			</div>
		</div>
	)
}
