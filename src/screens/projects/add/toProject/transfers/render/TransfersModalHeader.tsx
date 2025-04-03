import { FC } from 'react'
import { useTransfers } from './context'
import { VehicleSelection } from './VehiclesSelection'
import { TransferAsssistanceSelection } from './TransferAsssistanceSelection'
import { CityFilter } from '@components/atoms'

/**
 * TransfersModalHeader - Header component for the transfers modal
 * Contains the city, vehicle, and assistance selection components
 */
export const TransfersModalHeader: FC = () => {
	const { city, setCity, typeTransfer } = useTransfers()

	return (
		<div className="mb-6">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* City Selection */}
				<div className="bg-gray-700 p-4 rounded-lg shadow-md flex flex-col h-full">
					<h4 className="text-white-0 font-medium mb-3 border-b border-gray-600 pb-2">
						Select City
					</h4>
					<div className="text-white-0 flex-1">
						<CityFilter city={city} setCity={setCity} className="w-full" />
					</div>
				</div>

				{/* Vehicle Selection */}
				<div className="bg-gray-700 p-4 rounded-lg shadow-md flex flex-col h-full">
					<h4 className="text-white-0 font-medium mb-3 border-b border-gray-600 pb-2">
						Vehicle Details
					</h4>
					<div className="flex-1 flex flex-col justify-between">
						<VehicleSelection />
					</div>
				</div>

				{/* Assistance Selection */}
				<div className="bg-gray-700 p-4 rounded-lg shadow-md flex flex-col h-full">
					<h4 className="text-white-0 font-medium mb-3 border-b border-gray-600 pb-2">
						Assistance Options
					</h4>
					<div className="flex-1 flex flex-col justify-between">
						<TransferAsssistanceSelection />
					</div>
				</div>
			</div>
		</div>
	)
}
