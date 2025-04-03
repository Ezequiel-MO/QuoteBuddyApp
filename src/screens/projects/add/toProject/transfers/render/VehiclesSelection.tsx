import { FC, useState, useRef, ChangeEvent } from 'react'
import { useTransfers } from './context'
import { Icon } from '@iconify/react'
import { ADD_TRANSFER_IN, ADD_TRANSFER_OUT } from './actionTypes'
import { useGetTransferObject } from '@hooks/useGetTransferObject'
import { TransferVendorFilter, VehicleSizeFilter } from '@ui/index'

/**
 * VehicleSelection - Component for selecting vehicle details
 * With conditional tooltips and disabled state handling
 */
export const VehicleSelection: FC = () => {
	const {
		setSelectedSection,
		city,
		company,
		setCompany,
		vehicleCapacity,
		setVehicleCapacity,
		dispatch,
		typeTransfer
	} = useTransfers()

	// Tooltip visibility states
	const [showVendorTooltip, setShowVendorTooltip] = useState(false)
	const [showSizeTooltip, setShowSizeTooltip] = useState(false)

	// Tooltip timeout references
	const vendorTooltipTimeout = useRef<NodeJS.Timeout | null>(null)
	const sizeTooltipTimeout = useRef<NodeJS.Timeout | null>(null)

	// Get transfer object based on selections - maintaining original API call
	const { transferObject, isLoading } = useGetTransferObject({
		city,
		company,
		vehicleCapacity
	})

	// Check if city is selected
	const isCitySelected = city !== 'none' && city !== ''

	// Check if company is selected
	const isCompanySelected = company !== 'none' && company !== ''

	// Fixed handlers that properly handle events
	const handleCompanyChange = (e: ChangeEvent<HTMLSelectElement> | string) => {
		if (!isCitySelected) return

		// Handle both direct value and event cases
		if (typeof e === 'object' && e.target && e.target.value !== undefined) {
			setCompany(e.target.value)
		} else if (typeof e === 'string') {
			setCompany(e)
		}
	}

	const handleVehicleCapacityChange = (
		e: ChangeEvent<HTMLSelectElement> | string
	) => {
		if (!isCompanySelected) return

		// Handle both direct value and event cases
		if (typeof e === 'object' && e.target && e.target.value !== undefined) {
			setVehicleCapacity(e.target.value)
		} else if (typeof e === 'string') {
			setVehicleCapacity(e)
		}
	}

	// Handle mouse events for vendor filter tooltip
	const handleVendorMouseEnter = () => {
		if (!isCitySelected) {
			vendorTooltipTimeout.current = setTimeout(() => {
				setShowVendorTooltip(true)
			}, 300)
		}
	}

	const handleVendorMouseLeave = () => {
		if (vendorTooltipTimeout.current) {
			clearTimeout(vendorTooltipTimeout.current)
		}
		setShowVendorTooltip(false)
	}

	// Handle mouse events for size filter tooltip
	const handleSizeMouseEnter = () => {
		if (!isCompanySelected) {
			sizeTooltipTimeout.current = setTimeout(() => {
				setShowSizeTooltip(true)
			}, 300)
		}
	}

	const handleSizeMouseLeave = () => {
		if (sizeTooltipTimeout.current) {
			clearTimeout(sizeTooltipTimeout.current)
		}
		setShowSizeTooltip(false)
	}

	// Handle adding a transfer - maintaining original functionality
	const handleAddTransfer = () => {
		setSelectedSection('transfer')

		// Don't proceed if required fields are missing
		if (company === 'none' || company === '' || vehicleCapacity === '') {
			return
		}

		if (typeTransfer === 'in') {
			dispatch({
				type: ADD_TRANSFER_IN,
				payload: { transferObject }
			})
		} else {
			dispatch({
				type: ADD_TRANSFER_OUT,
				payload: { transferObject }
			})
		}
	}

	// Check if add button should be disabled
	const isDisabled =
		company === 'none' ||
		company === '' ||
		vehicleCapacity === '' ||
		Object.values(transferObject || {}).length === 0 ||
		isLoading

	return (
		<div className="space-y-2">
			{/* Company/Vendor Selection with conditional tooltips */}
			<div className="relative">
				<label className="inline-block text-xs font-medium text-gray-400 mb-1">
					Transport Provider
				</label>
				<div
					className="relative"
					onMouseEnter={handleVendorMouseEnter}
					onMouseLeave={handleVendorMouseLeave}
				>
					<div>
						<TransferVendorFilter
							disabled={!isCitySelected}
							setCompany={handleCompanyChange}
							company={company}
							city={city}
							className={`w-full text-sm bg-gray-800 border-gray-600 text-white-0 rounded ${
								!isCitySelected
									? 'opacity-70 cursor-not-allowed'
									: 'cursor-pointer'
							}`}
						/>
					</div>

					{/* Tooltip for vendor selection */}
					{showVendorTooltip && (
						<div className="absolute left-0 top-full mt-1 z-10 bg-gray-900 text-white text-xs rounded px-2 py-1 w-full shadow-lg border border-gray-700">
							Please select a city first
						</div>
					)}
				</div>
			</div>

			{/* Vehicle Size Selection with conditional tooltips */}
			<div className="relative">
				<label className="inline-block text-xs font-medium text-gray-400 mb-1">
					Vehicle Size
				</label>
				<div
					className="relative"
					onMouseEnter={handleSizeMouseEnter}
					onMouseLeave={handleSizeMouseLeave}
				>
					<div>
						<VehicleSizeFilter
							disabled={!isCompanySelected}
							company={company}
							city={city}
							vehicleCapacity={vehicleCapacity}
							setVehicleCapacity={handleVehicleCapacityChange}
							className={`w-full text-sm bg-gray-800 border-gray-600 text-white-0 rounded ${
								!isCompanySelected
									? 'opacity-70 cursor-not-allowed'
									: 'cursor-pointer'
							}`}
						/>
					</div>

					{/* Tooltip for size selection */}
					{showSizeTooltip && (
						<div className="absolute left-0 top-full mt-1 z-10 bg-gray-900 text-white text-xs rounded px-2 py-1 w-full shadow-lg border border-gray-700">
							Please select a transport provider first
						</div>
					)}
				</div>
			</div>

			{/* Selection summary if both values are selected */}
			{company && company !== 'none' && vehicleCapacity && (
				<div className="bg-gray-800 p-2 rounded text-xs text-white-0">
					<div className="flex items-center justify-between">
						<span className="text-gray-400">Vendor:</span>
						<span className="font-medium truncate ml-1">{company}</span>
					</div>
					<div className="flex items-center justify-between mt-1">
						<span className="text-gray-400">Size:</span>
						<span className="font-medium">{vehicleCapacity} seater</span>
					</div>
				</div>
			)}

			{/* Add Transfer Button */}
			<button
				className={`w-full flex items-center justify-center py-1.5 px-2 rounded text-xs transition-colors duration-200 ${
					isDisabled
						? 'bg-gray-600 text-gray-400 cursor-not-allowed'
						: 'bg-orange-500 text-white-0 hover:bg-orange-600'
				}`}
				onClick={handleAddTransfer}
				disabled={isDisabled}
				data-testid="add-transfer-button"
			>
				{isLoading ? (
					<>
						<svg
							className="animate-spin -ml-1 mr-1 h-3 w-3 text-white-0"
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
						Loading...
					</>
				) : (
					<>
						<Icon icon="mdi:car-outline" className="mr-1" width="14" />
						Add Transfer
					</>
				)}
			</button>
		</div>
	)
}
