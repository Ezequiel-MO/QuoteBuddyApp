import { FC } from 'react'
import { useTransfers } from './context'
import { ADD_SERVICE_IN, ADD_SERVICE_OUT } from './actionTypes'
import { Icon } from '@iconify/react'
import { TransferAssistanceVendorFilter } from '@components/atoms'
import { TypeOfTransfersAssistanceFilter } from '@components/atoms/filters/TypeofTransferAssistanceFilter'

/**
 * TransferAssistanceSelection - Component for selecting assistance options
 * Redesigned for a more compact layout
 */
export const TransferAsssistanceSelection: FC = () => {
	const {
		typeOfAssistance,
		setTypeOfAssistance,
		setSelectedSection,
		freelancer,
		dispatch,
		typeTransfer
	} = useTransfers()

	// Handle adding a service
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
			{/* Vendor Selection - Compact */}
			<div>
				<label className="inline-block text-xs font-medium text-gray-400 mb-1">
					Assistance Provider
				</label>
				<TransferAssistanceVendorFilter />
			</div>

			{/* Assistance Type Selection - Compact */}
			<div>
				<label className="inline-block text-xs font-medium text-gray-400 mb-1">
					Type of Assistance
				</label>
				<TypeOfTransfersAssistanceFilter
					typeOfAssistance={typeOfAssistance}
					setTypeOfAssistance={setTypeOfAssistance}
					typeTransfer={typeTransfer}
				/>
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
