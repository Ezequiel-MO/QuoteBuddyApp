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
		setService,
		dispatch
	} = useTransfers()

	const handleAddTransfer = () => {
		setSelectedSection('transfer')
		if (company === 'none' || vehicleCapacity === '' || service === 'none')
			return
		dispatch({
			type: 'ADD_TRANSFER',
			payload: {
				company,
				vehicleCapacity,
				service
			}
		})
	}
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
				onClick={handleAddTransfer}
			>
				ADD TRANSFER
			</button>
		</div>
	)
}
