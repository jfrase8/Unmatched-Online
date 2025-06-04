import { useState, useEffect } from 'react'

const breakpoints = {
	xxs: '(min-width: 400px)',
	xs: '(min-width: 500px)',
	xsm: '(min-width: 550px)',
	sm: '(min-width: 640px)',
	md: '(min-width: 768px)',
	big: '(min-width: 900px)',
	lg: '(min-width: 1024px)',
	llg: '(min-width: 1100px)',
	xl: '(min-width: 1280px)',
	'2xl': '(min-width: 1536px)',
}

export function useBreakpoint(breakpoint: keyof typeof breakpoints): boolean {
	const mediaQuery = breakpoints[breakpoint]
	const [matches, setMatches] = useState(() => window.matchMedia(mediaQuery).matches)

	useEffect(() => {
		const mediaQueryList = window.matchMedia(mediaQuery)

		const handleChange = (event: MediaQueryListEvent) => setMatches(event.matches)
		mediaQueryList.addEventListener('change', handleChange)

		return () => mediaQueryList.removeEventListener('change', handleChange)
	}, [mediaQuery])

	return matches
}
