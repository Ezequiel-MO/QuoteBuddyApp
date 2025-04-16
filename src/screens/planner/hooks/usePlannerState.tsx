import { useState, useCallback, useEffect } from 'react'
import { useCurrentPlanner } from '@hooks/redux/useCurrentPlanner'
import { DisplayPlanningItem } from '../types'
import { mockPlanningItems } from '../constants/mockPlanningItems'
import { IPlanningItem } from '@interfaces/planner/planningItem'

export const usePlannerState = () => {
	// Get planner data from Redux
	const { planningItems, setPlanningItems } = useCurrentPlanner()

	// UI state
	const [searchTerm, setSearchTerm] = useState('')
	const [activeItem, setActiveItem] = useState<number | string | null>(null)

	// Load mock data into Redux on component initialization
	useEffect(() => {
		if (planningItems.length === 0 && setPlanningItems) {
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
		}
	}, [planningItems.length, setPlanningItems])

	// For development purposes, use mock data if no real data is available
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

	// Filter planning items based on search term
	const filteredItems = displayItems.filter((item) => {
		// Always search the title
		const titleMatch = item.title
			.toLowerCase()
			.includes(searchTerm.toLowerCase())
		if (titleMatch) return true

		// Search description if it exists
		const descriptionMatch = item.description
			? item.description.toLowerCase().includes(searchTerm.toLowerCase())
			: false
		if (descriptionMatch) return true

		// Search in options if they exist
		if (item.options) {
			return item.options.some((option) => {
				// Search option title
				const optionTitleMatch = option.title
					.toLowerCase()
					.includes(searchTerm.toLowerCase())
				if (optionTitleMatch) return true

				// Search option description
				const optionDescMatch = option.description
					? option.description.toLowerCase().includes(searchTerm.toLowerCase())
					: false
				if (optionDescMatch) return true

				// Search in comments if they exist
				if (option.comments) {
					return option.comments.some((comment) =>
						comment.text.toLowerCase().includes(searchTerm.toLowerCase())
					)
				}
				return false
			})
		}
		return false
	})

	// Scroll to item when clicking on quick nav
	const scrollToItem = useCallback((itemId: number | string) => {
		setActiveItem(itemId)
		const element = document.getElementById(`planning-item-${itemId}`)
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
	}, [])

	return {
		searchTerm,
		setSearchTerm,
		activeItem,
		setActiveItem,
		displayItems,
		filteredItems,
		scrollToItem
	}
}

export default usePlannerState
