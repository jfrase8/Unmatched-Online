import { useEffect, useRef, useState } from 'react'

/** Checks whether the ref has content which is overflowing */
export function useIsOverflowing() {
	const oveflowRef = useRef<HTMLDivElement>(null)
	const [isOverflowing, setIsOverflowing] = useState(false)

	useEffect(() => {
		const checkOverflow = () => {
			if (oveflowRef.current) {
				const { scrollWidth, clientWidth, scrollHeight, clientHeight } = ref.current
				const overflowsHorizontally = scrollWidth > clientWidth
				const overflowsVertically = scrollHeight > clientHeight
				setIsOverflowing(overflowsHorizontally || overflowsVertically)
			}
		}

		checkOverflow()
		window.addEventListener('resize', checkOverflow) // Recheck on resize
		return () => window.removeEventListener('resize', checkOverflow)
	}, [])

	return { oveflowRef, isOverflowing }
}
