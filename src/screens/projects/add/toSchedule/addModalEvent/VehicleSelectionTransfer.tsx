import { FC } from 'react'
import { TransferVendorFilter, VehicleSizeFilter } from '../../../../../ui'
import { useTransfers } from '../../toProject/transfers/render/context'
import { useGetTransferPrices } from '../../../../../hooks'
import { TransferServiceFilter } from "../../../../../ui"
import { ITransfer } from '../../../../../interfaces'

type TransferPrices = {
	transfer: any,
	selectedServicePrice: number
}

export const VehicleSelectionTransfer: FC = () => {
	const {
		city,
		company,
		setCompany,
		vehicleCapacity,
		setVehicleCapacity,
		service,
		setService,
		dispatch
	} = useTransfers()

	const { transfer, selectedServicePrice }: TransferPrices = useGetTransferPrices({ city, company, vehicleCapacity, service })

	const handleAddTransfer = () => {
		if (company === 'none' || vehicleCapacity === '' || service === "") return
		const addTransfer: ITransfer = { ...transfer, selectedService: service }
		dispatch({
			type: 'ADD_TRANSFER_EVENT',
			payload: addTransfer
		})
	}
	return (
		<div className="">
			<TransferVendorFilter
				setCompany={(e)=>setCompany(e.target.value)}
				company={company}
				city={city}
			/>
			<VehicleSizeFilter
				company={company}
				city={city}
				vehicleCapacity={vehicleCapacity}
				setVehicleCapacity={(e)=>setVehicleCapacity(e.target.value)}
			/>
			<TransferServiceFilter
				city={city}
				vehicleCapacity={vehicleCapacity}
				company={company}
				service={service}
				setService={(e)=>setService(e.target.value)}
				allServices={false}
			/>

			<button
				className="bg-orange-500 text-white px-4 py-2 rounded my-2 hover:bg-orange-600"
				style={Object.values(transfer).length === 0 || !service ? { cursor: "not-allowed" } : {}}
				onClick={handleAddTransfer}
				disabled={Object.values(transfer).length === 0}
			>
				ADD TRANSFER
			</button>
		</div>
	)
}
