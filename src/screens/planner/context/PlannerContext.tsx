import {
	Dispatch,
	createContext,
	useContext,
	useReducer,
	useEffect,
	useCallback,
	useState
} from 'react'
import * as typescript from './contextinterfaces'
import initialState from './initialState'
import { useCurrentPlanner } from '@hooks/redux/useCurrentPlanner'
import { IPlanningItem } from '@interfaces/planner/planningItem'
import { arrayMove } from '@dnd-kit/sortable'
import { useCurrentProject } from '@hooks/redux/useCurrentProject'
import { toast } from 'react-toastify'
import { getPlanningItemsWithDetails } from '@services/plannerService'

// Add TOGGLE_ITEM_EXPANDED action to the PlannerAction type
export type PlannerAction =
	| { type: 'TOGGLE_SIDEBAR'; payload: boolean }
	| { type: 'TOGGLE_MODAL'; payload: boolean }
	| { type: 'SET_SEARCH_TERM'; payload: string }
	| { type: 'SET_ACTIVE_ITEM'; payload: number | string | null }
	| { type: 'SET_DISPLAY_ITEMS'; payload: IPlanningItem[] }
	| { type: 'SET_FILTERED_ITEMS'; payload: IPlanningItem[] }
	| { type: 'ADD_PLANNING_ITEM'; payload: IPlanningItem }
	| { type: 'REMOVE_PLANNING_ITEM'; payload: string }
	| { type: 'CLEAR_PLANNING_ITEMS' }
	| { type: 'TOGGLE_ITEM_EXPANDED'; payload: string }
	| { type: 'EXPAND_ALL_ITEMS' }
	| { type: 'COLLAPSE_ALL_ITEMS' }
	| { type: 'REORDER_ITEMS'; payload: { oldIndex: number; newIndex: number } }

interface PlannerContextType {
	state: typescript.PlannerState
	dispatch: Dispatch<PlannerAction>
	scrollToItem: (itemId: number | string) => void
	removePlanningItem: (itemId: string) => void
	clearPlanningItems: () => void
	setSearchTerm: (term: string) => void
	setActiveItem: (itemId: number | string | null) => void
	toggleItemExpanded: (itemId: string) => void
	expandAllItems: () => void
	collapseAllItems: () => void
	isLoading: boolean
	refreshPlanningItems: () => void
	hasError: boolean
	debugFetchStatus: string
}

const PlannerContext = createContext<PlannerContextType | undefined>(undefined)

const plannerReducer = (
	state: typescript.PlannerState,
	action: PlannerAction
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
		case 'TOGGLE_ITEM_EXPANDED': {
			const newExpandedIds = new Set(state.expandedItemIds)
			if (newExpandedIds.has(action.payload)) {
				newExpandedIds.delete(action.payload)
			} else {
				newExpandedIds.add(action.payload)
			}
			return {
				...state,
				expandedItemIds: newExpandedIds
			}
		}
		case 'EXPAND_ALL_ITEMS': {
			const allIds = new Set<string>()
			// Add all valid item IDs to the set
			state.displayItems.forEach((item) => {
				if (item._id) allIds.add(item._id)
			})
			return {
				...state,
				expandedItemIds: allIds
			}
		}
		case 'COLLAPSE_ALL_ITEMS': {
			return {
				...state,
				expandedItemIds: new Set<string>()
			}
		}
		case 'REORDER_ITEMS': {
			const { oldIndex, newIndex } = action.payload
			// Reorder the displayItems array
			const reorderedDisplayItems = arrayMove(
				state.displayItems,
				oldIndex,
				newIndex
			)
			// Note: We might need to persist this order change back to Redux/backend later.
			// For now, just update the local display state.
			return {
				...state,
				displayItems: reorderedDisplayItems
				// filteredItems will be updated automatically by the useEffect hook
			}
		}
		default:
			return state
	}
}

