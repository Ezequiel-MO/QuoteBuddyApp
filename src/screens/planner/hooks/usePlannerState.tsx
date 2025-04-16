import { useState, useCallback } from 'react'
import { useCurrentPlanner } from '@hooks/redux/useCurrentPlanner'
import { DisplayPlanningItem } from '../types'
import { mockPlanningItems } from '../constants/mockPlanningItems'

export const usePlannerState = () => {
	// Get planner data from Redux
	const { planningItems, addPlanningItem } = useCurrentPlanner()

	// UI state
	const [searchTerm, setSearchTerm] = useState('')
	const [activeItem, setActiveItem] = useState<number | string | null>(null)
	const [sidebarVisible, setSidebarVisible] = useState(false)
	const [modalOpen, setModalOpen] = useState(false)

	// For development purposes, use mock data if no real data is available
	const displayItems: DisplayPlanningItem[] =
		planningItems.length > 0
			? planningItems.map((item) => ({
					// Map IPlanningItem to DisplayPlanningItem
					_id: (item as any)._id,
					id: (item as any).id,
					title: item.title,
					projectId: item.projectId,
					dayIndex: item.dayIndex,
					itemType: item.itemType,
					status: item.status,
					selectedOptionId: item.selectedOptionId,
					originalScheduleItemId: item.originalScheduleItemId
			  }))
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

	// Toggle sidebar visibility
	const toggleSidebar = useCallback(() => {
		setSidebarVisible((prev) => !prev)
	}, [])

	// Toggle modal
	const toggleModal = useCallback(() => {
		setModalOpen((prev) => !prev)
	}, [])

	// Handle new planning item creation
	const handleCreatePlanningItem = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault()
			// Extract form data
			const formData = new FormData(e.currentTarget)
			const title = formData.get('title') as string
			const itemType = formData.get('itemType') as string
			const dayIndex = parseInt(formData.get('dayIndex') as string, 10)
			const status = formData.get('status') as string
			const description = formData.get('description') as string

			if (addPlanningItem) {
				addPlanningItem({
					projectId: 'current-project-id', // This would come from project context
					dayIndex,
					itemType,
					status: status || 'Proposed',
					title,
					description
				} as any)
				toggleModal()
			}
		},
		[addPlanningItem, toggleModal]
	)

	return {
		searchTerm,
		setSearchTerm,
		activeItem,
		setActiveItem,
		sidebarVisible,
		setSidebarVisible,
		modalOpen,
		setModalOpen,
		displayItems,
		filteredItems,
		scrollToItem,
		toggleSidebar,
		toggleModal,
		handleCreatePlanningItem
	}
}

export default usePlannerState
