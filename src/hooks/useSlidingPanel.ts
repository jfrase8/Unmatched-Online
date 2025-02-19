import { useCallback, useMemo, useState } from 'react'
import { DirectionalEnum } from '../enums/DirectionalEnum'

/** Hook for the SlidingPanel component */
export default function useSlidingPanel() {
	const [dir, setDir] = useState<DirectionalEnum>(DirectionalEnum.LEFT)
	const [isOpen, setIsOpen] = useState(false)
	const changeDir = useCallback((dir: DirectionalEnum) => setDir(dir), [])
	const open = useCallback((dir: DirectionalEnum) => {
		setDir(dir)
		setIsOpen(true)
	}, [])
	const close = useCallback(() => {
		setIsOpen(false)
	}, [])

	return useMemo(
		() => ({
			dir,
			isOpen,
			changeDir: changeDir,
			open: open,
			close: close,
		}),
		[changeDir, close, dir, isOpen, open]
	)
}
