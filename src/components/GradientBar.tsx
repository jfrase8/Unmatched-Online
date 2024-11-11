interface GradientBarProps {
	children: React.ReactNode
}

export default function GradientBar({ children }: GradientBarProps) {
	return (
		<div
			className={`transition-all duration-500 h-[--gradient-bar-h] w-[98%] flex flex-row gap-4 items-center justify-left
            bg-gradient-to-r from-cyan-500 to-blue-600 border-[1.5px] border-black rounded-full bg-[length:200%_200%]
            hover:bg-[length:100%_100%]`}
		>
			{children}
		</div>
	)
}
