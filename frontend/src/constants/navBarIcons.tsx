import FightIcon from 'src/assets/svg/fight.svg?react'
import QuestionIcon from 'src/assets/svg/question.svg?react'
import SettingsIcon from 'src/assets/svg/settings.svg?react'

export const navBarIcons = (icon: string, className: string) => {
	switch (icon) {
		case 'play':
			return <FightIcon className={className} />
		case 'tutorial':
			return <QuestionIcon className={className} />
		case 'settings':
			return <SettingsIcon className={className} />
	}
}
