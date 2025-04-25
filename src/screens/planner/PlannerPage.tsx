import Header from './components/Header'
import PlanningItemsList from './components/PlanningItemsList'
import LeftSidebar from './components/LeftSidebar'
import SidebarToggle from './components/SidebarToggle'
import AddPlanningItemModal from './components/AddPlanningItemModal'
import { usePlannerContext } from './context/PlannerContext'
import { PlannerPermissionsProvider } from './context/PlannerPermissionsContext'
import { LoadingProvider } from './context/LoadingContext'
import RoleSelector from './components/RoleSelector'
import { useEffect, useRef } from 'react'
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'

function PlannerContent() {
	const {
		state,
		scrollToItem,
		setSearchTerm,
		dispatch,
		isLoading,
		refreshPlanningItems,
		hasError,
		debugFetchStatus
	} = usePlannerContext()

	// Use ref to track initial load
	const initialLoadRef = useRef(false)

	// Fetch planning items once when the component mounts
	useEffect(() => {
		if (!initialLoadRef.current) {
			console.log('PlannerContent initial load, fetching planning items')
			refreshPlanningItems()
			initialLoadRef.current = true
		}
	}, [refreshPlanningItems])

	// Sensors for dnd-kit
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)

	// Handler for drag end event
	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event
		console.log('DragEndEvent:', event) // Basic logging for now

		if (over && active.id !== over.id) {
			// Find the old and new index of the items using displayItems
			const oldIndex = state.displayItems.findIndex(
				(item) => item._id === active.id
			)
			const newIndex = state.displayItems.findIndex(
				(item) => item._id === over.id
			)

			if (oldIndex !== -1 && newIndex !== -1) {
				// Dispatch action to reorder items
				dispatch({ type: 'REORDER_ITEMS', payload: { oldIndex, newIndex } })
				// Note: We'll need to add this action type to the context reducer later.
			} else {
				console.error(
					'Could not find items for reordering:',
					active.id,
					over.id
				)
			}
		}
	}

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<div className="min-h-screen bg-gray-900 text-white relative">
				{/* Loading indicator */}
				{isLoading && (
					<div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500 animate-pulse z-50"></div>
				)}

				{/* Debug information panel - only show in development */}
				<div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-2 text-xs text-gray-300 z-40">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
						<div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
							<div>
								<span className="font-bold">Debug:</span> {debugFetchStatus}
							</div>
							<div>
								<span className="font-bold">Items:</span>{' '}
								{state.displayItems.length}
							</div>
						</div>
						<button
							onClick={() => refreshPlanningItems()}
							className="px-2 py-1 bg-blue-600 text-white-0 rounded hover:bg-blue-700 transition-colors"
							disabled={isLoading}
						>
							{isLoading ? 'Loading...' : 'Refresh Data'}
						</button>
					</div>
				</div>

				{/* Retry button if there was an error */}
				{hasError && (
					<div className="fixed top-4 right-4 z-50">
						<button
							onClick={() => refreshPlanningItems()}
							className="px-3 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 flex items-center transition-colors"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4 mr-1"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
									clipRule="evenodd"
								/>
							</svg>
							Retry
						</button>
					</div>
				)}

				{/* Sidebar toggle button - fixed position for better mobile UX */}
				<SidebarToggle />

				{/* Quick index sidebar - enhanced for better mobile experience */}
				<LeftSidebar
					planningItems={state.displayItems}
					activeItem={state.activeItem}
					scrollToItem={scrollToItem}
				/>

				<div
					className={`px-4 py-6 md:px-6 lg:px-8 transition-all duration-300 ${
						state.sidebarVisible ? 'ml-0 md:ml-64 lg:ml-72' : 'ml-0'
					}`}
				>
					<div className="max-w-6xl mx-auto">
						<Header
							searchTerm={state.searchTerm}
							setSearchTerm={setSearchTerm}
						/>

						{/* Role indicator - enhanced visibility */}
						<RoleSelector />

						{/* Planning items list */}
						<PlanningItemsList filteredItems={state.filteredItems} />
					</div>
				</div>

				{/* Modal for creating a new planning item */}
				<AddPlanningItemModal />
			</div>
		</DndContext>
	)
}

function PlannerPage() {
	return (
		<PlannerPermissionsProvider>
			<LoadingProvider>
				<PlannerContent />
			</LoadingProvider>
		</PlannerPermissionsProvider>
	)
}

export default PlannerPage
