import { useState, useEffect, FC, ChangeEvent, useRef } from 'react'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useVehicleSizes } from '@screens/projects/add/toProject/transfers/hooks/useVehicleSizes'

interface VehicleSizeFilterProps {
	company: string
	city: string
	vehicleCapacity: string
	setVehicleCapacity: (e: ChangeEvent<HTMLSelectElement> | string) => void
	className?: string
	disabled?: boolean
}

export const VehicleSizeFilter: FC<VehicleSizeFilterProps> = ({
	company,
	city,
	vehicleCapacity,
	setVehicleCapacity,
	className = '',
	disabled = false
}) => {
	const {
		vehicleSizes,
		isLoading: isLoadingVehicleSizes,
		fetchVehicleSizes
	} = useVehicleSizes()
	const [isDropdownVisible, setIsDropdownVisible] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	// Fetch vehicle sizes when company or city changes
	useEffect(() => {
		if (company && company !== 'none') {
			fetchVehicleSizes(company, city)
		}
	}, [company, city])

	// Handle vehicle size selection
	const handleVehicleSizeChange = (size: string) => {
		console.log(`VehicleSizeFilter: Selection made - size: ${size}`)

		try {
			// First try direct value approach
			setVehicleCapacity(size)
		} catch (error) {
			// Fallback to event approach
			try {
				const mockEvent = {
					target: { value: size }
				} as unknown as ChangeEvent<HTMLSelectElement>

				setVehicleCapacity(mockEvent)
			} catch (secondError) {
				console.error('VehicleSizeFilter: Both approaches failed:', secondError)
			}
		}
		// Close dropdown
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
				disabled={disabled}
				className={`w-full bg-gray-800 border border-gray-600 text-white-0 rounded-md py-2 px-3 flex items-center justify-between hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
					disabled ? 'opacity-70 cursor-not-allowed' : ''
				}`}
				onClick={() => {
					if (disabled || !company || company === 'none') return
					setIsDropdownVisible(!isDropdownVisible)
				}}
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
						{isLoadingVehicleSizes && (
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

						{/* Empty State */}
						{!isLoadingVehicleSizes && vehicleSizes.length === 0 && (
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
						{!isLoadingVehicleSizes && vehicleSizes.length > 0 && (
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
								{vehicleSizes.map((size) => (
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
