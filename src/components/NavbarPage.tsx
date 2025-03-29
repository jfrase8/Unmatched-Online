import { useNavigate } from '@tanstack/react-router'
import Text from './Text'
import clsx from 'clsx'
import { cn } from '../utils/cn'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { navBarIcons } from 'src/constants/navBarIcons'

interface NavbarPageProps {
	pageTitle: string
	isCurrent: boolean
}

export default function NavbarPage({ pageTitle, isCurrent }: NavbarPageProps) {
	const navigate = useNavigate()
	const llg = useBreakpoint('llg')
	const xs = useBreakpoint('xs')

	return (
		<button
			onClick={() => navigate({ to: `/${pageTitle.toLowerCase()}` })}
			className={cn(
				`relative h-[--nav-button-h] w-[--nav-button-w] p-2 text-black group shadow-white shadow-[0_4px_8px_0_rgba(0,0,0,0.25)]
				transition-all duration-500 border-2 border-cyan-400 rounded-md min-w-[20%]
				 hover:bg-cyan-400 hover:border-black`,
				isCurrent && 'pointer-events-none',
				isCurrent && llg && '!border-black !bg-cyan-400 !transition-none !rounded-none box-border',
				!llg && 'bg-cyan-400 border-black rounded-full overflow-hidden',
				!xs &&
					'flex justify-center items-center bg-cyan-400 border border-slate-800 hover:bg-slate-800 hover:border-white',
				!xs && isCurrent && 'bg-slate-800 border-white'
			)}
		>
			{xs ? (
				<>
					<svg className='absolute size-full inset-0 z-0' viewBox='0 0 100% 100%'>
						<g
							transform='scale(1) translate(-100, 0)'
							className={clsx(
								'transition-transform duration-700 group-hover:translate-x-[110%] group-hover:rotate-90',
								isCurrent && '!translate-x-[110%] !rotate-90'
							)}
						>
							<polygon
								points='50,15 61,39 88,39 66,57 75,84 50,69 25,84 34,57 12,39 39,39'
								fill='black'
								stroke='black'
							/>
						</g>
						<g
							transform='scale(0.25) translate(-100, 0)'
							className={clsx(
								'transition-transform duration-700 group-hover:translate-x-[110%] group-hover:rotate-90',
								isCurrent && '!translate-x-[110%] !rotate-90'
							)}
						>
							<polygon
								points='50,15 61,39 88,39 66,57 75,84 50,69 25,84 34,57 12,39 39,39'
								fill='white'
								stroke='black'
							/>
						</g>
					</svg>
					<div className='relative z-10 flex justify-center items-center h-full'>
						<div
							className={cn(
								'flex justify-center items-center size-full py-2 px-4 rounded-full transition-all duration-500',
								!llg && 'bg-slate-700/50 backdrop-blur border border-slate-800',
								!llg && isCurrent && 'bg-slate-800 border-white'
							)}
						>
							{xs && (
								<Text
									as='h1'
									className={cn(
										`transition-all duration-300 text-black font-navBarButtons text-sm sm:text-lg md:text-xl xl:text-[1.5rem]`,
										!llg && isCurrent && 'text-white'
									)}
								>
									{pageTitle.toUpperCase()}
								</Text>
							)}
						</div>
					</div>
				</>
			) : (
				navBarIcons(
					pageTitle.toLowerCase(),
					cn('fill-slate-800 size-10 group-hover:fill-white transition-all duration-500', isCurrent && 'fill-white')
				)
			)}
		</button>
	)
}
