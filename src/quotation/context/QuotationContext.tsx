import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { QuotationState, QuotationAction } from './contextInterfaces'
import { initialState } from './initialState'

type QuotationContextType = {
	state: QuotationState
	dispatch: React.Dispatch<QuotationAction>
}

const QuotationContext = createContext<QuotationContextType | undefined>(
	undefined
)

function quotationReducer(
	state: QuotationState,
	action: QuotationAction
): QuotationState {
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

		case 'SET_ACTIVE_SECTION':
			return {
				...state,
				previousSection: state.activeSection,
				activeSection: action.payload
			}

		case 'TOGGLE_SECTION':
			return {
				...state,
				expandedSections: {
					...state.expandedSections,
					[action.payload]: !state.expandedSections[action.payload]
				}
			}

		case 'MARK_SECTION_VISITED':
			return {
				...state,
				visitedSections: state.visitedSections.includes(action.payload)
					? state.visitedSections
					: [...state.visitedSections, action.payload]
			}

		case 'SET_SECTION_PROGRESS':
			return {
				...state,
				sectionProgress: {
					...state.sectionProgress,
					[action.payload.section]: action.payload.progress
				}
			}

		case 'SET_SELECTED_LOCATION':
			return {
				...state,
				selectedLocation: action.payload
			}

		case 'SET_VIEW_PREFERENCE':
			return {
				...state,
				preferredView: action.payload
			}

		case 'TOGGLE_IMAGES':
			return {
				...state,
				showImages:
					action.payload !== undefined ? action.payload : !state.showImages
			}

		case 'TOGGLE_ANIMATIONS':
			return {
				...state,
				animationsEnabled:
					action.payload !== undefined
						? action.payload
						: !state.animationsEnabled
			}

		default:
			return state
	}
}

export const QuotationProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [state, dispatch] = useReducer(quotationReducer, initialState)

	// Save certain preferences to localStorage
	useEffect(() => {
		localStorage.setItem(
			'quotation_preferences',
			JSON.stringify({
				preferredView: state.preferredView,
				showImages: state.showImages,
				animationsEnabled: state.animationsEnabled
			})
		)
	}, [state.preferredView, state.showImages, state.animationsEnabled])

	return (
		<QuotationContext.Provider value={{ state, dispatch }}>
			{children}
		</QuotationContext.Provider>
	)
}

export const useQuotation = (): QuotationContextType => {
	const context = useContext(QuotationContext)

	if (context === undefined) {
		throw new Error('useQuotation must be used within a QuotationProvider')
	}

	return context
}
