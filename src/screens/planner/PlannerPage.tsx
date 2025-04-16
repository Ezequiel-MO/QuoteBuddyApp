import usePlannerState from './hooks/usePlannerState'
import Header from './components/Header'
import PlanningItemsList from './components/PlanningItemsList'
import LeftSidebar from './components/LeftSidebar'
import SidebarToggle from './components/SidebarToggle'
import AddPlanningItemModal from './components/AddPlanningItemModal'
import { usePlannerContext } from './context/PlannerContext'

function PlannerPage() {
	const { state } = usePlannerContext()
	const {
		searchTerm,
		setSearchTerm,
		activeItem,

		displayItems,
		filteredItems,
		scrollToItem
	} = usePlannerState()

	return (
		<div className="min-h-screen bg-gray-900">
			{/* Sidebar toggle button */}
			<SidebarToggle />

			{/* Quick index sidebar */}
			<LeftSidebar
				planningItems={displayItems}
				activeItem={activeItem}
				scrollToItem={scrollToItem}
			/>

			<div
				className={`container mx-auto px-4 py-8 transition-all duration-300 ${
					state.sidebarVisible ? 'ml-64' : 'ml-0'
				}`}
			>
				<Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

				{/* Planning items list */}
				<PlanningItemsList filteredItems={filteredItems} />
			</div>

			{/* Modal for creating a new planning item */}
			<AddPlanningItemModal />
		</div>
	)
}

export default PlannerPage
