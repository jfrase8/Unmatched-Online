import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Similar to clsx, but rather than just combining tailwind class names it overrides class names that would conflict with each other */
export function cn(...classes: (string | undefined | null | false)[]) {
	return twMerge(clsx(classes))
}
