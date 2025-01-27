import { createLazyFileRoute } from '@tanstack/react-router'
import ScrollableCardOptions, {
	OptionObj,
} from '../components/ScrollableCardOptions'
import Text from '../components/Text'
import { CharacterNameEnum } from '../enums/CharacterNameEnum'
import { useEffect, useRef, useState } from 'react'
import CharacterDescription from '../components/CharacterDescription'
import { AttackTypeEnum } from '../enums/AttackTypeEnum'
import { CharacterColorEnum } from '../enums/CharacterColorEnum'
import SlidingPanel from '../components/SlidingPanel'
import { DirectionalEnum } from '../enums/DirectionalEnum'

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

	const waitToReopen = 600 // Miliseconds

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

	return (
		<div className="flex w-full h-[calc(100dvh-var(--navbar-height))] bg-gray-900 justify-center items-center">
			<SlidingPanel
				elementRef={slidingPanelRef}
				show={showPanelRef.current ?? false}
				sameLength={DirectionalEnum.RIGHT}
				className="rounded-lg"
			>
				<div
					className="flex border-[4] size-full rounded-lg justify-center items-center"
					style={{ backgroundColor: displayCharacter?.bgColor }}
				>
					<Text as="p">{displayCharacter?.title}</Text>
				</div>
				{/* <CharacterDescription selected={selectedCharacter} /> */}
			</SlidingPanel>

			<div className="flex flex-col size-full items-end mx-16">
				<Text
					as="h1"
					className="text-white text-center font-navBarButtons text-[1.5rem] xs:text-[2rem] mt-4"
				>
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
	)
}

const options = [
	{
		bg: 'src/assets/img/medusa.png',
		bgColor: CharacterColorEnum.GREEN,
		title: CharacterNameEnum.MEDUSA,
		stats: {
			health: 16,
			move: 3,
			attackType: AttackTypeEnum.RANGED,
		},
	},
	{
		bg: 'src/assets/img/sinbad.png',
		bgColor: CharacterColorEnum.ORANGE,
		title: CharacterNameEnum.SINBAD,
		stats: {
			health: 20,
			move: 3,
			attackType: AttackTypeEnum.MELEE,
		},
	},
	{
		bg: 'src/assets/img/alice.png',
		bgColor: CharacterColorEnum.BLUE,
		title: CharacterNameEnum.ALICE,
		stats: {
			health: 5,
			move: 3,
			attackType: AttackTypeEnum.MELEE,
		},
	},
	{
		bg: 'src/assets/img/king-arthur.png',
		bgColor: CharacterColorEnum.RED,
		title: CharacterNameEnum.KING_ARTHUR,
		stats: {
			health: 30,
			move: 3,
			attackType: AttackTypeEnum.MELEE,
		},
	},
]
