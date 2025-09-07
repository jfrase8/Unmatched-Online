import { useOpponent } from 'src/hooks/useOpponent'
import HandDisplayWrapper from './HandDisplayWrapper'
import { getCardMargin } from 'src/utils/getCardMargin'
import { decks } from '../../../common/constants/deckInfo'
import { cn } from 'src/utils/cn'

export default function OpponentHandDisplay() {
	const opponent = useOpponent()
	if (!opponent || !opponent.hand || !opponent.character) return null

	const { hand, character } = opponent

	return (
		<HandDisplayWrapper>
			{opponent.hand.map((card, i) => {
				// const cardSelected = selected === i
				return (
					<div
						key={i}
						className={cn(
							'shadow-lg rounded-md transition-all duration-500 border border-black h-full card',
							i !== 0 && getCardMargin(hand.length)
							// cardSelected && 'z-[100] scale-[110%] brightness-125'
						)}
						data-index={i}
					>
						<img
							src={decks[character].cardBack}
							className={'aspect-[--card-aspect] size-full rounded-md'}
						/>
					</div>
				)
			})}
		</HandDisplayWrapper>
	)
}
