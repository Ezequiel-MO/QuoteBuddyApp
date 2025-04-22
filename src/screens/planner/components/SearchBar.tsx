import React from 'react'
import { Icon } from '@iconify/react'

interface SearchBarProps {
	searchTerm: string
	setSearchTerm: (term: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const handleClear = () => {
		setSearchTerm('')
	}

	return (
		<div className="relative w-full">
			<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
				<Icon icon="mdi:magnify" className="h-5 w-5 text-gray-400" />
			</div>
			<input
				type="text"
				value={searchTerm}
				onChange={handleChange}
				placeholder="Search planning items..."
				className="w-full pl-10 pr-10 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ea5933] bg-gray-700 text-white-0 placeholder-gray-400"
			/>
			{searchTerm && (
				<button
					onClick={handleClear}
					className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
				>
					<Icon icon="mdi:close-circle" className="h-5 w-5" />
				</button>
			)}
		</div>
	)
}

export default SearchBar
