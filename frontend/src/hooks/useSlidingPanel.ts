import { useCallback, useMemo, useRef, useState } from 'react'
import { DirectionalEnum } from '../../../common/enums/DirectionalEnum'

/** Hook for managing multiple SlidingPanel components */
export default function useSlidingPanel() {
	// Store the state for each panel using an object
	const [panels, setPanels] = useState<Record<string, { dir: DirectionalEnum; isOpen: boolean }>>(
		{}
	)

	// Sound for opening panels
	const openSoundRef = useRef<HTMLAudioElement | null>(null)

	const playSound = () => {
		if (!openSoundRef.current) {
			openSoundRef.current = new Audio('/assets/sounds/slide.wav')
		}
		openSoundRef.current.currentTime = 0
		openSoundRef.current.playbackRate = 2.5
		openSoundRef.current.volume = 0.3
		openSoundRef.current.play()
	}

	// Helper function to change the direction of a specific panel
	const changeDir = useCallback((panelId: string, dir: DirectionalEnum) => {
		setPanels((prevPanels) => ({
			...prevPanels,
			[panelId]: { ...prevPanels[panelId], dir },
		}))
	}, [])

	// Open a specific panel with the provided direction
	const open = useCallback((panelId: string, dir: DirectionalEnum) => {
		setPanels((prevPanels) => ({
			...prevPanels,
			[panelId]: { dir, isOpen: true },
		}))
		playSound()
	}, [])

	// Close a specific panel
	const close = useCallback((panelId: string) => {
		setPanels((prevPanels) => ({
			...prevPanels,
			[panelId]: { ...prevPanels[panelId], isOpen: false },
		}))
	}, [])

	// Helper function to get the state of a specific panel
	const getPanelState = useCallback(
		(panelId: string) => {
			return panels[panelId] || { dir: DirectionalEnum.LEFT, isOpen: false }
		},
		[panels]
	)

	return useMemo(
		() => ({
			changeDir,
			open,
			close,
			getPanelState,
		}),
		[changeDir, close, getPanelState, open]
	)
}

export type PanelState = {
	dir: DirectionalEnum
	isOpen: boolean
}
