import clsx from 'clsx'
import { ReactNode, RefObject, useEffect, useMemo, useState } from 'react'

interface UnconditionalSlidingPanelProps {
	/** A reference to the element that the panel will slide out from behind of */
	elementRef: RefObject<HTMLElement>
	/** Whether the panel should show or not */
	show: boolean
	/** Custom styles for the panel */
	className?: string
	/** Content inside the panel */
	children?: ReactNode
}

interface SlidingPanelWithXSlide extends UnconditionalSlidingPanelProps {
	/** How much the panel should slide to the left (negative) or right (positive) */
	xSlide: number
	ySlide?: never // Prevent `ySlide` from being passed when `xSlide` is provided
}

interface SlidingPanelWithYSlide extends UnconditionalSlidingPanelProps {
	/** How much the panel should slide up (negative) or down (positive) */
	ySlide: number
	xSlide?: never // Prevent `xSlide` from being passed when `ySlide` is provided
}

type SlidingPanelProps = SlidingPanelWithXSlide | SlidingPanelWithYSlide

export default function SlidingPanel({
	elementRef,
	xSlide = 0,
	ySlide = 0,
	show,
	className,
	children,
}: SlidingPanelProps) {
	// The rect of the ref element
	const [rect, setRect] = useState<DOMRect | null>(null)

	// Booleans for checking which direction we are sliding
	const leftSlide = xSlide < 0
	const rightSlide = xSlide > 0
	const upSlide = ySlide < 0
	const downSlide = ySlide > 0

	// Update `rect` whenever the referenced element changes
	useEffect(() => {
		const updateRect = () => {
			if (elementRef.current) {
				setRect(elementRef.current.getBoundingClientRect())
			}
		}

		// Initial calculation
		updateRect()

		// Listen for window resize to update dimensions
		window.addEventListener('resize', updateRect)
		return () => {
			window.removeEventListener('resize', updateRect)
		}
	}, [elementRef])

	const panelStyles = useMemo(() => {
		if (!rect) return {}

		return {
			// If we want to slide up, we need to move the top position up by an offset equal to the height increase
			top: show && upSlide ? rect.top + ySlide : rect.top,
			// If we want to slide left, we need to move the left position to the left by an offset equal to the width increase
			left: show && leftSlide ? rect.left + xSlide : rect.left,
			// Width and height will always increase by the value of slide. Negative or positive is for direction
			width: show ? rect.width + Math.abs(xSlide) : rect.width,
			height: show ? rect.height + Math.abs(ySlide) : rect.height,
		}
	}, [leftSlide, rect, show, upSlide, xSlide, ySlide])

	const childStyles = useMemo(() => {
		if (!rect) return {}

		return {
			// Whichever direction we are sliding, we want to start the content on that end
			right: rightSlide ? 0 : undefined,
			left: leftSlide ? 0 : undefined,
			top: upSlide ? 0 : undefined,
			bottom: downSlide ? 0 : undefined,
			// Width/height of the child should be equal to the slide distance if we are sliding in that direction
			width: xSlide ? Math.abs(xSlide) : '100%',
			height: ySlide ? Math.abs(ySlide) : '100%',
		}
	}, [downSlide, leftSlide, rect, rightSlide, upSlide, xSlide, ySlide])

	return (
		<div
			className={clsx('absolute transition-all duration-500', className)}
			style={panelStyles}
		>
			<div className="absolute" style={childStyles}>
				{children}
			</div>
		</div>
	)
}
