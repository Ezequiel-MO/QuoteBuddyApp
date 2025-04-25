import React, { useState } from 'react'
import { Icon } from '@iconify/react'

interface SearchBarProps {
	searchTerm: string
	setSearchTerm: (term: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
	const [isFocused, setIsFocused] = useState(false)
	const [showTooltip, setShowTooltip] = useState(false)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const handleClear = () => {
		setSearchTerm('')
	}

	return (
		<div className="relative w-full group">
			<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
				<Icon
					icon="mdi:magnify"
					className={`h-5 w-5 transition-colors ${
						isFocused ? 'text-[#ea5933]' : 'text-gray-400'
					}`}
				/>
			</div>

			{/* Info tooltip icon */}
			<div className="absolute inset-y-0 right-12 flex items-center">
				<button
					type="button"
					className="text-gray-400 hover:text-gray-300 focus:outline-none"
					onMouseEnter={() => setShowTooltip(true)}
					onMouseLeave={() => setShowTooltip(false)}
					onClick={() => setShowTooltip(!showTooltip)}
					aria-label="Search help"
				>
					<Icon icon="mdi:information-outline" className="h-5 w-5" />
				</button>

				{/* Tooltip content */}
				{showTooltip && (
					<div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-md shadow-lg p-4 border border-gray-700 z-30 top-8">
						<h4 className="text-sm font-medium text-white-0 mb-2">
							Enhanced Search Capabilities:
						</h4>
						<ul className="text-xs text-gray-300 space-y-2">
							<li className="flex items-start">
								<Icon
									icon="mdi:check-circle"
									className="text-cyan-400 mt-0.5 mr-1.5 shrink-0"
								/>
								<span>
									<span className="font-medium">Planning Items:</span> Title,
									Description, Day, Status
								</span>
							</li>
							<li className="flex items-start">
								<Icon
									icon="mdi:check-circle"
									className="text-cyan-400 mt-0.5 mr-1.5 shrink-0"
								/>
								<span>
									<span className="font-medium">Options:</span> Title, Vendor
									Type, Notes, Price, Status
								</span>
							</li>
							<li className="flex items-start">
								<Icon
									icon="mdi:check-circle"
									className="text-cyan-400 mt-0.5 mr-1.5 shrink-0"
								/>
								<span>
									<span className="font-medium">Comments:</span> Content, Author
									Name
								</span>
							</li>
							<li className="flex items-start">
								<Icon
									icon="mdi:check-circle"
									className="text-cyan-400 mt-0.5 mr-1.5 shrink-0"
								/>
								<span>
									<span className="font-medium">Documents:</span> File Names
								</span>
							</li>
						</ul>
						<div className="mt-3 pt-2 border-t border-gray-700">
							<p className="text-xs text-gray-400 italic">
								Try searching for "hotel", "day 1", or a team member's name
							</p>
						</div>
					</div>
				)}
			</div>

			<input
				type="text"
				value={searchTerm}
				onChange={handleChange}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				placeholder="Search items, options, comments..."
				className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 bg-gray-700 text-white-0 placeholder-gray-400 ${
					isFocused
						? 'border-[#ea5933] focus:ring-[#ea5933] focus:ring-opacity-50'
						: 'border-gray-600 hover:border-gray-500'
				}`}
			/>

			{searchTerm && (
				<button
					onClick={handleClear}
					className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200 transition-colors"
				>
					<Icon icon="mdi:close-circle" className="h-5 w-5" />
				</button>
			)}
		</div>
	)
}

export default SearchBar
