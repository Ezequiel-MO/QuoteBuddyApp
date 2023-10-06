import React, { createContext, useContext } from 'react'
import cuttLogo from '../assets/CUTT_LOGO.png'

export type ThemeContextType = {
	colors: {
		primary: string
		secondary: string
		tertiary: string
	}
	fonts: {
		main: string
	}
	logo: string
}

const defaultTheme: ThemeContextType = {
	colors: {
		primary: 'cutt-orange',
		secondary: 'cutt-gray',
		tertiary: 'cutt-sand'
	},
	fonts: {
		main: 'Barlow Condensed'
	},
	logo: cuttLogo
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
	const context = useContext(ThemeContext)
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}
	return context
}

interface ThemeProviderProps {
	theme?: ThemeContextType
	children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
	children,
	theme = defaultTheme
}) => {
	return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}
