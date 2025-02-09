import { createLazyFileRoute } from '@tanstack/react-router'
import ScrollableCardOptions from '../components/ScrollableCardOptions'
import Text from '../components/Text'
import { useEffect, useRef, useState } from 'react'
import CharacterDescription from '../components/CharacterDescription'
import SlidingPanel from '../components/SlidingPanel'
import { DirectionalEnum } from '../enums/DirectionalEnum'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { OptionObj, options } from '../constants/characterInfo'

export const Route = createLazyFileRoute('/play')({
	component: Play,
})

function Play() {
	const [selectedCharacter, setSelectedCharacter] = useState<
		OptionObj | undefined
	>(undefined) // The character the user has selected
	const [displayCharacter, setDisplayCharacter] = useState<
		OptionObj | undefined
	>(undefined) // The character that should be displayed on the panel
	const [showPanel, setShowPanel] = useState<boolean>(false) // True if the panel should be showing
	const [isClosing, setIsClosing] = useState<boolean>(false) // Track if the panel is currently closing

	const slidingPanelRef = useRef<HTMLDivElement>(null)

	const waitToReopen = 600 // Milliseconds

	// ShowPanelRef is used so the useEffect will not be called infinitely
	const showPanelRef = useRef<boolean>()
	showPanelRef.current = showPanel

	// isClosing must be a ref so the useEffect will not reset the timeout after closing
	const isClosingRef = useRef<boolean>()
	isClosingRef.current = isClosing

	// selectedCharacter needs to be a ref so that the timeout sets the display character to the newest selected character
	const selectedCharacterRef = useRef<OptionObj | undefined>()
	selectedCharacterRef.current = selectedCharacter

	// After a character is selected, set the panel to show, unless it is already showing, then time it so it closes then opens again
	useEffect(() => {
		if (isClosingRef.current) return // early return if the panel is in the middle of closing

		// Currently showing the panel
		if (showPanelRef.current) {
			setShowPanel(false)
			setIsClosing(true)
			setTimeout(() => {
				setShowPanel(true)
				setDisplayCharacter(selectedCharacterRef.current)
				setIsClosing(false)
			}, waitToReopen)
		}
		// First time panel has been opened
		else if (selectedCharacter) {
			setShowPanel(true)
			setDisplayCharacter(selectedCharacterRef.current)
		}
	}, [selectedCharacter])

	// Will be true if the screen size is above small
	const sm = useBreakpoint('sm')

	return (
		<div className="flex w-full h-[calc(100dvh-var(--navbar-height))] bg-gray-900 justify-center items-center">
			<SlidingPanel
				elementRef={slidingPanelRef}
				show={showPanelRef.current ?? false}
				sameLength={sm ? DirectionalEnum.LEFT : DirectionalEnum.DOWN}
				className="rounded-lg"
			>
				<div
					className="flex border-[4] size-full rounded-lg justify-center items-center"
					style={{
						backgroundColor: 'black',
					}}
				>
					<CharacterDescription selected={displayCharacter} />
				</div>
			</SlidingPanel>

			<div className="flex flex-col size-full items-end mx-16">
				<div className="flex flex-col items-center">
					<Text as="h1" className="xs:text-[2rem] mt-4">
						CHOOSE YOUR CHARACTER
					</Text>
					<ScrollableCardOptions
						ref={slidingPanelRef}
						options={options}
						onSelect={setSelectedCharacter}
						selected={selectedCharacter}
					/>
				</div>
			</div>
		</div>
	)
}
