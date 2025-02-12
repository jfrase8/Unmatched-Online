import clsx from 'clsx'
import { ReactNode } from 'react'
import { DirectionalEnum } from '../enums/DirectionalEnum'

interface SlidingPanelProps {
	dir: DirectionalEnum
	isOpen: boolean
	className?: string
	childrenClassName?: string
	panelClassName?: string
	panelContent: ReactNode
	children: ReactNode
}
export default function SlidingPanel({
	className,
	panelContent,
	childrenClassName,
	panelClassName,
	dir,
	isOpen,
	children,
}: SlidingPanelProps) {
	return (
		<div className={clsx('relative size-fit', className)}>
			<div className={clsx('relative size-fit z-[1]', childrenClassName)}>{children}</div>
			<div
				className={clsx(
					'absolute inset-0 bg-black bg-opacity-50 duration-700 transition-transform',
					panelClassName,
					isOpen ? DirClass[dir] : 'translate-x-0 translate-y-0'
				)}
			>
				{panelContent}
			</div>
		</div>
	)
}

const DirClass = {
	[DirectionalEnum.LEFT]: '-translate-x-full',
	[DirectionalEnum.RIGHT]: 'translate-x-full',
	[DirectionalEnum.UP]: '-translate-y-full',
	[DirectionalEnum.DOWN]: 'translate-y-full',
}
