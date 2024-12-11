import { FC } from 'react'
import { TransferVendorFilter, VehicleSizeFilter } from '../../../../../../ui'
import { useTransfers } from './context'
import { useGetTransferObject } from '../../../../../../hooks'
import { ADD_TRANSFER_IN, ADD_TRANSFER_OUT } from './actionTypes'

export const VehicleSelection: FC = () => {
	const {
		setSelectedSection,
		city,
		company,
		setCompany,
		vehicleCapacity,
		setVehicleCapacity,
		dispatch,
		typeTransfer
	} = useTransfers()

	const { transferObject } = useGetTransferObject({
		city,
		company,
		vehicleCapacity
	})

	const handleAddTransfer = () => {
		setSelectedSection('transfer')
		if (company === 'none' || vehicleCapacity === '') return
		if (typeTransfer === 'in') {
			dispatch({
				type: ADD_TRANSFER_IN,
				payload: { transferObject }
			})
		}
		if (typeTransfer === 'out') {
			dispatch({
				type: ADD_TRANSFER_OUT,
				payload: { transferObject }
			})
		}
	}

	return (
		<div className="flex flex-col">
			<div className="w-full">
				<TransferVendorFilter
					setCompany={(e) => setCompany(e.target.value)}
					company={company}
					city={city}
				/>
			</div>
			<div className="w-full">
				<VehicleSizeFilter
					company={company}
					city={city}
					vehicleCapacity={vehicleCapacity}
					setVehicleCapacity={(e) => setVehicleCapacity(e.target.value)}
				/>
			</div>
			<div className="w-full">
				<button
					className={`bg-orange-500 text-white-0 px-4 py-2 ml-2 rounded hover:bg-orange-600 ${
						Object.values(transferObject).length === 0
							? 'cursor-not-allowed'
							: ''
					}`}
					onClick={handleAddTransfer}
					disabled={Object.values(transferObject).length === 0}
				>
					ADD TRANSFER
				</button>
			</div>
		</div>
	)
}
