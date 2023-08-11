import { CityFilter } from '../../../../../../components/atoms'
import { FC } from 'react'
import { VehicleSelection } from './VehiclesSelection'
import { TransferAsssistanceSelection } from './TransferAsssistanceSelection'
import { useTransfers } from './context'

export const TransfersModalHeader: FC = () => {
	const { city, setCity } = useTransfers()
	return (
		<div className="border border-slate-500 grid grid-cols-3 gap-2">
			<div className="max-w-[250px] self-start">
				<CityFilter city={city} setCity={setCity} />
			</div>
			<div className="max-w-[250px] self-start">
				<VehicleSelection />
			</div>
			<div className="max-w-[250px] self-start">
				<TransferAsssistanceSelection />
			</div>
		</div>
	)
}
