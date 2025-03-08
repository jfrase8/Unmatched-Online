import { useCallback, useState } from 'react'

/** Takes in a query selector and finds all currently hovered elements with that selector and returns them as an array.
 * It also returns a callback to when the hovering function should be called.
 */
export function useHoveredElements(querySelector?: string) {
	const [hoveredElements, setHoveredElements] = useState<Element[]>([])

	const handleHover = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			// Get all elements at the current mouse position
			const elements = document.elementsFromPoint(event.clientX, event.clientY)

			// If no specified query selector, return all hovered elements
			if (!querySelector) {
				setHoveredElements(elements)
				return
			}

			// Filter elements that match the querySelector
			const matchingElements = elements.filter((element) => element.matches(querySelector))

			console.log(matchingElements)

			setHoveredElements(matchingElements)
		},
		[querySelector]
	)

	// Reset on mouse leave
	const handleMouseLeave = useCallback(() => {
		setHoveredElements([])
	}, [])

	return { handleHover, hoveredElements, handleMouseLeave }
}
