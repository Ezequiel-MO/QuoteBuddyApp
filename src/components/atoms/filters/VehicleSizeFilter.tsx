import { useState, useEffect, FC, ChangeEvent, useRef } from 'react'
import baseAPI from '../../../axios/axiosConfig'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'framer-motion'

interface VehicleSizeFilterProps {
	company: string
	city: string
	vehicleCapacity: string
	setVehicleCapacity: (e: ChangeEvent<HTMLSelectElement> | string) => void
	className?: string
}

/**
 * VehicleSizeFilter - Enhanced dropdown for selecting vehicle sizes
 */
export const VehicleSizeFilter: FC<VehicleSizeFilterProps> = ({
	company,
	city,
	vehicleCapacity,
	setVehicleCapacity,
	className = ''
}) => {
	const [options, setOptions] = useState<string[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [isDropdownVisible, setIsDropdownVisible] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	// Fetch vehicle sizes when company or city changes
	useEffect(() => {
		const getVehicleSizesByCompany = async () => {
			console.log(
				'VehicleSizeFilter: Fetching vehicle sizes for company:',
				company,
				'in city:',
				city
			)

			if (!company || company === 'none' || company === '') {
				console.log('VehicleSizeFilter: No company selected, clearing options')
				setOptions([])
				return
			}

			setIsLoading(true)
			setError(null)

			let url = `transfers?company=${encodeURIComponent(company)}`
			if (city && city !== 'none' && city !== '') {
				url = `transfers?company=${encodeURIComponent(
					company
				)}&city=${encodeURIComponent(city)}`
			}

			console.log('VehicleSizeFilter: Making API request to:', url)

			try {
				const response = await baseAPI.get(url)
				console.log('VehicleSizeFilter: API response:', response.data)

				if (
					response.data?.data?.data &&
					Array.isArray(response.data.data.data)
				) {
					const vehicleSizes = response.data.data.data
						.map((transfer: { vehicleCapacity: string | number }) =>
							String(transfer.vehicleCapacity)
						)
						.filter(Boolean)

					const uniqueVehicleSizes = Array.from(
						new Set(vehicleSizes)
					) as string[]
					console.log(
						'VehicleSizeFilter: Unique vehicle sizes found:',
						uniqueVehicleSizes
					)
					setOptions(uniqueVehicleSizes)
				} else {
					console.error(
						'VehicleSizeFilter: Unexpected response format:',
						response.data
					)
					setError('Invalid response format')
					setOptions([])
				}
			} catch (error) {
				console.error('VehicleSizeFilter: Error fetching vehicle sizes:', error)
				setError('Failed to load vehicle sizes')
				setOptions([])
			} finally {
				setIsLoading(false)
			}
		}

		if (company) {
			getVehicleSizesByCompany()
		} else {
			setOptions([])
		}
	}, [company, city])

	// Handle vehicle size selection - Simple, direct approach
	const handleVehicleSizeChange = (size: string) => {
		console.log(`VehicleSizeFilter: Selection made - size: ${size}`)

		try {
			// First try direct value approach
			setVehicleCapacity(size)
			console.log(`VehicleSizeFilter: Direct value set - size: ${size}`)
		} catch (error) {
			console.error('VehicleSizeFilter: Error with direct approach:', error)

			// Fallback to event approach
			try {
				const mockEvent = {
					target: { value: size }
				} as unknown as ChangeEvent<HTMLSelectElement>

				setVehicleCapacity(mockEvent)
				console.log(`VehicleSizeFilter: Event value set - size: ${size}`)
			} catch (secondError) {
				console.error('VehicleSizeFilter: Both approaches failed:', secondError)
			}
		}

		// Close dropdown regardless of success
		setIsDropdownVisible(false)
	}

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

	// Get vehicle type based on capacity
	const getVehicleType = (size: string) => {
		const sizeNum = parseInt(size, 10)
		if (sizeNum <= 3) return 'Sedan Car'
		if (sizeNum === 6) return 'Mini Van'
		if (sizeNum === 20) return 'Mini Bus'
		return 'Bus'
	}

	// Get vehicle icon based on capacity
	const getVehicleIcon = (size: string) => {
		const sizeNum = parseInt(size, 10)
		if (sizeNum <= 3) return 'mdi:car'
		if (sizeNum <= 6) return 'mdi:van-passenger'
		if (sizeNum <= 20) return 'mdi:bus-stop'
		return 'mdi:bus'
	}

	// Get display text for the selected option
	const getDisplayText = () => {
		if (!vehicleCapacity) return 'Select vehicle size'
		return `${vehicleCapacity} seater ${getVehicleType(vehicleCapacity)}`
	}

	return (
		<div className={`relative ${className}`} ref={dropdownRef}>
			{/* Selector Button */}
			<button
				type="button"
				className={`w-full bg-gray-800 border border-gray-600 text-white-0 rounded-md py-2 px-3 flex items-center justify-between hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
					!company || company === 'none' ? 'opacity-70 cursor-not-allowed' : ''
				}`}
				onClick={() => {
					if (company && company !== 'none') {
						console.log('VehicleSizeFilter: Opening dropdown')
						setIsDropdownVisible(!isDropdownVisible)
					}
				}}
				disabled={!company || company === 'none'}
				aria-haspopup="listbox"
				aria-expanded={isDropdownVisible}
				data-testid="vehicle-size-selector"
			>
				<span className="truncate">
					{!company || company === 'none'
						? 'Select company first'
						: getDisplayText()}
				</span>
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
						data-testid="vehicle-size-dropdown"
					>
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
								<p className="mt-2 text-sm text-gray-400">
									Loading vehicle sizes...
								</p>
							</div>
						)}

						{/* Error State */}
						{error && !isLoading && (
							<div className="p-4 text-center">
								<Icon
									icon="heroicons:exclamation-circle"
									className="mx-auto text-red-500"
									width="24"
								/>
								<p className="mt-2 text-sm text-gray-400">{error}</p>
							</div>
						)}

						{/* Empty State */}
						{!isLoading && !error && options.length === 0 && (
							<div className="p-4 text-center">
								<Icon
									icon="heroicons:truck"
									className="mx-auto text-gray-400"
									width="24"
								/>
								<p className="mt-2 text-sm text-gray-400">
									No vehicle sizes available
								</p>
							</div>
						)}

						{/* Options List */}
						{!isLoading && !error && options.length > 0 && (
							<div className="max-h-60 overflow-y-auto custom-scrollbar">
								{/* No Selection Option */}
								<button
									type="button"
									className={`w-full text-left px-3 py-2 flex items-center ${
										!vehicleCapacity
											? 'bg-orange-500 text-white-0'
											: 'text-white-0 hover:bg-gray-700'
									}`}
									onClick={() => handleVehicleSizeChange('')}
									data-testid="vehicle-size-option-any"
								>
									<Icon icon="heroicons:truck" className="mr-2" width="18" />
									<span>Any vehicle size</span>
									{!vehicleCapacity && (
										<Icon
											icon="heroicons:check"
											className="ml-auto"
											width="18"
										/>
									)}
								</button>

								{/* Vehicle Size Options */}
								{options.map((size) => (
									<button
										key={size}
										type="button"
										className={`w-full text-left px-3 py-2 flex items-center ${
											vehicleCapacity === size
												? 'bg-orange-500 text-white-0'
												: 'text-white-0 hover:bg-gray-700'
										}`}
										onClick={() => {
											console.log(`VehicleSizeFilter: clicked size ${size}`)
											handleVehicleSizeChange(size)
										}}
										data-testid={`vehicle-size-option-${size}`}
									>
										<Icon
											icon={getVehicleIcon(size)}
											className="mr-2"
											width="18"
										/>
										<div>
											<span className="font-medium">{size} seater</span>
											<span className="ml-2 text-sm text-gray-400">
												{getVehicleType(size)}
											</span>
										</div>
										{vehicleCapacity === size && (
											<Icon
												icon="heroicons:check"
												className="ml-auto"
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
