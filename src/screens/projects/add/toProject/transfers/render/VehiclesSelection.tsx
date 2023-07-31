import { FC } from 'react'
import {
	TransferServiceFilter,
	TransferVendorFilter,
	VehicleSizeFilter
} from '../../../../../../ui'
import { useTransfers } from './context'

export const VehicleSelection: FC = () => {
	const {
		setSelectedSection,
		city,
		company,
		setCompany,
		vehicleCapacity,
		setVehicleCapacity,
		service,
		setService
	} = useTransfers()
	return (
		<div className="flex flex-col items-start">
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
			<button
				className="bg-orange-500 text-white px-4 py-2 rounded my-2 hover:bg-orange-600"
				onClick={() => setSelectedSection('transfer')}
			>
				ADD TRANSFER
			</button>
		</div>
	)
}
