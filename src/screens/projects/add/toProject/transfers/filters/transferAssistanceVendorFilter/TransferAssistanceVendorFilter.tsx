import { FC, useRef, useState, useEffect } from 'react'
import { useFetchFreelancers } from 'src/hooks/fetchData'
import { IFreelancer } from '@interfaces/freelancer'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTransfers } from '../../render/context'

interface TransferAssistanceVendorFilterProps {
	className?: string
	disabled?: boolean
}

/**
 * TransferAssistanceVendorFilter - Enhanced dropdown for selecting assistance vendors
 */
export const TransferAssistanceVendorFilter: FC<
	TransferAssistanceVendorFilterProps
> = ({ className = '', disabled = false }) => {
	const { city, freelancer, setFreelancer } = useTransfers()
	const { freelancers: freelancersData, isLoading } = useFetchFreelancers({
		city
	})
	const freelancers = (freelancersData as unknown as IFreelancer[]) || []

	const [isDropdownVisible, setIsDropdownVisible] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const dropdownRef = useRef<HTMLDivElement>(null)
	const searchInputRef = useRef<HTMLInputElement>(null)

	// Filter freelancers based on search term
	const filteredFreelancers = searchTerm
		? freelancers.filter(
				(f) =>
					f.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					f.familyName?.toLowerCase().includes(searchTerm.toLowerCase())
		  )
		: freelancers

	// Handle freelancer selection
	const handleFreelancerChange = (selectedFreelancer: IFreelancer | null) => {
		setFreelancer(selectedFreelancer)
		setIsDropdownVisible(false)
		setSearchTerm('')
	}

	// Handle keyboard navigation
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && filteredFreelancers.length > 0) {
			handleFreelancerChange(filteredFreelancers[0])
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

	// Format price for display
	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'EUR',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).format(price)
	}

	// Get display text for the selected option
	const getDisplayText = () => {
		if (!freelancer) return 'Select assistance vendor'
		return `${freelancer.type} - ${formatPrice(freelancer.halfDayRate)}`
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
								Find Assistance Vendor
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
						{!isLoading && filteredFreelancers.length > 0 && (
							<div className="max-h-60 overflow-y-auto custom-scrollbar">
								{/* Clear Selection Option */}
								<button
									type="button"
									className={`w-full text-left px-3 py-2 flex items-center ${
										!freelancer
											? 'bg-orange-500 text-white-0'
											: 'text-white-0 hover:bg-gray-700'
									}`}
									onClick={() => handleFreelancerChange(null)}
								>
									<Icon icon="heroicons:x-circle" className="mr-2" width="18" />
									<span>Clear selection</span>
									{!freelancer && (
										<Icon
											icon="heroicons:check"
											className="ml-auto"
											width="18"
										/>
									)}
								</button>

								{/* Freelancer Options */}
								{filteredFreelancers.map((f) => (
									<button
										key={f._id}
										type="button"
										className={`w-full text-left px-3 py-2 flex items-center ${
											freelancer?._id === f._id
												? 'bg-orange-500 text-white-0'
												: 'text-white-0 hover:bg-gray-700'
										}`}
										onClick={() => handleFreelancerChange(f)}
									>
										<Icon
											icon={
												f.type?.includes('Guide')
													? 'heroicons:user-circle'
													: 'heroicons:identification'
											}
											className="mr-2"
											width="18"
										/>
										<div className="flex-1">
											<div className="font-medium">{f.type}</div>
											{f.familyName && (
												<div className="text-sm text-gray-400">
													{f.familyName}
												</div>
											)}
										</div>
										<div className="text-sm font-medium">
											{formatPrice(f.halfDayRate)}
										</div>
										{freelancer?._id === f._id && (
											<Icon
												icon="heroicons:check"
												className="ml-2"
												width="18"
											/>
										)}
									</button>
								))}
							</div>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
