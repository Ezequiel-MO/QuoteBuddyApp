import { FC, useEffect, useRef, useState } from 'react'
import { ILocation } from '@interfaces/index'
import { useApiFetch } from 'src/hooks/fetchData'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'framer-motion'

interface CityFilterProps {
	city: string
	setCity: (city: string) => void
	className?: string
}

/**
 * CityFilter - Enhanced dropdown for selecting cities
 */
export const CityFilter: FC<CityFilterProps> = ({
	setCity,
	city,
	className = ''
}) => {
	const { data: locations = [] } = useApiFetch<ILocation[]>('locations')
	const [searchTerm, setSearchTerm] = useState('')
	const [isDropdownVisible, setIsDropdownVisible] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const searchInputRef = useRef<HTMLInputElement>(null)

	// Filter locations based on search term
	const filteredLocations = searchTerm
		? locations.filter((location) =>
				location.name.toLowerCase().includes(searchTerm.toLowerCase())
		  )
		: locations

	// Handle city selection
	const handleCityChange = (cityName: string) => {
		setCity(cityName === '' ? 'none' : cityName)
		setIsDropdownVisible(false)
		setSearchTerm('')
	}

	// Handle keyboard navigation
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && filteredLocations.length > 0) {
			handleCityChange(filteredLocations[0].name)
			setSearchTerm('')
			e.preventDefault()
		} else if (e.key === 'Escape') {
			setIsDropdownVisible(false)
			e.preventDefault()
		}
	}

	// Focus search input when dropdown opens
	useEffect(() => {
		if (isDropdownVisible && searchInputRef.current) {
			searchInputRef.current.focus()
		}
	}, [isDropdownVisible])

	// Close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			) {
				setIsDropdownVisible(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [dropdownRef])

	// Get display text for the selected option
	const getDisplayText = () => {
		return city || 'Select a city'
	}

	return (
		<div className={`relative ${className}`} ref={dropdownRef}>
			{/* Selector Button */}
			<button
				type="button"
				className="w-full bg-gray-800 border border-gray-600 text-white-0 rounded-md py-2 px-3 flex items-center justify-between hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
				onClick={() => setIsDropdownVisible(!isDropdownVisible)}
				aria-haspopup="listbox"
				aria-expanded={isDropdownVisible}
			>
				<span className="truncate">{getDisplayText()}</span>
				<Icon
					icon={
						isDropdownVisible
							? 'heroicons:chevron-up'
							: 'heroicons:chevron-down'
					}
					className="ml-2 text-gray-400"
					width="18"
				/>
			</button>

			{/* Dropdown Panel */}
			<AnimatePresence>
				{isDropdownVisible && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.15 }}
						className="absolute z-50 mt-1 w-full min-w-[240px] rounded-md bg-gray-800 border border-gray-600 shadow-lg overflow-hidden"
					>
						{/* Search Input */}
						<div className="p-2 border-b border-gray-700">
							<label className="block text-sm font-medium text-gray-400 mb-1">
								Find City
							</label>
							<div className="relative">
								<input
									ref={searchInputRef}
									type="text"
									className="w-full py-2 pl-8 pr-3 bg-gray-700 border border-gray-600 rounded-md text-white-0 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
									placeholder="Search cities..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									onKeyDown={handleKeyDown}
								/>
								<Icon
									icon="heroicons:magnifying-glass"
									className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
									width="16"
								/>
								{searchTerm && (
									<button
										type="button"
										className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white-0"
										onClick={() => setSearchTerm('')}
									>
										<Icon icon="heroicons:x-mark" width="16" />
									</button>
								)}
							</div>
						</div>

						{/* Options List */}
						<div className="max-h-60 overflow-y-auto custom-scrollbar">
							{/* All Cities Option */}
							<button
								type="button"
								className={`w-full text-left px-3 py-2 flex items-center ${
									city === ''
										? 'bg-orange-500 text-white-0'
										: 'text-white-0 hover:bg-gray-700'
								}`}
								onClick={() => handleCityChange('')}
							>
								<Icon
									icon="heroicons:globe-europe-africa"
									className="mr-2"
									width="18"
								/>
								<span>Select a City</span>
							</button>

							{/* Filtered City Options */}
							{filteredLocations.length > 0 ? (
								filteredLocations.map((location) => (
									<button
										key={location.name}
										type="button"
										className={`w-full text-left px-3 py-2 flex items-center ${
											city === location.name
												? 'bg-orange-500 text-white-0'
												: 'text-white-0 hover:bg-gray-700'
										}`}
										onClick={() => handleCityChange(location.name)}
									>
										<Icon
											icon="heroicons:map-pin"
											className="mr-2"
											width="18"
										/>
										<span>{location.name}</span>
										{city === location.name && (
											<Icon
												icon="heroicons:check"
												className="ml-auto"
												width="18"
											/>
										)}
									</button>
								))
							) : (
								<div className="px-3 py-4 text-center text-gray-400">
									No cities found
								</div>
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
