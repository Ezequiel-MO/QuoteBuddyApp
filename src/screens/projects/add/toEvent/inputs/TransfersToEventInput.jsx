import { useState } from 'react'
import { useCurrentProject, useGetTransfers } from '../../../../../hooks'
import {
	TransferServiceFilter,
	TransferVendorFilter,
	VehicleSizeFilter
} from '../../../../../ui'
import { AssistanceCostInput } from './AssistanceCostInput'
import { NumberOfVehiclesInput } from './NumberOfVehiclesInput'
import { RenderVehicleCost } from '../render/RenderVehicleCost'

export const TransfersToEventInput = ({
	company,
	setCompany,
	vehicleCapacity,
	setVehicleCapacity,
	service,
	setService,
	nrVehicles,
	setNrVehicles,
	assistance,
	setAssistance,
	selectedServicePrice
}) => {
	const { currentProject } = useCurrentProject()
	const [city] = useState(currentProject.groupLocation || 'Barcelona')
	const { transfers } = useGetTransfers(city, vehicleCapacity, company)

	return (
		<div>
			<RenderVehicleCost
				nrVehicles={nrVehicles}
				vehicleCapacity={vehicleCapacity}
				selectedServicePrice={selectedServicePrice}
			/>
			<div>
				<TransferVendorFilter
					setCompany={setCompany}
					company={company}
					city={city}
				/>
				<VehicleSizeFilter
					company={company}
					vehicleCapacity={vehicleCapacity}
					setVehicleCapacity={setVehicleCapacity}
				/>
				<TransferServiceFilter
					transfers={transfers}
					service={service}
					setService={setService}
				/>
				<NumberOfVehiclesInput
					nrVehicles={nrVehicles}
					setNrVehicles={setNrVehicles}
				/>
				<AssistanceCostInput
					assistance={assistance}
					setAssistance={setAssistance}
				/>
			</div>
		</div>
	)
}
