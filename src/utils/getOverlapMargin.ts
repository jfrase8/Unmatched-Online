/** Gets the negative margin based on the number of cards in the player's hand */
export function getOverlapMargin(cardsInHand: number) {
	return Math.max(cardsInHand * -16, -128)
}
