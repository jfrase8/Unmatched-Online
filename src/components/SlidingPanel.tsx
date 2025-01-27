import clsx from 'clsx'
import { ReactNode, RefObject, useEffect, useMemo, useState } from 'react'
import { DirectionalEnum } from '../enums/DirectionalEnum'

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
	sameLength?: never
}

interface SlidingPanelWithYSlide extends UnconditionalSlidingPanelProps {
	/** How much the panel should slide up (negative) or down (positive) */
	ySlide: number
	xSlide?: never // Prevent `xSlide` from being passed when `ySlide` is provided
	sameLength?: never
}

interface SlidingPanelWithSameLength extends UnconditionalSlidingPanelProps {
	/** Gives the sliding panel the same length of the ref element. Pass in the slide direction */
	sameLength?: DirectionalEnum
	ySlide?: never
	xSlide?: never
}

type SlidingPanelProps =
	| SlidingPanelWithXSlide
	| SlidingPanelWithYSlide
	| SlidingPanelWithSameLength

export default function SlidingPanel({
	elementRef,
	xSlide = 0,
	ySlide = 0,
	sameLength,
	show,
	className,
	children,
}: SlidingPanelProps) {
	// The rect of the ref element
	const [rect, setRect] = useState<DOMRect | null>(null)

	// Booleans for checking which direction we are sliding
	const leftSlide = xSlide < 0 || sameLength === DirectionalEnum.LEFT
	const rightSlide = xSlide > 0 || sameLength === DirectionalEnum.RIGHT
	const upSlide = ySlide < 0 || sameLength === DirectionalEnum.UP
	const downSlide = ySlide > 0 || sameLength === DirectionalEnum.DOWN

	console.log(leftSlide, rightSlide, upSlide, downSlide)

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
			top:
				show && upSlide
					? ySlide
						? rect.top + ySlide
						: rect.top - rect.height
					: rect.top,
			// If we want to slide left, we need to move the left position to the left by an offset equal to the width increase
			left:
				show && leftSlide
					? xSlide
						? rect.left + xSlide
						: rect.left - rect.width
					: rect.left,
			// Width and height will always increase by the value of slide, or double if you input sameLength. Negative or positive is for direction
			width:
				show && xSlide
					? rect.width + Math.abs(xSlide)
					: show && (leftSlide || rightSlide)
						? rect.width * 2
						: rect.width,
			height:
				show && ySlide
					? rect.height + Math.abs(ySlide)
					: show && (downSlide || upSlide)
						? rect.height * 2
						: rect.height,
		}
	}, [downSlide, leftSlide, rect, rightSlide, show, upSlide, xSlide, ySlide])

	const childStyles = useMemo(() => {
		if (!rect) return {}

		return {
			// Whichever direction we are sliding, we want to start the content on that end
			right: rightSlide ? 0 : undefined,
			left: leftSlide ? 0 : undefined,
			top: upSlide ? 0 : undefined,
			bottom: downSlide ? 0 : undefined,
			// Width/height of the child should be equal to the slide distance if we are sliding in that direction
			width: xSlide ? Math.abs(xSlide) : rect.width,
			height: ySlide ? Math.abs(ySlide) : rect.height,
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
