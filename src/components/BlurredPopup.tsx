import { Dispatch, ReactNode, SetStateAction } from 'react'
import Text from './Text'
import CloseIcon from 'src/assets/svg/close.svg?react'
import { useExternalClick } from 'src/hooks/useExternalClick'
import { cn } from 'src/utils/cn'

interface BlurredPopupProps<T> {
	children: ReactNode
	/** The text to display in the header of the popup */
	headerText: string
	/** The color of the border of the popup */
	borderColor?: string
	/** The state function for setting the popup type that should show */
	setShowPopup: Dispatch<SetStateAction<T>>
	/** The class name for the text in the header */
	textClassName?: string
	/** The class name for the wrapper of the popup */
	wrapperClassName?: string
}
export function BlurredPopup<T extends string | boolean | undefined>({
	children,
	headerText,
	borderColor = 'gray',
	setShowPopup,
	textClassName,
	wrapperClassName,
}: BlurredPopupProps<T>) {
	const externalClickRef = useExternalClick(() =>
		setShowPopup((prev) => (typeof prev === 'boolean' ? false : undefined) as T)
	)

	return (
		<div className='fixed inset-0 flex flex-col justify-center items-center z-[100] backdrop-blur bg-gray-400/10 cursor-pointer'>
			<div
				className={cn(
					'cursor-default fixed inset-10 rounded-lg flex flex-col justify-start items-center z-[100] backdrop-blur bg-black/50 border-l-4 border-b-4',
					wrapperClassName
				)}
				style={{ borderColor: borderColor }}
				ref={externalClickRef}
			>
				<div
					className='h-[2.5rem] w-full rounded-tr-lg flex items-center justify-center'
					style={{
						backgroundColor: borderColor,
					}}
				>
					<Text as='h1' className={textClassName}>
						{headerText}
					</Text>
					<button
						className='size-fit absolute top-[.3rem] right-[.3rem]'
						onClick={() => setShowPopup((prev) => (typeof prev === 'boolean' ? false : undefined) as T)}
					>
						<CloseIcon className='size-6 fill-white' />
					</button>
				</div>
				{children}
			</div>
		</div>
	)
}
