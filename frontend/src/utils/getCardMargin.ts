/** Gets the negative margin based on the number of cards in the player's hand */
export function getCardMargin(cardsInHand: number) {
	if (cardsInHand < 4) return '-ml-[1rem]'
	switch (cardsInHand) {
		case 4:
			return '-ml-[2rem]'
		case 5:
			return '-ml-[3rem]'
		case 6:
			return '-ml-[4.2rem]'
		case 7:
			return '-ml-[5.4rem]'
		case 8:
			return '-ml-[6.3rem]'
		case 9:
			return '-ml-[7rem]'
		case 10:
			return '-ml-[7.5rem]'
	}
	if (cardsInHand > 10) return '-ml-[8rem]'
}
