import {
	Dispatch,
	createContext,
	useContext,
	useReducer,
	useEffect,
	useCallback,
	useRef,
	ReactNode
} from 'react'
import * as typescript from './contextinterfaces'
import initialState from './initialState'
import { useCurrentPlanner } from '@hooks/redux/useCurrentPlanner'
import { mockPlanningItems } from '../constants/mockPlanningItems'
import { DisplayPlanningItem } from '../types'
import { IPlanningItem } from '@interfaces/planner/planningItem'

interface PlannerContextType {
	state: typescript.PlannerState
	dispatch: Dispatch<typescript.PlannerAction>
	scrollToItem: (itemId: number | string) => void
	removePlanningItem: (itemId: string) => void
	clearPlanningItems: () => void
	setSearchTerm: (term: string) => void
	setActiveItem: (itemId: number | string | null) => void
}

const PlannerContext = createContext<PlannerContextType | undefined>(undefined)

const plannerReducer = (
	state: typescript.PlannerState,
	action: typescript.PlannerAction
): typescript.PlannerState => {
	switch (action.type) {
		case 'TOGGLE_SIDEBAR':
			return { ...state, sidebarVisible: action.payload }
		case 'TOGGLE_MODAL':
			return { ...state, modalOpen: action.payload }
		case 'SET_SEARCH_TERM':
			return { ...state, searchTerm: action.payload }
		case 'SET_ACTIVE_ITEM':
			return { ...state, activeItem: action.payload }
		case 'SET_DISPLAY_ITEMS':
			return { ...state, displayItems: action.payload }
		case 'SET_FILTERED_ITEMS':
			return { ...state, filteredItems: action.payload }
		case 'REMOVE_PLANNING_ITEM': {
			const itemId = action.payload
			// Filter out the item to remove
			const updatedDisplayItems = state.displayItems.filter(
				(item) => item._id !== itemId
			)
			return {
				...state,
				displayItems: updatedDisplayItems,
				// Also update filtered items
				filteredItems: state.filteredItems.filter((item) => item._id !== itemId)
			}
		}
		case 'CLEAR_PLANNING_ITEMS':
			return {
				...state,
				displayItems: [],
				filteredItems: []
			}
		default:
			return state
	}
}

