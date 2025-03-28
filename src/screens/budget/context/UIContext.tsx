// src/screens/budget/context/UIContext.tsx
import React, { createContext, useContext, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

interface UIContextType {
	showActionIcons: boolean
	isEditable: boolean
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

	// Check if we're in the client route
	const isClientRoute = location.pathname.includes('/client')

	// Check if we're in the project schedule route
	const isProjectScheduleRoute = location.pathname === '/app/project/schedule'

	// Determine UI states based on location
	// Only show action icons on project/schedule route and NOT on client route
	const showActionIcons = isProjectScheduleRoute && !isClientRoute

	// Allow editing only on project/schedule route
	const isEditable = isProjectScheduleRoute && !isClientRoute

	return (
		<UIContext.Provider value={{ showActionIcons, isEditable }}>
			{children}
		</UIContext.Provider>
	)
}
