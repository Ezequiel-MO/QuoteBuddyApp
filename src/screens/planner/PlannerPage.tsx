import Header from './components/Header'
import PlanningItemsList from './components/PlanningItemsList'
import LeftSidebar from './components/LeftSidebar'
import SidebarToggle from './components/SidebarToggle'
import AddPlanningItemModal from './components/AddPlanningItemModal'
import { usePlannerContext } from './context/PlannerContext'
import { PlannerPermissionsProvider } from './context/PlannerPermissionsContext'
import RoleSelector from './components/RoleSelector'
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
	const { state, scrollToItem, setSearchTerm, dispatch } = usePlannerContext()

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
			<div className="min-h-screen bg-gray-900">
				{/* Sidebar toggle button */}
				<SidebarToggle />

				{/* Quick index sidebar */}
				<LeftSidebar
					planningItems={state.displayItems}
					activeItem={state.activeItem}
					scrollToItem={scrollToItem}
				/>

				<div
					className={`container mx-auto px-4 py-8 transition-all duration-300 ${
						state.sidebarVisible ? 'ml-64' : 'ml-0'
					}`}
				>
					<Header searchTerm={state.searchTerm} setSearchTerm={setSearchTerm} />

					{/* Role indicator - shows automatically determined role */}
					<RoleSelector />

					{/* Planning items list */}
					<PlanningItemsList filteredItems={state.filteredItems} />
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
			<PlannerContent />
		</PlannerPermissionsProvider>
	)
}

export default PlannerPage
