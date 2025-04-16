import usePlannerState from './hooks/usePlannerState'
import Header from './components/Header'
import PlanningItemsList from './components/PlanningItemsList'
import LeftSidebar from './components/LeftSidebar'
import QuickNav from './components/QuickNav'
import SidebarToggle from './components/SidebarToggle'
import AddPlanningItemModal from './components/AddPlanningItemModal'

function PlannerPage() {
	const {
		searchTerm,
		setSearchTerm,
		activeItem,
		sidebarVisible,
		modalOpen,
		displayItems,
		filteredItems,
		scrollToItem,
		toggleSidebar,
		toggleModal,
		handleCreatePlanningItem
	} = usePlannerState()

	return (
		<div className="min-h-screen bg-gray-900">
			{/* Sidebar toggle button */}
			<SidebarToggle
				sidebarVisible={sidebarVisible}
				toggleSidebar={toggleSidebar}
			/>

			{/* Quick index sidebar */}
			<LeftSidebar
				planningItems={displayItems}
				activeItem={activeItem}
				sidebarVisible={sidebarVisible}
				scrollToItem={scrollToItem}
			/>

			<div
				className={`container mx-auto px-4 py-8 transition-all duration-300 ${
					sidebarVisible ? 'ml-64' : 'ml-0'
				}`}
			>
				<Header
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					toggleModal={toggleModal}
				/>

				{/* Planning items list */}
				<PlanningItemsList filteredItems={filteredItems} />
			</div>

			{/* Quick navigation sidebar */}
			<QuickNav
				filteredItems={filteredItems}
				sidebarVisible={sidebarVisible}
				toggleSidebar={toggleSidebar}
				scrollToItem={scrollToItem}
			/>

			{/* Modal for creating a new planning item */}
			<AddPlanningItemModal
				modalOpen={modalOpen}
				toggleModal={toggleModal}
				handleCreatePlanningItem={handleCreatePlanningItem}
			/>
		</div>
	)
}

export default PlannerPage
