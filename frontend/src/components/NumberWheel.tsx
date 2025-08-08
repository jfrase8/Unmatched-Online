import { useMemo } from 'react'

interface NumberWheelProps {
	min?: number
	max?: number
	selectedNumber?: number
}

export default function NumberWheel({ min = 0, max = 10, selectedNumber = 10 }: NumberWheelProps) {
	const numberList = useMemo(
		() => Array.from({ length: max - min + 1 }, (_, i) => i + min),
		[min, max]
	)

	const getAngle = (index: number) => {
		const topIndex = numberList.indexOf(max)
		const relativeIndex = (index - topIndex + numberList.length) % numberList.length
		const fraction = relativeIndex / numberList.length
		return fraction * 360 - 90
	}

	const getLeftPosition = (index: number) => {
		return `${Math.cos((getAngle(index) * Math.PI) / 180) * 50 + 50}%`
	}

	const getTopPosition = (index: number) => {
		return `${Math.sin((getAngle(index) * Math.PI) / 180) * 50 + 50}%`
	}

	const getNumberRotation = (index: number) => {
		// Rotate numbers to face outward correctly
		return `rotate(${getAngle(index) + 90}deg)`
	}

	const wheelRotation = useMemo(() => {
		const selectedIndex = numberList.indexOf(selectedNumber)
		const maxIndex = numberList.indexOf(max)
		const relativeIndex = (selectedIndex - maxIndex + numberList.length) % numberList.length
		const fraction = relativeIndex / numberList.length
		const angle = fraction * 360
		return `rotate(${-angle}deg)`
	}, [numberList, selectedNumber, max])

	return (
		<div className='bg-black rounded-full size-[10rem] flex justify-center items-center relative'>
			<div
				className='relative size-[80%] transition-transform duration-500'
				style={{ transform: wheelRotation }}
			>
				{numberList.map((n, i) => (
					<div
						key={n}
						className='bg-black text-white size-[20%] flex justify-center items-center absolute'
						style={{
							left: getLeftPosition(i),
							top: getTopPosition(i),
							transform: `translate(-50%, -50%) ${getNumberRotation(i)}`,
						}}
					>
						{n}
					</div>
				))}
			</div>
			<svg className='absolute size-full p-1' viewBox='0 0 100 100' preserveAspectRatio='none'>
				<defs>
					<mask id='holeMask' x='0' y='0' width='100' height='100' maskUnits='userSpaceOnUse'>
						<rect width='100' height='100' fill='white' />
						<circle cx='50' cy='8' r='10' fill='black' />
					</mask>
				</defs>
				<circle cx='50' cy='50' r='50' fill='#e5e7eb' mask='url(#holeMask)' />
			</svg>
			<div className='absolute size-[20%] bg-black rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
		</div>
	)
}
