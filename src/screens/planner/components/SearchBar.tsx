import React from 'react'
import { Icon } from '@iconify/react'

interface SearchBarProps {
	searchTerm: string
	setSearchTerm: (term: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
	return (
		<div className="w-full md:w-1/3 relative">
			<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
				<Icon icon="mdi:magnify" className="text-gray-400 h-5 w-5" />
			</div>
			<input
				type="text"
				placeholder="Search planning items, options or comments..."
				className="pl-10 pr-4 py-2 w-full border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea5933] bg-gray-800 text-white-0"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			{searchTerm && (
				<button
					className="absolute inset-y-0 right-0 pr-3 flex items-center"
					onClick={() => setSearchTerm('')}
				>
					<Icon
						icon="mdi:close"
						className="text-gray-400 h-5 w-5 hover:text-white-0"
					/>
				</button>
			)}
		</div>
	)
}

export default SearchBar
