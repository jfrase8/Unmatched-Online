import { Dispatch, ReactNode, SetStateAction } from 'react'
import Text from './Text'
import CloseIcon from 'src/assets/svg/close.svg?react'
import { cn } from 'src/utils/cn'
import { Button, Dialog, Modal, ModalOverlay } from 'react-aria-components'
import clsx from 'clsx'

interface BlurredModalProps {
	children: ReactNode
	/** The text to display in the header of the modal */
	headerText: string
	/** The color of the border of the modal */
	borderColor?: string
	/** True if the modal is currently open */
	showModal: boolean
	/** The state function for setting the modal type that should show */
	setShowModal: Dispatch<SetStateAction<boolean>>
	/** The class name for the text in the header */
	textClassName?: string
	/** The class name for the wrapper of the modal */
	wrapperClassName?: string
}
export function BlurredModal({
	headerText,
	borderColor = 'gray',
	showModal,
	setShowModal,
	textClassName,
	wrapperClassName,
	children,
}: BlurredModalProps) {
	return (
		<ModalOverlay
			className={({ isEntering, isExiting }) =>
				clsx(
					'fixed inset-0 flex flex-col justify-center items-center z-[100] backdrop-blur bg-gray-400/10 cursor-pointer',
					isEntering && 'animate-in fade-in ease-out',
					isExiting && 'animate-out ease-in fade-out'
				)
			}
			isDismissable
			isOpen={showModal}
			onOpenChange={setShowModal}
		>
			<Modal>
				<Dialog
					className={cn(
						'cursor-default fixed inset-10 rounded-lg flex flex-col justify-start items-center z-[100] backdrop-blur bg-black/50 border-l-8 border-b-8',
						wrapperClassName
					)}
					style={{ borderColor: borderColor }}
				>
					{({ close }) => (
						<>
							<div
								className='relative min-h-16 w-full rounded-tr-lg rounded-tl-sm flex items-center justify-center'
								style={{
									backgroundColor: borderColor,
								}}
							>
								<Text as='h1' className={cn('text-3xl', textClassName)}>
									{headerText}
								</Text>
								<Button
									className='group absolute top-3 right-3 size-fit flex justify-center items-center'
									onPress={close}
								>
									<CloseIcon className='transition-transform duration-500 size-9 fill-white group-hover:scale-110' />
								</Button>
							</div>
							{children}
						</>
					)}
				</Dialog>
			</Modal>
		</ModalOverlay>
	)
}
