import clsx from 'clsx'

interface LoadingStateProps {
	isFullscreen?: boolean
}
export default function LoadingState({ isFullscreen }: LoadingStateProps) {
	return (
		<div className={clsx('flex justify-center items-center', isFullscreen ? 'h-screen' : 'h-fit')}>
			<div className='border-4 border-t-4 border-gray-300 border-t-slate-800 rounded-full w-16 h-16 animate-spin' />
		</div>
	)
}
