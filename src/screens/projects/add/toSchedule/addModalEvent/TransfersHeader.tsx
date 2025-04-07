import { FC } from 'react'
import { CityFilter } from '../../../../../components/atoms'
import { useTransfers } from '../../toProject/transfers/render/context'
import { VehicleSelectionTransfer } from './VehicleSelectionTransfer'
import { TransferAsssistanceSelection } from './TransferAsssistanceSelection'

export const TransfersHeader: FC = () => {
	const { city, setCity } = useTransfers()

	return (
		<div className="flex flex-col gap-4 p-4 bg-gray-750 rounded-lg shadow-sm">
			<div>
				<label className="block text-xs raggi font-medium text-gray-400 mb-1">
					City
				</label>
				<CityFilter
					city={city}
					setCity={setCity}
					className="w-full text-sm bg-gray-800 border border-gray-600 text-white rounded p-1.5"
				/>
			</div>
			<div>
				<label className="block text-xs font-medium text-gray-400 mb-1">
					Vehicle
				</label>
				<VehicleSelectionTransfer />
			</div>
			<div>
				<label className="block text-xs font-medium text-gray-400 mb-1">
					Assistance
				</label>
				<TransferAsssistanceSelection />
			</div>
		</div>
	)
}
