import Header from './components/Header'
import PlanningItemsList from './components/PlanningItemsList'
import LeftSidebar from './components/LeftSidebar'
import SidebarToggle from './components/SidebarToggle'
import AddPlanningItemModal from './components/AddPlanningItemModal'
import { usePlannerContext } from './context/PlannerContext'

function PlannerPage() {
	const { state, scrollToItem, setSearchTerm } = usePlannerContext()

	return (
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

				{/* Planning items list */}
				<PlanningItemsList filteredItems={state.filteredItems} />
			</div>

			{/* Modal for creating a new planning item */}
			<AddPlanningItemModal />
		</div>
	)
}

export default PlannerPage