export const PlannerProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [state, dispatch] = useReducer(plannerReducer, initialState)
	const {
		planningItems,
		setPlanningItems,
		addPlanningItem,
		deletePlanningItem
	} = useCurrentPlanner()
	const hasInitialized = useRef(false)

	// Load mock data into Redux on component initialization (only once)
	useEffect(() => {
		if (
			!hasInitialized.current &&
			planningItems.length === 0 &&
			setPlanningItems
		) {
			// Convert mock data to IPlanningItem format expected by the reducer
			const formattedItems = mockPlanningItems.map((item) => ({
				_id: item._id,
				title: item.title,
				projectId: item.projectId,
				dayIndex: item.dayIndex,
				itemType: item.itemType,
				status: item.status,
				selectedOptionId: item.selectedOptionId || '',
				originalScheduleItemId: item.originalScheduleItemId || ''
			})) as IPlanningItem[]

			setPlanningItems(formattedItems)
			hasInitialized.current = true
		}
	}, [planningItems.length, setPlanningItems])

	// Update displayItems whenever planningItems change
	useEffect(() => {
		console.log(
			'PlannerContext: planningItems changed, updating displayItems',
			planningItems.length
		)

		const displayItems: DisplayPlanningItem[] =
			planningItems.length > 0
				? planningItems.map((item) => {
						// Find matching mock item to get additional display data
						const mockItem = mockPlanningItems.find(
							(mock) => mock._id === item._id
						)
						return {
							// Map IPlanningItem to DisplayPlanningItem
							_id: item._id,
							title: item.title,
							projectId: item.projectId,
							dayIndex: item.dayIndex,
							itemType: item.itemType,
							status: item.status,
							selectedOptionId: item.selectedOptionId,
							originalScheduleItemId: item.originalScheduleItemId,
							// Add display-specific data from mock items if available
							description: mockItem?.description || '',
							createdBy: mockItem?.createdBy || '',
							date: mockItem?.date || '',
							documents: mockItem?.documents || [],
							options: mockItem?.options || []
						}
				  })
				: mockPlanningItems

		console.log('PlannerContext: setting displayItems', displayItems.length)
		dispatch({ type: 'SET_DISPLAY_ITEMS', payload: displayItems })
	}, [planningItems])

	// Filter items when display items or search term changes
	useEffect(() => {
		const filteredItems = state.displayItems.filter((item) => {
			// If no search term, return all items
			if (!state.searchTerm) return true

			// Always search the title
			const titleMatch = item.title
				.toLowerCase()
				.includes(state.searchTerm.toLowerCase())
			if (titleMatch) return true

			// Search description if it exists
			const descriptionMatch = item.description
				? item.description
						.toLowerCase()
						.includes(state.searchTerm.toLowerCase())
				: false
			if (descriptionMatch) return true

			// Search in options if they exist
			if (item.options) {
				return item.options.some((option) => {
					// Search option title
					const optionTitleMatch = option.title
						.toLowerCase()
						.includes(state.searchTerm.toLowerCase())
					if (optionTitleMatch) return true

					// Search option description
					const optionDescMatch = option.description
						? option.description
								.toLowerCase()
								.includes(state.searchTerm.toLowerCase())
						: false
					if (optionDescMatch) return true

					// Search in comments if they exist
					if (option.comments) {
						return option.comments.some((comment) =>
							comment.text
								.toLowerCase()
								.includes(state.searchTerm.toLowerCase())
						)
					}
					return false
				})
			}
			return false
		})

		dispatch({ type: 'SET_FILTERED_ITEMS', payload: filteredItems })
	}, [state.displayItems, state.searchTerm])

	// Scroll to item when clicking on quick nav
	const scrollToItem = useCallback((itemId: number | string) => {
		dispatch({ type: 'SET_ACTIVE_ITEM', payload: itemId })
		const element = document.getElementById(`planning-item-${itemId}`)
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
	}, [])

	// Function to remove a planning item
	const handleRemovePlanningItem = useCallback(
		(itemId: string) => {
			try {
				console.log('Context: removing planning item with ID:', itemId)

				// First remove from Redux if available
				if (deletePlanningItem) {
					console.log('Context: calling deletePlanningItem from Redux')
					deletePlanningItem(itemId)
				} else {
					console.warn('Context: deletePlanningItem not available from Redux')
				}

				// Also manually filter out the item from local state to ensure UI updates
				const updatedDisplayItems = state.displayItems.filter(
					(item) => item._id !== itemId
				)

				// Update both display items and filtered items
				dispatch({ type: 'SET_DISPLAY_ITEMS', payload: updatedDisplayItems })
				dispatch({
					type: 'SET_FILTERED_ITEMS',
					payload: state.filteredItems.filter((item) => item._id !== itemId)
				})

				console.log('Context: removed item from local state')
			} catch (error) {
				console.error('Error removing planning item:', error)
			}
		},
		[deletePlanningItem, state.displayItems, state.filteredItems]
	)

	// Function to clear all planning items
	const handleClearPlanningItems = useCallback(() => {
		// Clear from Redux if we have the method
		if (setPlanningItems) {
			setPlanningItems([])
		}
		// Clear from local state
		dispatch({ type: 'CLEAR_PLANNING_ITEMS' })
	}, [setPlanningItems])

	// Function to set search term
	const setSearchTerm = useCallback((term: string) => {
		dispatch({ type: 'SET_SEARCH_TERM', payload: term })
	}, [])

	// Function to set active item
	const setActiveItem = useCallback((itemId: number | string | null) => {
		dispatch({ type: 'SET_ACTIVE_ITEM', payload: itemId })
	}, [])

	return (
		<PlannerContext.Provider
			value={{
				state,
				dispatch,
				scrollToItem,
				removePlanningItem: handleRemovePlanningItem,
				clearPlanningItems: handleClearPlanningItems,
				setSearchTerm,
				setActiveItem
			}}
		>
			{children}
		</PlannerContext.Provider>
	)
}

export const usePlannerContext = () => {
	const context = useContext(PlannerContext)
	if (context === undefined) {
		throw new Error('usePlannerContext must be used within a PlannerProvider')
	}
	return context
}
