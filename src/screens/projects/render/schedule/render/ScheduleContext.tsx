import React, { createContext, useContext, useState } from 'react'

type Tab =
	| 'Intro Text/Gifts'
	| 'Transfers IN'
	| 'Hotels'
	| 'Meetings'
	| 'Schedule'
	| 'Transfers OUT'
	| 'Itinerary'
	| 'Preview'

interface ScheduleContextProps {
	selectedTab: Tab
	setSelectedTab: React.Dispatch<React.SetStateAction<Tab>>
}

const ScheduleContext = createContext<ScheduleContextProps | undefined>(
	undefined
)

export const useScheduleContext = () => {
	const context = useContext(ScheduleContext)
	if (!context) {
		throw new Error('useScheduleContext must be used within a ScheduleProvider')
	}
	return context
}

export const ScheduleProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [selectedTab, setSelectedTab] = useState<Tab>(
		(localStorage.getItem('activeProjectTab') as Tab) || 'Intro Text/Gifts'
	)
	return (
		<ScheduleContext.Provider value={{ selectedTab, setSelectedTab }}>
			{children}
		</ScheduleContext.Provider>
	)
}
