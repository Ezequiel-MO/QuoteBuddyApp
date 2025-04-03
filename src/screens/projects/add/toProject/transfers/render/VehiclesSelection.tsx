import { FC } from 'react'
import { useTransfers } from './context'
import { Icon } from '@iconify/react'
import { ADD_TRANSFER_IN, ADD_TRANSFER_OUT } from './actionTypes'
import { useGetTransferObject } from '@hooks/useGetTransferObject'
import { TransferVendorFilter, VehicleSizeFilter } from '@ui/index'

/**
 * VehicleSelection - Component for selecting vehicle details
 * Redesigned for a more compact layout
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

	// Get transfer object based on selections
	const { transferObject, isLoading } = useGetTransferObject({
		city,
		company,
		vehicleCapacity
	})

	// Handle adding a transfer
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
			{/* Company/Vendor Selection */}
			<div>
				<label className="inline-block text-xs font-medium text-gray-400 mb-1">
					Transport Provider
				</label>
				<TransferVendorFilter
					setCompany={(valueOrEvent: any) => {
						// Handle both direct value and event cases
						if (
							typeof valueOrEvent === 'object' &&
							valueOrEvent.target &&
							valueOrEvent.target.value !== undefined
						) {
							setCompany(valueOrEvent.target.value)
						} else if (typeof valueOrEvent === 'string') {
							setCompany(valueOrEvent)
						}
					}}
					company={company}
					city={city}
					className="w-full text-sm bg-gray-800 border-gray-600 text-white-0 rounded"
				/>
			</div>

			{/* Vehicle Size Selection */}
			<div>
				<label className="inline-block text-xs font-medium text-gray-400 mb-1">
					Vehicle Size
				</label>
				<VehicleSizeFilter
					company={company}
					city={city}
					vehicleCapacity={vehicleCapacity}
					setVehicleCapacity={(valueOrEvent) => {
						// Handle both direct value and event cases
						if (
							typeof valueOrEvent === 'object' &&
							valueOrEvent.target &&
							valueOrEvent.target.value !== undefined
						) {
							setVehicleCapacity(valueOrEvent.target.value)
						} else if (typeof valueOrEvent === 'string') {
							setVehicleCapacity(valueOrEvent)
						}
					}}
					className="w-full text-sm bg-gray-800 border-gray-600 text-white-0 rounded"
				/>
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
