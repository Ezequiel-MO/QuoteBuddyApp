import { FC } from 'react'
import { TransferVendorFilter, VehicleSizeFilter } from '../../../../../../ui'
import { useTransfers } from './context'
import { useGetTransferObject } from '../../../../../../hooks'

export const VehicleSelection: FC = () => {
	const {
		setSelectedSection,
		city,
		company,
		setCompany,
		vehicleCapacity,
		setVehicleCapacity,
		dispatch
	} = useTransfers()

	const { transferObject } = useGetTransferObject({
		city,
		company,
		vehicleCapacity
	})

	const handleAddTransfer = () => {
		setSelectedSection('transfer')
		if (company === 'none' || vehicleCapacity === '') return
		dispatch({
			type: 'ADD_TRANSFER',
			payload: { transferObject }
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

			<button
				className="bg-orange-500 text-white px-4 py-2 rounded my-2 hover:bg-orange-600"
				onClick={handleAddTransfer}
			>
				ADD TRANSFER
			</button>
		</div>
	)
}
