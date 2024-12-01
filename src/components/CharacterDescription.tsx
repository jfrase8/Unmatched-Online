import clsx from 'clsx'
import { OptionObj } from './ScrollableCardOptions'
import Text from './Text'
import { useEffect, useState } from 'react'

interface CharacterDescriptionProps {
	selected: OptionObj
}

export default function CharacterDescription({
	selected,
}: CharacterDescriptionProps) {
	const [finishedAnim, setFinishedAnim] = useState<boolean>(false)

	useEffect(() => {
		setFinishedAnim(false)
		setTimeout(() => {
			setFinishedAnim(true)
		}, 1000)
	}, [selected])

	return (
		<div
			className={clsx(
				`absolute flex flex-row border-2 shadow-gray-300 shadow-lg border-black bg-blue-400
                        top-[3%] left-[1%] 1.8xl:left-[2%] w-[30svw] h-[70svh]
                        opacity-0 transition-all duration-500`,
				finishedAnim && 'opacity-100'
			)}
		>
			{finishedAnim && (
				<>
					<div
						className=" bg-cover bg-no-repeat w-full border-r-2 border-black"
						style={{ backgroundImage: `url(${selected.bg})` }}
					></div>
					<div className="flex flex-col justify-start">
						<div className="flex flex-col justify-start items-center bg-black min-w-[20svw]">
							<Text
								as="h1"
								className="text-white font-navBarButtons text-[2rem]"
							>
								{selected.title}
							</Text>
							<Text as="h2" className="text-gray-300 text-center">
								This is where the description would go.
							</Text>
						</div>
						<div className="flex flex-col justify-start items-center bg-gray-600 min-w-[20svw]">
							<Text
								as="h1"
								className="text-black font-navBarButtons text-[1.5rem]"
							>
								Stats
							</Text>
							<Text as="h2" className="text-black text-center">
								Health: {selected.stats.health}
							</Text>
							<Text as="h2" className="text-black text-center">
								Damage: {selected.stats.damage}
							</Text>
						</div>
					</div>
				</>
			)}
		</div>
	)
}
