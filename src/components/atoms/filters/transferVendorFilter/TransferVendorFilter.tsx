// src/components/atoms/filters/transferVendorFilter/TransferVendorFilter.tsx
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTransferCompanies } from '@screens/projects/add/toProject/transfers/hooks/useTransferCompanies'

interface TransferVendorFilterProps {
	company: string
	setCompany:
		| ((e: ChangeEvent<HTMLSelectElement>) => void)
		| ((value: string) => void)
	city: string
	className?: string
	disabled?: boolean
}

export const TransferVendorFilter: FC<TransferVendorFilterProps> = ({
	setCompany,
	company,
	city,
	className = '',
	disabled = false
}) => {
	const { transferCompanies, isLoading, fetchCompanies } =
		useTransferCompanies()
	const [isDropdownVisible, setIsDropdownVisible] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const dropdownRef = useRef<HTMLDivElement>(null)
	const searchInputRef = useRef<HTMLInputElement>(null)

	// Fetch companies when city changes or component mounts
	useEffect(() => {
		if (city) {
			fetchCompanies(city)
		}
	}, [city])

	// Filter companies based on search term
	const filteredCompanies = searchTerm
		? transferCompanies.filter((companyName) =>
				companyName.toLowerCase().includes(searchTerm.toLowerCase())
		  )
		: transferCompanies

	// Handle company selection with robust error handling
	const handleCompanyChange = (companyName: string) => {
		try {
			// First try with event-like object (most common case)
			const mockEvent = {
				target: { value: companyName }
			} as unknown as ChangeEvent<HTMLSelectElement>

			// @ts-ignore - intentionally allowing this flexible call
			setCompany(mockEvent)
		} catch (error) {
			try {
				// Try direct value approach as fallback
				// @ts-ignore - intentionally allowing this flexible call
				setCompany(companyName)
			} catch (secondError) {
				console.error(
					'TransferVendorFilter: Both approaches failed:',
					secondError
				)
			}
		}

		// Close dropdown regardless
		setIsDropdownVisible(false)
		setSearchTerm('')
	}

	// Handle keyboard navigation
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && filteredCompanies.length > 0) {
			handleCompanyChange(filteredCompanies[0])
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
		return company && company !== 'none' ? company : 'Select a vendor'
	}

	return (
		<div className={`relative ${className}`} ref={dropdownRef}>
			{/* Selector Button */}
			<button
				type="button"
				disabled={disabled}
				className={`w-full bg-gray-800 border border-gray-600 text-white-0 rounded-md py-2 px-3 flex items-center justify-between hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
					disabled ? 'opacity-70 cursor-not-allowed' : ''
				}`}
				onClick={() => {
					if (disabled) return
					setIsDropdownVisible(!isDropdownVisible)
				}}
				aria-haspopup="listbox"
				aria-expanded={isDropdownVisible}
				data-testid="vendor-selector"
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
						data-testid="vendor-dropdown"
					>
						{/* Search Input */}
						<div className="p-2 border-b border-gray-700">
							<label className="block text-sm font-medium text-gray-400 mb-1">
								Find Vendor
							</label>
							<div className="relative">
								<input
									ref={searchInputRef}
									type="text"
									className="w-full py-2 pl-8 pr-3 bg-gray-700 border border-gray-600 rounded-md text-white-0 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
									placeholder="Search vendors..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									onKeyDown={handleKeyDown}
									data-testid="vendor-search-input"
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

						{/* Loading State */}
						{isLoading && (
							<div className="p-4 text-center">
								<svg
									className="animate-spin h-5 w-5 mx-auto text-orange-500"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
								<p className="mt-2 text-sm text-gray-400">Loading vendors...</p>
							</div>
						)}

						{/* Options List */}
						{!isLoading && (
							<div className="max-h-60 overflow-y-auto custom-scrollbar">
								{/* All Vendors Option */}
								<button
									type="button"
									className={`w-full text-left px-3 py-2 flex items-center ${
										!company || company === 'none' || company === ''
											? 'bg-orange-500 text-white-0'
											: 'text-white-0 hover:bg-gray-700'
									}`}
									onClick={() => {
										console.log('TransferVendorFilter: Clearing selection')
										handleCompanyChange('')
									}}
									data-testid="vendor-option-any"
								>
									<Icon
										icon="heroicons:building-office-2"
										className="mr-2"
										width="18"
									/>
									<span>All vendors</span>
									{(!company || company === 'none' || company === '') && (
										<Icon
											icon="heroicons:check"
											className="ml-auto"
											width="18"
										/>
									)}
								</button>

								{/* Filtered Vendor Options */}
								{filteredCompanies.length > 0 ? (
									filteredCompanies.map((companyName) => (
										<button
											key={companyName}
											type="button"
											className={`w-full text-left px-3 py-2 flex items-center ${
												company === companyName
													? 'bg-orange-500 text-white-0'
													: 'text-white-0 hover:bg-gray-700'
											}`}
											onClick={() => handleCompanyChange(companyName)}
											data-testid={`vendor-option-${companyName
												.replace(/\s+/g, '-')
												.toLowerCase()}`}
										>
											<Icon
												icon="heroicons:truck"
												className="mr-2"
												width="18"
											/>
											<span>{companyName}</span>
											{company === companyName && (
												<Icon
													icon="heroicons:check"
													className="ml-auto"
													width="18"
												/>
											)}
										</button>
									))
								) : (
									// No results found state
									<div className="p-4 text-center text-gray-400">
										No vendors match "{searchTerm}"
									</div>
								)}
							</div>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
