import React from 'react'
import { Icon } from '@iconify/react'
import SearchBar from './SearchBar'
import { usePlannerContext } from '../context/PlannerContext'
import {
	useCanAddPlanningItem,
	usePlannerPermissions
} from '../context/PlannerPermissionsContext'

interface HeaderProps {
	searchTerm: string
	setSearchTerm: (term: string) => void
}

const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm }) => {
	const { dispatch, expandAllItems, collapseAllItems, state } =
		usePlannerContext()
	const canAddPlanningItem = useCanAddPlanningItem()
	const { userRole } = usePlannerPermissions()

	const hasItems = state.displayItems.length > 0

	const toggleModal = () => {
		dispatch({ type: 'TOGGLE_MODAL', payload: true })
	}

	return (
		<div className="space-y-4 mb-6">
			{/* Title and role badge - stacks on mobile, side by side on larger screens */}
			<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
				<div className="flex items-center gap-3 flex-wrap">
					<h1 className="text-2xl sm:text-3xl font-bold text-white-0">
						Project Planning
					</h1>
					<span
						className="px-3 py-1.5 text-xs font-semibold rounded-full shadow-sm text-white-0"
						style={{
							backgroundColor: userRole === 'AM' ? '#0f766e' : '#ea5933'
						}}
					>
						{userRole} View
					</span>
				</div>

				{/* Only show Add button if user has permission */}
				{canAddPlanningItem && (
					<button
						className="flex items-center justify-center px-4 py-2 bg-[#ea5933] text-white-0 rounded-lg shadow hover:bg-opacity-90 transition-colors w-full sm:w-auto"
						onClick={toggleModal}
					>
						<Icon icon="mdi:plus" className="mr-2" />
						Add Planning Item
					</button>
				)}
			</div>

			{/* Search and controls section */}
			<div className="flex flex-col md:flex-row gap-4 items-stretch">
				{/* Search bar */}
				<div className="flex-grow">
					<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
				</div>

				{/* Expand/Collapse buttons - only shown when items exist */}
				{hasItems && (
					<div className="flex gap-2 justify-end">
						<button
							onClick={expandAllItems}
							className="flex items-center justify-center px-3 py-2 text-sm bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
							title="Expand all items"
						>
							<Icon icon="mdi:chevron-down" className="mr-1" />
							<span className="hidden sm:inline">Expand All</span>
							<span className="sm:hidden">Expand</span>
						</button>
						<button
							onClick={collapseAllItems}
							className="flex items-center justify-center px-3 py-2 text-sm bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
							title="Collapse all items"
						>
							<Icon icon="mdi:chevron-up" className="mr-1" />
							<span className="hidden sm:inline">Collapse All</span>
							<span className="sm:hidden">Collapse</span>
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default Header
