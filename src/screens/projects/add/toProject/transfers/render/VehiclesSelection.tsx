import { FC } from 'react'
import {
	TransferServiceFilter,
	TransferVendorFilter,
	VehicleSizeFilter
} from '../../../../../../ui'
import { useTransfers } from './context'

export const VehicleSelection: FC = () => {
	const { city, company, setCompany, vehicleCapacity, setVehicleCapacity } =
		useTransfers()
	return (
		<div className="flex flex-row items-end">
			<div>
				<TransferVendorFilter
					setCompany={setCompany}
					company={company}
					city={city}
				/>
				<VehicleSizeFilter
					company={company}
					city={city}
					vehicleCapacity={vehicleCapacity}
					setVehicleCapacity={setVehicleCapacity}
				/>
				<TransferServiceFilter />
			</div>
			<div>
				<p>ADD TRANSFER</p>
			</div>
		</div>
	)
}
