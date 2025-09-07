export default function HandDisplayWrapper({ children }: { children: React.ReactNode }) {
	return (
		<div className='w-[40%] bg-slate-700 h-[30vh] rounded-lg shadow-lg'>
			<div className='flex items-center max-w-full z-[1] h-full overflow-x-auto overflow-y-hidden transition-all duration-500'>
				<div className='flex gap-2 min-w-max p-4 transition-all duration-500 h-full'>
					{children}
				</div>
			</div>
		</div>
	)
}
