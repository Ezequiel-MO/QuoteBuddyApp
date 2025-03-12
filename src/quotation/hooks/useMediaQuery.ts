import { useState, useEffect } from 'react'

export const useMediaQuery = (query: string): boolean => {
	const [matches, setMatches] = useState(false)

	useEffect(() => {
		const mediaQuery = window.matchMedia(query)

		// Set initial value
		setMatches(mediaQuery.matches)

		// Define callback for media query change events
		const handler = (event: MediaQueryListEvent) => {
			setMatches(event.matches)
		}

		// Add event listener with the callback
		mediaQuery.addEventListener('change', handler)

		// Clean up
		return () => {
			mediaQuery.removeEventListener('change', handler)
		}
	}, [query])

	return matches
}

// Predefined breakpoints
export const useBreakpoint = () => {
	const isMobile = useMediaQuery('(max-width: 639px)')
	const isTablet = useMediaQuery('(min-width: 640px) and (max-width: 1023px)')
	const isDesktop = useMediaQuery('(min-width: 1024px)')
	const isLargeDesktop = useMediaQuery('(min-width: 1280px)')

	return { isMobile, isTablet, isDesktop, isLargeDesktop }
}
