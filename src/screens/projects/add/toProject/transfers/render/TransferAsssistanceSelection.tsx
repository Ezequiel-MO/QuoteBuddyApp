import { FC, useState, useRef } from 'react'
import { useTransfers } from './context'
import { ADD_SERVICE_IN, ADD_SERVICE_OUT } from './actionTypes'
import { Icon } from '@iconify/react'
import { TransferAssistanceVendorFilter } from '@components/atoms'
import { TypeOfTransfersAssistanceFilter } from '@components/atoms/filters/TypeofTransferAssistanceFilter'

/**
 * TransferAssistanceSelection - Component for selecting assistance options
 * Fixed to avoid direct rendering of object
 */
export const TransferAsssistanceSelection: FC = () => {
	const {
		typeOfAssistance,
		setTypeOfAssistance,
		setSelectedSection,
		freelancer,
		dispatch,
		typeTransfer,
		city
	} = useTransfers()

	// Tooltip visibility states
	const [showVendorTooltip, setShowVendorTooltip] = useState(false)
	const [showTypeTooltip, setShowTypeTooltip] = useState(false)

	// Tooltip timeout references
	const vendorTooltipTimeout = useRef<NodeJS.Timeout | null>(null)
	const typeTooltipTimeout = useRef<NodeJS.Timeout | null>(null)

	// Check if city is selected
	const isCitySelected = city !== 'none' && city !== ''

	// Check if a freelancer is selected
	const isFreelancerSelected = !!freelancer

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

	// Handle mouse events for type filter tooltip
	const handleTypeMouseEnter = () => {
		if (!isFreelancerSelected) {
			typeTooltipTimeout.current = setTimeout(() => {
				setShowTypeTooltip(true)
			}, 300)
		}
	}

	const handleTypeMouseLeave = () => {
		if (typeTooltipTimeout.current) {
			clearTimeout(typeTooltipTimeout.current)
		}
		setShowTypeTooltip(false)
	}

	// Define the allowed assistance types
	type AssistanceType = 'meetGreet' | 'hostessOnBoard' | 'guideOnBoard'

	// Check if a string is a valid assistance type
	const isValidAssistanceType = (value: string): value is AssistanceType => {
		return ['meetGreet', 'hostessOnBoard', 'guideOnBoard'].includes(value)
	}

	// Handle type of assistance change without rendering the event object
	const handleTypeOfAssistanceChange = (value: any) => {
		if (!isFreelancerSelected) return

		// Make sure we're only passing the string value
		if (
			typeof value === 'object' &&
			value.target &&
			value.target.value !== undefined
		) {
			const targetValue = value.target.value
			if (isValidAssistanceType(targetValue)) {
				setTypeOfAssistance(targetValue)
			}
		} else if (typeof value === 'string') {
			if (isValidAssistanceType(value)) {
				setTypeOfAssistance(value)
			}
		}
	}

	// Handle adding a service - maintaining original functionality
	const handleAddService = () => {
		setSelectedSection('service')

		// Don't proceed if required fields are missing
		if (!freelancer || !typeOfAssistance) return

		if (typeTransfer === 'in') {
			dispatch({
				type: ADD_SERVICE_IN,
				payload: { freelancer, typeOfAssistance }
			})
		} else if (typeTransfer === 'out') {
			dispatch({
				type: ADD_SERVICE_OUT,
				payload: { freelancer, typeOfAssistance }
			})
		}
	}

	// Check if add button should be disabled
	const isDisabled = !freelancer || !typeOfAssistance

	// Get icon based on assistance type
	const getAssistanceIcon = () => {
		switch (typeOfAssistance) {
			case 'meetGreet':
				return 'mdi:handshake'
			case 'hostessOnBoard':
				return 'mdi:human-greeting-variant'
			case 'guideOnBoard':
				return 'mdi:account-tie'
			default:
				return 'mdi:account-question'
		}
	}

	return (
		<div className="space-y-2">
			{/* Vendor Selection - With conditional tooltips */}
			<div className="relative">
				<label className="inline-block text-xs font-medium text-gray-400 mb-1">
					Assistance Provider
				</label>
				<div
					className="relative"
					onMouseEnter={handleVendorMouseEnter}
					onMouseLeave={handleVendorMouseLeave}
				>
					{/* Wrapped component without passing event object */}
					<div className={!isCitySelected ? 'opacity-70' : ''}>
						<TransferAssistanceVendorFilter
							className={!isCitySelected ? 'cursor-not-allowed' : ''}
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

			{/* Assistance Type Selection - With conditional tooltips */}
			<div className="relative">
				<label className="inline-block text-xs font-medium text-gray-400 mb-1">
					Type of Assistance
				</label>
				<div
					className="relative"
					onMouseEnter={handleTypeMouseEnter}
					onMouseLeave={handleTypeMouseLeave}
				>
					{/* Wrapped component with proper handler */}
					<div className={!isFreelancerSelected ? 'opacity-70' : ''}>
						<TypeOfTransfersAssistanceFilter
							typeOfAssistance={typeOfAssistance}
							setTypeOfAssistance={handleTypeOfAssistanceChange}
							typeTransfer={typeTransfer}
							className={`w-full text-sm ${
								!isFreelancerSelected ? 'cursor-not-allowed' : 'cursor-pointer'
							}`}
						/>
					</div>

					{/* Tooltip for type selection */}
					{showTypeTooltip && (
						<div className="absolute left-0 top-full mt-1 z-10 bg-gray-900 text-white text-xs rounded px-2 py-1 w-full shadow-lg border border-gray-700">
							Please select an assistance provider first
						</div>
					)}
				</div>
			</div>

			{/* Current Selection Info - More compact display */}
			{freelancer && (
				<div className="bg-gray-800 p-2 rounded text-xs">
					<div className="flex justify-between items-center">
						<span className="text-gray-400">Provider:</span>
						<span className="text-white-0 font-medium truncate">
							{freelancer.type}
						</span>
					</div>
					<div className="flex justify-between items-center mt-0.5">
						<span className="text-gray-400">Rate:</span>
						<span className="text-white-0 font-medium">
							€{freelancer.halfDayRate}
						</span>
					</div>
				</div>
			)}

			{/* Add Service Button - Compact */}
			<button
				className={`w-full flex items-center justify-center py-1.5 px-2 rounded text-xs transition-colors duration-200 ${
					isDisabled
						? 'bg-gray-600 text-gray-400 cursor-not-allowed'
						: 'bg-orange-500 text-white-0 hover:bg-orange-600'
				}`}
				onClick={handleAddService}
				disabled={isDisabled}
			>
				<Icon icon={getAssistanceIcon()} className="mr-1" width="14" />
				Add Service
			</button>
		</div>
	)
}
