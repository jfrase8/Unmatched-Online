import { Dispatch, SetStateAction, useMemo, useState } from 'react'

import { decks } from '../../../common/constants/deckInfo'

import { sortDeck } from '../utils/sort'
import { BlurredPopup } from './BlurredPopup'
import { capitalizeFirstLetter } from 'src/utils/capitalizeFirstLetter'
import { useBreakpoint } from 'src/hooks/useBreakpoint'
import FlippableCard from './FlippableCard'
import clsx from 'clsx'
import Text from './Text'
import Arrow from 'src/assets/svg/down_arrow.svg?react'
import { CharacterNameEnum } from '../../../common/enums/CharacterNameEnum'
import { SortTypeEnum } from '../../../common/enums/SortTypeEnum'
import { characters } from '../../../common/constants/characterInfo'

interface CharacterInfoPopupProps {
	/** The name of the character to show the info for */
	character: CharacterNameEnum
	/** The state function for setting the popup type that should show */
	setShowPopup: Dispatch<SetStateAction<string | undefined>>
	/** The state value for the popup type that should show */
	infoContent: string
}

/** Modal component that shows when clicking on view more for a character when choosing a character to play */
export default function CharacterInfoPopup({
	character,
	setShowPopup,
	infoContent,
}: CharacterInfoPopupProps) {
	const data = characters[character]

	const headerText = `${character} ${capitalizeFirstLetter(infoContent)} Info`

	const big = useBreakpoint('big')
	const sm = useBreakpoint('sm')
	const xs = useBreakpoint('xs')
	const xxs = useBreakpoint('xxs')

	const cardSize = useMemo(
		() => (sm ? 'h-[45rem]' : xs ? 'h-[35rem]' : xxs ? 'h-[28rem]' : 'h-[25rem]'),
		[sm, xs, xxs]
	)
	const topPadding = useMemo(
		() => (sm ? 'pt-4' : xs ? 'pt-16' : xxs ? 'pt-24' : 'pt-48'),
		[sm, xs, xxs]
	)

	const [flip, setFlip] = useState(false)

	if (!data) return
	// We want the images displayed here to be sorted by card type
	const sortedImages = sortDeck(decks[character], SortTypeEnum.TYPE).map((card) => card.imagePath)

	return (
		<BlurredPopup
			headerText={headerText}
			borderColor={data.bgColor}
			setShowPopup={setShowPopup}
			textClassName={clsx(!xxs && 'text-[1.2rem]')}
		>
			{infoContent === 'deck' ? (
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 justify-items-center gap-4 overflow-y-auto w-full p-8'>
					{sortedImages.map((img) => (
						<img src={img} key={img} />
					))}
				</div>
			) : (
				<>
					{!big && (
						<div
							className={clsx(
								'flex gap-2 justify-center items-center',
								topPadding,
								!sm && 'flex-col'
							)}
						>
							<Text as='h1' className='text-[1.8rem]'>
								Click to Flip
							</Text>
							<Arrow className='fill-white size-10' />
						</div>
					)}
					<div className='flex size-full justify-center items-center'>
						{big ? (
							<img
								src={data.characterSheet}
								className='size-[85%] object-contain aspect-[1277/911]'
							/>
						) : (
							<button className='size-fit' onClick={() => setFlip((prev) => !prev)}>
								<FlippableCard
									front={characters[CharacterNameEnum.MEDUSA].splitCharacterSheet.front}
									back={characters[CharacterNameEnum.MEDUSA].splitCharacterSheet.back}
									flip={flip}
									imageClassName={cardSize}
								/>
							</button>
						)}
					</div>
				</>
			)}
		</BlurredPopup>
	)
}
