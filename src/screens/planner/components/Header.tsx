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
	const { dispatch } = usePlannerContext()
	const canAddPlanningItem = useCanAddPlanningItem()
	const { userRole } = usePlannerPermissions()

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

			{/* Search bar */}
			<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

			{/* Only show Add button if user has permission */}
			{canAddPlanningItem && (
				<button
					className="flex items-center px-4 py-2 bg-[#ea5933] text-white-0 rounded-lg shadow hover:bg-opacity-90 transition-colors"
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
