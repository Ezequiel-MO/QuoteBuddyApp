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
		<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
			<div className="flex items-center">
				<h1 className="text-2xl font-bold text-white-0 mr-3">
					Project Planning
				</h1>
				<span
					className="px-2 py-1 text-xs font-medium rounded"
					style={{
						backgroundColor: userRole === 'AM' ? '#0f766e' : '#ea5933',
						color: 'white'
					}}
				>
					{userRole} View
				</span>
			</div>

			{/* Center section with search and expand/collapse controls */}
			<div className="flex flex-col md:flex-row md:items-center gap-3 flex-grow md:max-w-xl w-full">
				{/* Search bar */}
				<div className="flex-grow w-full">
					<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
				</div>

				{/* Expand/Collapse buttons - only shown when items exist */}
				{hasItems && (
					<div className="flex space-x-2 flex-shrink-0">
						<button
							onClick={expandAllItems}
							className="flex items-center px-3 py-1.5 text-sm bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
							title="Expand all items"
						>
							<Icon icon="mdi:chevron-down" className="mr-1" />
							Expand All
						</button>
						<button
							onClick={collapseAllItems}
							className="flex items-center px-3 py-1.5 text-sm bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
							title="Collapse all items"
						>
							<Icon icon="mdi:chevron-up" className="mr-1" />
							Collapse All
						</button>
					</div>
				)}
			</div>

			{/* Only show Add button if user has permission */}
			{canAddPlanningItem && (
				<button
					className="flex items-center px-4 py-2 bg-[#ea5933] text-white-0 rounded-lg shadow hover:bg-opacity-90 transition-colors flex-shrink-0"
					onClick={toggleModal}
				>
					<Icon icon="mdi:plus" className="mr-2" />
					Add Planning Item
				</button>
			)}
		</div>
	)
}

export default Header
