import { useState } from 'react'
import { characters, OptionObj } from '../constants/characterInfo'
import Text from './Text'
import Toggle from './Toggle'
import { useBreakpoint } from 'src/hooks/useBreakpoint'
import { cn } from 'src/utils/cn'

interface CharacterDescriptionProps {
	selected: OptionObj | undefined
	onDeckClick: () => void
	onHeroClick: () => void
}

export default function CharacterDescription({ selected, onDeckClick, onHeroClick }: CharacterDescriptionProps) {
	const [toggle, setToggle] = useState<ToggleType>(toggleOptions[0])

	const xs = useBreakpoint('xs')

	if (!selected) return null

	// Get the full character info from selected
	const character = characters.find((c) => c.title === selected.title)
	if (!character) throw Error('Selected character info not found')

	return (
		<div className='flex size-full p-2'>
			<div
				className={cn(
					'w-full flex justify-center items-center border p-2 gap-8',
					!xs && 'flex-col gap-1 justify-start',
					toggle === 'Hero' && 'gap-3'
				)}
				style={{ borderColor: character.bgColor }}
			>
				{!xs && <Toggle toggleOptions={toggleOptions} toggle={toggle} setToggle={setToggle} />}
				{xs ? (
					<>
						<div className='flex flex-col justify-center w-[50%] h-full'>
							<Text as='h1'>Hero Ability</Text>
							<HeroAbilityInfo specialAbility={character.specialAbility} onHeroClick={onHeroClick} />
						</div>
						<div className='flex flex-col justify-center items-center h-full w-[30%]'>
							<Text as='h1'>Deck Info</Text>
							<DeckInfoCard cardBack={character.deck.cardBack} onDeckClick={onDeckClick} />
						</div>
					</>
				) : toggle === 'Hero' ? (
					<HeroAbilityInfo specialAbility={character.specialAbility} onHeroClick={onHeroClick} />
				) : (
					<div className='flex justify-center items-center h-full w-[40%]'>
						<DeckInfoCard cardBack={character.deck.cardBack} onDeckClick={onDeckClick} />
					</div>
				)}
			</div>
		</div>
	)
}

interface DeckInfoCardProps {
	cardBack: string
	onDeckClick: () => void
}
function DeckInfoCard({ cardBack, onDeckClick }: DeckInfoCardProps) {
	return (
		<div className='w-[70%] h-full flex justify-center items-center hover:rotate-90 transition-all duration-300 cursor-pointer'>
			<button className='size-fit' onClick={onDeckClick}>
				<img src={cardBack} className='object-contain w-full h-fit' />
			</button>
		</div>
	)
}

interface HeroAbilityProps {
	specialAbility: string
	onHeroClick: () => void
}
function HeroAbilityInfo({ specialAbility, onHeroClick }: HeroAbilityProps) {
	const xs = useBreakpoint('xs')

	return (
		<div
			className={cn(
				'overflow-y-auto size-fit px-2 flex flex-col justify-center- items-center gap-4 pb-2',
				!xs && 'gap-2'
			)}
		>
			<Text as='h2' className='text-white text-base'>
				{specialAbility}
			</Text>
			<button
				className='size-fit py-2 px-8 text-black bg-slate-400 rounded-2xl border-slate-700 hover:bg-slate-500 transition-colors'
				onClick={onHeroClick}
			>
				More Info
			</button>
		</div>
	)
}

const toggleOptions = ['Hero', 'Deck']
export type ToggleType = (typeof toggleOptions)[number]
