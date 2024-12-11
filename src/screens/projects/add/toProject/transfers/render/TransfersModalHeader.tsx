import { CityFilter } from '../../../../../../components/atoms'
import { FC } from 'react'
import { VehicleSelection } from './VehiclesSelection'
import { TransferAsssistanceSelection } from './TransferAsssistanceSelection'
import { useTransfers } from './context'

export const TransfersModalHeader: FC = () => {
	const { city, setCity } = useTransfers()
	return (
		<div className="grid grid-cols-3 gap-2 py-2 items-start">
			<div className="flex flex-col space-y-2">
				<CityFilter city={city} setCity={setCity} />
			</div>
			<div className="flex flex-col space-y-2">
				<VehicleSelection />
			</div>
			<div className="flex flex-col space-y-2">
				<TransferAsssistanceSelection />
			</div>
		</div>
	)
}
