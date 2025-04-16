import React from 'react'
import { Icon } from '@iconify/react'
import SearchBar from './SearchBar'
import { usePlannerContext } from '../context/PlannerContext'

interface HeaderProps {
	searchTerm: string
	setSearchTerm: (term: string) => void
}

const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm }) => {
	const { dispatch } = usePlannerContext()

	const toggleModal = () => {
		dispatch({ type: 'TOGGLE_MODAL', payload: true })
	}

	return (
		<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
			<h1 className="text-2xl font-bold text-white-0">Project Planning</h1>

			{/* Search bar */}
			<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

			<button
				className="flex items-center px-4 py-2 bg-[#ea5933] text-white-0 rounded-lg shadow hover:bg-opacity-90 transition-colors"
				onClick={toggleModal}
			>
				<Icon icon="mdi:plus" className="mr-2" />
				Add Planning Item
			</button>
		</div>
	)
}

export default Header