export const PlannerProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [state, dispatch] = useReducer(plannerReducer, initialState)
	const { planningItems, setPlanningItems, deletePlanningItem } =
		useCurrentPlanner()

	// Get current project
	const { currentProject } = useCurrentProject()
	const projectId = currentProject?._id

	// Loading and error states
	const [isLoading, setIsLoading] = useState(false)
	const [hasError, setHasError] = useState(false)
	const [isRefreshing, setIsRefreshing] = useState(false) // Track if a refresh is in progress
	const [debugFetchStatus, setDebugFetchStatus] = useState('Not started')

	// Update displayItems whenever planningItems change - directly use the Redux data
	useEffect(() => {
		console.log(
			'PlannerContext: planningItems changed, updating displayItems',
			planningItems.length
		)

		// Simply use the data directly from Redux without transformation
		dispatch({ type: 'SET_DISPLAY_ITEMS', payload: planningItems })
	}, [planningItems])

	// Debugging function to check auth token
	const checkAuthToken = useCallback(() => {
		const token = localStorage.getItem('token')
		if (!token) {
			console.error('No auth token found in localStorage')
			return false
		}

		// Check if token is expired (simple check - not comprehensive)
		try {
			const payload = JSON.parse(atob(token.split('.')[1]))
			const expiry = payload.exp * 1000 // Convert to milliseconds
			const now = Date.now()

			if (expiry < now) {
				console.error('Auth token is expired:', new Date(expiry).toISOString())
				return false
			}

			console.log(
				'Auth token looks valid until:',
				new Date(expiry).toISOString()
			)
			return true
		} catch (error) {
			console.error('Error parsing token:', error)
			return false
		}
	}, [])

	// Function to fetch planning items
	const refreshPlanningItems = useCallback(async () => {
		// Prevent multiple concurrent calls
		if (isRefreshing) {
			console.log('Already refreshing planning items, skipping this call')
			return
		}

		if (!projectId) {
			console.error('Cannot fetch planning items: No active project')
			// Only show toast once, not repeatedly
			if (!hasError) {
				toast.error('Cannot fetch planning items: No active project')
				setHasError(true)
			}
			return
		}

		console.log('Fetching planning items with details for project:', projectId)
		setIsLoading(true)
		setIsRefreshing(true)
		setDebugFetchStatus('Starting fetch with details...')

		try {
			// Skip debug API call and go straight to the detailed fetch
			setDebugFetchStatus(
				'Using getPlanningItemsWithDetails for comprehensive data'
			)

			// Use the new service function that gets all details
			const itemsWithDetails = await getPlanningItemsWithDetails(projectId)
			setDebugFetchStatus(
				`Fetched ${itemsWithDetails.length} items with details`
			)

			// Log some info about the nested data structure
			let optionsCount = 0
			let documentsCount = 0
			let commentsCount = 0
			let optionsWithComments = 0

			itemsWithDetails.forEach((item) => {
				// Count options
				if (item.options && Array.isArray(item.options)) {
					optionsCount += item.options.length

					// Count documents and comments on options
					item.options.forEach((option) => {
						if (option.documents && Array.isArray(option.documents)) {
							documentsCount += option.documents.length
						}

						if (option.comments && Array.isArray(option.comments)) {
							commentsCount += option.comments.length
							if (option.comments.length > 0) {
								optionsWithComments++
							}
						}
					})
				}

				// Count documents directly on items
				if (item.documents && Array.isArray(item.documents)) {
					documentsCount += item.documents.length
				}

				// We should not check for comments directly on items as they don't exist at this level
				// Instead, we've already counted all comments through the options above
			})

			// Update debug status with detailed counts
			setDebugFetchStatus(
				`Fetched ${itemsWithDetails.length} items, ${optionsCount} options, ` +
					`${documentsCount} docs, ${commentsCount} comments (${optionsWithComments} options have comments)`
			)

			// Update Redux state
			if (setPlanningItems) {
				setPlanningItems(itemsWithDetails)
				console.log(
					'Updated Redux state with detailed items:',
					itemsWithDetails
				)
			}

			// Reset error state on success
			if (hasError) {
				setHasError(false)
			}
		} catch (error: any) {
			console.error('Error fetching planning items:', error)
			setDebugFetchStatus(`Error in fetch: ${error.message || 'Unknown error'}`)

			// Only show toast once, not repeatedly
			if (!hasError) {
				toast.error('Failed to load planning items. Please try again.')
				setHasError(true)
			}
		} finally {
			setIsLoading(false)
			setIsRefreshing(false)
		}
	}, [projectId, setPlanningItems, hasError, isRefreshing])

	// Filter items when display items or search term changes
	useEffect(() => {
		const filteredItems = state.displayItems.filter((item) => {
			// If no search term, return all items
			if (!state.searchTerm) return true

			const searchLower = state.searchTerm.toLowerCase().trim()

			// Always search the title
			const titleMatch =
				item.title?.toLowerCase().includes(searchLower) || false
			if (titleMatch) return true

			// Search description if it exists
			const descriptionMatch = item.description
				? item.description.toLowerCase().includes(searchLower)
				: false
			if (descriptionMatch) return true

			// Search item's day index
			const dayIndexMatch =
				item.dayIndex?.toString().includes(searchLower) || false
			if (dayIndexMatch) return true

			// Search item's status
			const statusMatch =
				item.status?.toLowerCase().includes(searchLower) || false
			if (statusMatch) return true

			// Search in options if they exist
			if (item.options) {
				return item.options.some((option) => {
					// Search option title
					const optionTitleMatch =
						(option as any).title?.toLowerCase().includes(searchLower) || false
					if (optionTitleMatch) return true

					// Search vendor type
					const vendorTypeMatch =
						option.vendorType?.toString().toLowerCase().includes(searchLower) ||
						false
					if (vendorTypeMatch) return true

					// Search planning notes
					const planningNotesMatch =
						option.planningNotes
							?.toString()
							.toLowerCase()
							.includes(searchLower) || false
					if (planningNotesMatch) return true

					// Search price
					const priceMatch =
						(option as any).price?.toString().includes(searchLower) || false
					if (priceMatch) return true

					// Search option status
					const optionStatusMatch =
						(option as any).status?.toLowerCase().includes(searchLower) || false
					if (optionStatusMatch) return true

					// Search in comments if they exist
					if (option.comments) {
						return option.comments.some(
							(comment) =>
								// Search comment content
								comment.content?.toLowerCase().includes(searchLower) ||
								// Search comment author
								comment.authorName?.toLowerCase().includes(searchLower) ||
								false
						)
					}

					// Search in documents if they exist on the option
					if (option.documents) {
						return option.documents.some(
							(doc) =>
								doc.fileName?.toLowerCase().includes(searchLower) || false
						)
					}

					return false
				})
			}

			// Search in item-level comments if they exist
			if ((item as any).comments) {
				const commentMatch = (item as any).comments.some(
					(comment: any) =>
						comment.content?.toLowerCase().includes(searchLower) ||
						comment.authorName?.toLowerCase().includes(searchLower) ||
						false
				)
				if (commentMatch) return true
			}

			// Search in item-level documents if they exist
			if (item.documents) {
				const documentMatch = item.documents.some(
					(doc) => doc.fileName?.toLowerCase().includes(searchLower) || false
				)
				if (documentMatch) return true
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

	// Add this function
	const toggleItemExpanded = useCallback((itemId: string) => {
		dispatch({ type: 'TOGGLE_ITEM_EXPANDED', payload: itemId })
	}, [])

	// Add these functions
	const expandAllItems = useCallback(() => {
		dispatch({ type: 'EXPAND_ALL_ITEMS' })
	}, [])

	const collapseAllItems = useCallback(() => {
		dispatch({ type: 'COLLAPSE_ALL_ITEMS' })
	}, [])

	// Update context value
	const contextValue: PlannerContextType = {
		state,
		dispatch,
		scrollToItem,
		removePlanningItem: handleRemovePlanningItem,
		clearPlanningItems: handleClearPlanningItems,
		setSearchTerm,
		setActiveItem,
		toggleItemExpanded,
		expandAllItems,
		collapseAllItems,
		isLoading,
		refreshPlanningItems,
		hasError,
		debugFetchStatus
	}

	return (
		<PlannerContext.Provider value={contextValue}>
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
