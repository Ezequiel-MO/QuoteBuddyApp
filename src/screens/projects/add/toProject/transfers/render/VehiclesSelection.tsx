import { FC } from 'react'
import { useTransfers } from './context'
import { Icon } from '@iconify/react'
import { ADD_TRANSFER_IN, ADD_TRANSFER_OUT } from './actionTypes'
import { useGetTransferObject } from '@hooks/useGetTransferObject'
import { TransferVendorFilter, VehicleSizeFilter } from '@ui/index'

/**
 * VehicleSelection - Component for selecting vehicle details
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

	// Log the current state for debugging
	console.log('VehicleSelection rendering with state:', {
		city,
		company,
		vehicleCapacity,
		hasTransferObject: !!transferObject,
		transferObjectKeys: transferObject ? Object.keys(transferObject) : []
	})

	// Handle adding a transfer
	const handleAddTransfer = () => {
		console.log('VehicleSelection: Add transfer clicked with data:', {
			company,
			vehicleCapacity,
			transferObject
		})

		setSelectedSection('transfer')

		// Don't proceed if required fields are missing
		if (company === 'none' || company === '' || vehicleCapacity === '') {
			console.log('VehicleSelection: Missing required fields, not dispatching')
			return
		}

		if (typeTransfer === 'in') {
			console.log('VehicleSelection: Dispatching ADD_TRANSFER_IN')
			dispatch({
				type: ADD_TRANSFER_IN,
				payload: { transferObject }
			})
		} else {
			console.log('VehicleSelection: Dispatching ADD_TRANSFER_OUT')
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

	console.log('VehicleSelection: Button disabled state:', isDisabled)

	return (
		<div className="flex flex-col h-full">
			<div className="space-y-4 flex-grow">
				{/* Company/Vendor Selection */}
				<div>
					<label className="block text-sm font-medium text-gray-400 mb-1">
						Transport Provider
					</label>
					<TransferVendorFilter
						setCompany={(valueOrEvent: any) => {
							console.log(
								'VehicleSelection: TransferVendorFilter callback with:',
								valueOrEvent
							)

							// Handle both direct value and event cases
							if (
								typeof valueOrEvent === 'object' &&
								valueOrEvent.target &&
								valueOrEvent.target.value !== undefined
							) {
								const value = valueOrEvent.target.value
								console.log(
									`VehicleSelection: Setting company to "${value}" (from event)`
								)
								setCompany(value)
							} else if (typeof valueOrEvent === 'string') {
								console.log(
									`VehicleSelection: Setting company to "${valueOrEvent}" (direct string)`
								)
								setCompany(valueOrEvent)
							} else {
								console.warn(
									'VehicleSelection: Unexpected value type in setCompany:',
									typeof valueOrEvent
								)
							}
						}}
						company={company}
						city={city}
						className="w-full bg-gray-800 border-gray-600 text-white-0 rounded"
					/>
				</div>

				{/* Vehicle Size Selection */}
				<div>
					<label className="block text-sm font-medium text-gray-400 mb-1">
						Vehicle Size
					</label>
					<VehicleSizeFilter
						company={company}
						city={city}
						vehicleCapacity={vehicleCapacity}
						setVehicleCapacity={(valueOrEvent) => {
							console.log(
								'VehicleSelection: VehicleSizeFilter callback with:',
								valueOrEvent
							)

							// Handle both direct value and event cases
							if (
								typeof valueOrEvent === 'object' &&
								valueOrEvent.target &&
								valueOrEvent.target.value !== undefined
							) {
								const value = valueOrEvent.target.value
								console.log(
									`VehicleSelection: Setting vehicleCapacity to "${value}" (from event)`
								)
								setVehicleCapacity(value)
							} else if (typeof valueOrEvent === 'string') {
								console.log(
									`VehicleSelection: Setting vehicleCapacity to "${valueOrEvent}" (direct string)`
								)
								setVehicleCapacity(valueOrEvent)
							} else {
								console.warn(
									'VehicleSelection: Unexpected value type in setVehicleCapacity:',
									typeof valueOrEvent
								)
							}
						}}
						className="w-full bg-gray-800 border-gray-600 text-white-0 rounded"
					/>
				</div>

				{/* Selection summary if both values are selected */}
				{company && company !== 'none' && vehicleCapacity && (
					<div className="bg-gray-700 p-3 rounded-md text-white-0 text-sm">
						<p>
							<span className="text-gray-400">Selected vendor:</span> {company}
						</p>
						<p>
							<span className="text-gray-400">Vehicle size:</span>{' '}
							{vehicleCapacity} seater
						</p>
					</div>
				)}
			</div>

			{/* Add Transfer Button - Positioned at the bottom */}
			<div className="mt-auto pt-4">
				<button
					className={`w-full flex items-center justify-center py-2 px-4 rounded transition-colors duration-200 ${
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
								className="animate-spin -ml-1 mr-2 h-4 w-4 text-white-0"
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
							<Icon icon="mdi:car-outline" className="mr-2" width="20" />
							Add Transfer
						</>
					)}
				</button>
			</div>
		</div>
	)
}
