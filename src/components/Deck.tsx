import { Card } from '../constants/deckInfo'

interface DeckProps {
	cards: Card[]
	drawnCard: Card | undefined
}
export default function DeckDisplay({ cards, drawnCard }: DeckProps) {
	return <div className=''></div>
}
