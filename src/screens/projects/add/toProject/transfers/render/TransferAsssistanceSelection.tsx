import { FC } from 'react'
import { useTransfers } from './context'
import { ADD_SERVICE_IN, ADD_SERVICE_OUT } from './actionTypes'
import { Icon } from '@iconify/react'
import { TransferAssistanceVendorFilter } from '@components/atoms'
import { TypeOfTransfersAssistanceFilter } from '@components/atoms/filters/TypeofTransferAssistanceFilter'

/**
 * TransferAssistanceSelection - Component for selecting assistance options
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
		<div className="space-y-4">
			{/* Vendor Selection */}
			<div>
				<label className="block text-sm font-medium text-gray-400 mb-1">
					Assistance Provider
				</label>
				<TransferAssistanceVendorFilter />
			</div>

			{/* Assistance Type Selection */}
			<div>
				<label className="block text-sm font-medium text-gray-400 mb-1">
					Type of Assistance
				</label>
				<TypeOfTransfersAssistanceFilter
					typeOfAssistance={typeOfAssistance}
					setTypeOfAssistance={setTypeOfAssistance}
					typeTransfer={typeTransfer}
				/>
			</div>

			{/* Current Selection Info */}
			{freelancer && (
				<div className="bg-gray-800 p-2 rounded text-sm">
					<div className="text-gray-400">Selected Provider:</div>
					<div className="text-white-0 font-medium">{freelancer.type}</div>
					<div className="text-gray-400 mt-1">Rate:</div>
					<div className="text-white-0 font-medium">
						€{freelancer.halfDayRate}
					</div>
				</div>
			)}

			{/* Add Service Button */}
			<button
				className={`w-full flex items-center justify-center py-2 px-4 rounded transition-colors duration-200 ${
					isDisabled
						? 'bg-gray-600 text-gray-400 cursor-not-allowed'
						: 'bg-orange-500 text-white-0 hover:bg-orange-600'
				}`}
				onClick={handleAddService}
				disabled={isDisabled}
			>
				<Icon icon={getAssistanceIcon()} className="mr-2" width="20" />
				Add Service
			</button>
		</div>
	)
}
