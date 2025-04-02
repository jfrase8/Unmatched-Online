import { Dispatch, ReactNode, SetStateAction } from 'react'
import Text from './Text'
import CloseIcon from 'src/assets/svg/close.svg?react'
import { useExternalClick } from 'src/hooks/useExternalClick'

interface BlurredPopupProps<T> {
	children: ReactNode
	headerText: string
	borderColor?: string
	setShowPopup: Dispatch<SetStateAction<T>>
}
export function BlurredPopup<T extends string | boolean | undefined>({
	children,
	headerText,
	borderColor = 'gray',
	setShowPopup,
}: BlurredPopupProps<T>) {
	const externalClickRef = useExternalClick(() =>
		setShowPopup((prev) => (typeof prev === 'boolean' ? false : undefined) as T)
	)

	return (
		<div className='fixed inset-0 flex flex-col justify-center items-center z-[100] backdrop-blur bg-gray-400/10 cursor-pointer'>
			<div
				className='cursor-default fixed inset-10 rounded-lg flex flex-col justify-start items-center z-[100] backdrop-blur bg-black/50 border-l-4 border-b-4'
				style={{ borderColor: borderColor }}
				ref={externalClickRef}
			>
				<div
					className='h-fit w-full rounded-tr-lg'
					style={{
						backgroundColor: borderColor,
					}}
				>
					<Text as='h1'>{headerText}</Text>
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
