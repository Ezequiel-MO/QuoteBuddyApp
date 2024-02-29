import { useState, useEffect } from 'react'

export const useDarkMode = (): [boolean, () => void] => {
	const [isDarkMode, setIsDarkMode] = useState<boolean>(
		() => localStorage.theme === 'dark'
	)

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode)
	}

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		const handleChange = (e: MediaQueryListEvent) =>
			onSelectMode(e.matches ? 'dark' : 'light')

		// Add listener to update styles
		mediaQuery.addEventListener('change', handleChange)

		// Setup dark/light mode for the first time
		onSelectMode(mediaQuery.matches ? 'dark' : 'light')

		// Remove listener on cleanup
		return () => mediaQuery.removeEventListener('change', handleChange)
	}, [])

	const onSelectMode = (mode: 'dark' | 'light') => {
		const html = window.document.documentElement

		if (mode === 'dark') {
			html.classList.remove('light')
			html.classList.add('dark')
		} else {
			html.classList.remove('dark')
			html.classList.add('light')
		}

		localStorage.setItem('theme', mode)
	}

	useEffect(() => {
		const html = window.document.documentElement

		const prevTheme = isDarkMode ? 'light' : 'dark'
		html.classList.remove(prevTheme)

		const nextTheme = isDarkMode ? 'dark' : 'light'
		html.classList.add(nextTheme)

		localStorage.setItem('theme', nextTheme)
	}, [isDarkMode])

	return [isDarkMode, toggleDarkMode]
}
