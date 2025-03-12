// src/screens/quotation/context/QuotationContext.tsx
import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { useCurrentProject } from 'src/hooks'
import { processScheduleData } from '../utils/eventProcessors'
import * as typescript from './contextinterfaces'
import { initialState } from './initialState'

// Create the context
const QuotationContext = createContext<
	typescript.QuotationContextProps | undefined
>(undefined)

// Reducer function
function quotationReducer(
	state: typescript.QuotationState,
	action: typescript.QuotationAction
): typescript.QuotationState {
	switch (action.type) {
		case 'TOGGLE_SIDEBAR':
			return {
				...state,
				isSidebarOpen:
					action.payload !== undefined ? action.payload : !state.isSidebarOpen
			}

		case 'TOGGLE_OVERVIEW':
			return {
				...state,
				isOverviewExpanded:
					action.payload !== undefined
						? action.payload
						: !state.isOverviewExpanded
			}

		case 'TOGGLE_SECTION':
			return {
				...state,
				expandedSections: {
					...state.expandedSections,
					[action.payload]: !state.expandedSections[action.payload]
				}
			}

		case 'TOGGLE_DAY':
			return {
				...state,
				expandedDays: {
					...state.expandedDays,
					[action.payload]: !state.expandedDays[action.payload]
				}
			}

		case 'SET_ACTIVE_SECTION':
			return {
				...state,
				activeSection: action.payload
			}

		case 'SET_ACTIVE_DAY':
			return {
				...state,
				activeDay: action.payload
			}

		case 'REGISTER_SECTION_REF':
			return {
				...state,
				sectionRefs: {
					...state.sectionRefs,
					[action.payload.id]: action.payload.ref
				}
			}

		case 'PROCESS_SCHEDULE_DATA':
			return {
				...state,
				scheduleDays: action.payload.scheduleDays,
				daysWithDates: action.payload.daysWithDates
			}

		case 'INITIALIZE_EXPANDED_DAYS':
			return {
				...state,
				expandedDays: action.payload
			}

		default:
			return state
	}
}

// Provider component
export const QuotationProvider: React.FC<typescript.QuotationProviderProps> = ({
	children
}) => {
	const [state, dispatch] = useReducer(quotationReducer, initialState)
	const { currentProject } = useCurrentProject()

	// Process schedule data when currentProject changes
	useEffect(() => {
		if (currentProject?.schedule) {
			const { scheduleDays, daysWithDates } = processScheduleData(
				currentProject.schedule,
				currentProject.arrivalDay,
				currentProject.departureDay,
				currentProject.hideDates
			)

			dispatch({
				type: 'PROCESS_SCHEDULE_DATA',
				payload: { scheduleDays, daysWithDates }
			})

			// Initialize expanded days (all days expanded by default)
			const expandedDays: typescript.ExpandedDays = {}
			scheduleDays.forEach((day, index) => {
				expandedDays[index] = true
			})

			dispatch({
				type: 'INITIALIZE_EXPANDED_DAYS',
				payload: expandedDays
			})
		}
	}, [currentProject])

	// Action creators
	const toggleSidebar = (value?: boolean) => {
		dispatch({ type: 'TOGGLE_SIDEBAR', payload: value })
	}

	const toggleOverview = (value?: boolean) => {
		dispatch({ type: 'TOGGLE_OVERVIEW', payload: value })
	}

	const toggleSection = (section: keyof typescript.ExpandedSections) => {
		dispatch({ type: 'TOGGLE_SECTION', payload: section })
	}

	const toggleDay = (dayIndex: number) => {
		dispatch({ type: 'TOGGLE_DAY', payload: dayIndex })
	}

	const setActiveSection = (id: string) => {
		dispatch({ type: 'SET_ACTIVE_SECTION', payload: id })
	}

	// Navigation functions
	const scrollToSection = (sectionId: string) => {
		const sectionRef = state.sectionRefs[sectionId]
		if (sectionRef) {
			sectionRef.scrollIntoView({ behavior: 'smooth', block: 'start' })
			setActiveSection(sectionId)
		}
	}

	const scrollToDay = (
		dayIndex: number,
		timeOfDay: 'morning' | 'lunch' | 'afternoon' | 'dinner'
	) => {
		const sectionId = `day-${dayIndex}-${timeOfDay}`
		const sectionRef = state.sectionRefs[sectionId]

		if (sectionRef) {
			sectionRef.scrollIntoView({ behavior: 'smooth', block: 'start' })
			dispatch({
				type: 'SET_ACTIVE_DAY',
				payload: { dayIndex, timeOfDay }
			})
		} else {
			// If specific day section not found, scroll to schedule section
			scrollToSection('schedule')
		}
	}

	// Register a section ref
	const registerSectionRef = (id: string, ref: HTMLElement | null) => {
		dispatch({
			type: 'REGISTER_SECTION_REF',
			payload: { id, ref }
		})
	}

	// Create context value
	const contextValue: typescript.QuotationContextProps = {
		...state,
		currentProject,
		toggleSidebar,
		toggleOverview,
		toggleSection,
		toggleDay,
		setActiveSection,
		scrollToSection,
		scrollToDay,
		registerSectionRef
	}

	return (
		<QuotationContext.Provider value={contextValue}>
			{children}
		</QuotationContext.Provider>
	)
}

// Custom hook for accessing the context
export const useQuotation = (): typescript.QuotationContextProps => {
	const context = useContext(QuotationContext)

	if (context === undefined) {
		throw new Error('useQuotation must be used within a QuotationProvider')
	}

	return context
}
