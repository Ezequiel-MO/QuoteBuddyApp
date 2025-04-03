import { FC } from 'react'
import { useTransfers } from './context'
import { VehicleSelection } from './VehiclesSelection'
import { TransferAsssistanceSelection } from './TransferAsssistanceSelection'
import { CityFilter } from '@components/atoms'
import { Icon } from '@iconify/react'

/**
 * TransfersModalHeader - Header component for the transfers modal
 * Contains the city, vehicle, and assistance selection components
 * Redesigned for vertical layout and compact display
 */
export const TransfersModalHeader: FC = () => {
	const { city, setCity, typeTransfer } = useTransfers()

	return (
		<div className="space-y-4">
			{/* City Selection */}
			<div className="bg-gray-750 p-3 rounded-lg shadow-sm">
				<h4 className="text-white-0 text-sm font-medium flex items-center mb-2">
					<Icon
						icon="mdi:map-marker"
						className="mr-1 text-orange-400"
						width="16"
					/>
					Location
				</h4>
				<CityFilter
					city={city}
					setCity={setCity}
					className="w-full text-sm bg-gray-800 border-gray-600 rounded"
				/>
			</div>

			{/* Vehicle Selection */}
			<div className="bg-gray-750 p-3 rounded-lg shadow-sm">
				<h4 className="text-white-0 text-sm font-medium flex items-center mb-2">
					<Icon icon="mdi:car" className="mr-1 text-orange-400" width="16" />
					Vehicle Details
				</h4>
				<VehicleSelection />
			</div>

			{/* Assistance Selection */}
			<div className="bg-gray-750 p-3 rounded-lg shadow-sm">
				<h4 className="text-white-0 text-sm font-medium flex items-center mb-2">
					<Icon
						icon="mdi:account-group"
						className="mr-1 text-orange-400"
						width="16"
					/>
					Assistance Options
				</h4>
				<TransferAsssistanceSelection />
			</div>

			{/* Transfer Type Indicator */}
			<div className="mt-auto pt-4 text-center">
				<div className="bg-gray-700 py-2 px-3 rounded-full inline-flex items-center">
					<Icon
						icon={
							typeTransfer === 'in'
								? 'mdi:arrow-down-circle'
								: 'mdi:arrow-up-circle'
						}
						className={
							typeTransfer === 'in' ? 'text-green-400' : 'text-blue-400'
						}
						width="16"
					/>
					<span className="ml-1 text-xs font-medium text-white-0">
						Transfer {typeTransfer === 'in' ? 'In' : 'Out'}
					</span>
				</div>
			</div>
		</div>
	)
}
