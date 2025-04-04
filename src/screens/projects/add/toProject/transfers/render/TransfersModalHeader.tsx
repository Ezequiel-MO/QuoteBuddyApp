import { FC } from 'react'
import { useTransfers } from './context'
import { VehicleSelection } from './VehiclesSelection'
import { TransferAsssistanceSelection } from './TransferAsssistanceSelection'
import { CityFilter } from '@components/atoms'
import { Icon } from '@iconify/react'

/**
 * TransfersModalHeader - Header component for the transfers modal
 * Redesigned with a guided selection flow using conditional disabling and tooltips
 */
export const TransfersModalHeader: FC = () => {
	const { city, setCity, typeTransfer } = useTransfers()

	return (
		<div className="space-y-4">
			{/* Header section */}
			<div className="flex items-center justify-between mb-2">
				<h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
					Configure Options
				</h3>

				{/* Visual indicator of transfer type */}
				<div className="bg-gray-700 py-1 px-2 rounded-full inline-flex items-center text-xs">
					<Icon
						icon={
							typeTransfer === 'in'
								? 'mdi:arrow-down-circle'
								: 'mdi:arrow-up-circle'
						}
						className={
							typeTransfer === 'in' ? 'text-green-400' : 'text-blue-400'
						}
						width="14"
					/>
					<span className="ml-1 font-medium text-white-0">
						Transfer {typeTransfer === 'in' ? 'In' : 'Out'}
					</span>
				</div>
			</div>

			{/* Step 1: City Selection with visual indicators */}
			<div className="bg-gray-750 p-3 rounded-lg shadow-sm">
				<div className="flex items-center justify-between mb-2">
					<h4 className="text-white-0 text-sm font-medium flex items-center">
						<Icon
							icon="mdi:map-marker"
							className="mr-1 text-orange-400"
							width="16"
						/>
						Step 1: Location
					</h4>

					<div className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
						1
					</div>
				</div>

				{/* Using the existing CityFilter component */}
				<div className="relative">
					<CityFilter
						city={city}
						setCity={setCity}
						className="w-full text-sm bg-gray-800 border border-gray-600 text-white-0 rounded p-1.5"
					/>

					{city === 'none' && (
						<div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-orange-400 animate-pulse">
							<span className="text-xs">First step</span>
						</div>
					)}
				</div>

				{city !== 'none' && (
					<div className="mt-2 text-xs text-green-400 flex items-center">
						<Icon icon="mdi:check-circle" className="mr-1" width="12" />
						Location selected
					</div>
				)}
			</div>

			{/* Step 2: Vehicle Selection with conditional disabling */}
			<div className="bg-gray-750 p-3 rounded-lg shadow-sm">
				<div className="flex items-center justify-between mb-2">
					<h4 className="text-white-0 text-sm font-medium flex items-center">
						<Icon icon="mdi:car" className="mr-1 text-orange-400" width="16" />
						Step 2: Vehicle Details
					</h4>

					<div
						className={`text-white-0 text-xs rounded-full w-5 h-5 flex items-center justify-center ${
							city !== 'none' ? 'bg-orange-500' : 'bg-gray-600'
						}`}
					>
						2
					</div>
				</div>

				<VehicleSelection />
			</div>

			{/* Step 3: Assistance Selection with conditional disabling */}
			<div className="bg-gray-750 p-3 rounded-lg shadow-sm">
				<div className="flex items-center justify-between mb-2">
					<h4 className="text-white-0 text-sm font-medium flex items-center">
						<Icon
							icon="mdi:account-group"
							className="mr-1 text-orange-400"
							width="16"
						/>
						Step 3: Assistance (Optional)
					</h4>

					<div
						className={`text-white-0 text-xs rounded-full w-5 h-5 flex items-center justify-center ${
							city !== 'none' ? 'bg-orange-500' : 'bg-gray-600'
						}`}
					>
						3
					</div>
				</div>

				<TransferAsssistanceSelection />
			</div>

			{/* Quick help section */}
			<div className="bg-gray-800 p-2 rounded-lg border border-gray-700 text-xs text-gray-300">
				<div className="flex items-center text-orange-400 mb-1">
					<Icon icon="mdi:information" className="mr-1" width="14" />
					<span className="font-medium">Selection Guide</span>
				</div>
				<p>
					Follow the steps in order to configure your transfer. First select a
					city, then a transport provider and vehicle, and optionally add
					assistance services.
				</p>
			</div>
		</div>
	)
}
