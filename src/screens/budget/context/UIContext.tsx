// src/screens/budget/context/UIContext.tsx
import React, { createContext, useContext, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

interface UIContextType {
	showActionIcons: boolean
}

const UIContext = createContext<UIContextType | undefined>(undefined)

export const useUIContext = () => {
	const context = useContext(UIContext)
	if (!context) {
		throw new Error('useUIContext must be used within a UIProvider')
	}
	return context
}

interface UIProviderProps {
	children: ReactNode
}

export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
	const location = useLocation()

	// Determine UI states based on location
	const showActionIcons = location.pathname === '/app/project/schedule'

	return (
		<UIContext.Provider value={{ showActionIcons }}>
			{children}
		</UIContext.Provider>
	)
}
