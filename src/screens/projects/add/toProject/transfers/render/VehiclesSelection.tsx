import { FC } from 'react'
import {
	TransferServiceFilter,
	TransferVendorFilter,
	VehicleSizeFilter
} from '../../../../../../ui'
import { useTransfers } from './context'

export const VehicleSelection: FC = () => {
	const {
		city,
		company,
		setCompany,
		vehicleCapacity,
		setVehicleCapacity,
		service,
		setService
	} = useTransfers()
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
				<TransferServiceFilter
					city={city}
					vehicleCapacity={vehicleCapacity}
					company={company}
					service={service}
					setService={setService}
				/>
			</div>
			<div>
				<p>ADD TRANSFER</p>
			</div>
		</div>
	)
}
