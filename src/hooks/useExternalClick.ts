import { useEffect, useRef } from 'react'

export function useExternalClick(callBack: (prev?: string | boolean) => void) {
	const elementRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			// Check if the click was outside the element
			if (elementRef.current && !elementRef.current.contains(e.target as Node)) {
				callBack()
			}
		}

		// Add event listener on mount
		document.addEventListener('mousedown', handleClickOutside)

		// Clean up the event listener on unmount
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [callBack])

	return elementRef
}
