import { useState } from 'react'
import { useGetTransferPrices, useCurrentProject } from '../../../../../hooks'
import { TransfersToEventInput } from './TransfersToEventInput'
import { Button } from '../../../../../ui'

export const EventTransfersForm = ({ handleAddTransfer }) => {
	const [company, setCompany] = useState('none')
	const [vehicleCapacity, setVehicleCapacity] = useState(0)
	const { currentProject } = useCurrentProject()
	const { groupLocation } = currentProject
	const [service, setService] = useState('')
	const [nrVehicles, setNrVehicles] = useState(1)
	const [assistance, setAssistance] = useState(0)
	const [city] = useState(groupLocation || 'Barcelona')

	const { transfer, selectedServicePrice } = useGetTransferPrices(
		city,
		vehicleCapacity,
		company,
		service
	)

	const handleSubmit = (e) => {
		e.preventDefault()
		const assistanceIsNeeded = assistance > 0
		const transferObj = assistanceIsNeeded
			? {
					...transfer,
					assistance: +assistance,
					withAssistance: true
					// eslint-disable-next-line no-mixed-spaces-and-tabs
			  }
			: transfer

		handleAddTransfer(transferObj, service, nrVehicles)
	}

	const AddTransfersToEventProps = {
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
	}

	return (
		<div className="flex flex-col justify-center items-center">
			<h1 className="text-2xl mb-4">Add Transfer to an Event ? </h1>
			<form onSubmit={handleSubmit} className="flex flex-col items-center">
				<div className="w-full sm:w-1/2 flex flex-col">
					<div className="flex flex-col">
						<TransfersToEventInput {...AddTransfersToEventProps} />
					</div>
				</div>

				<Button type="submit">Add Transfer</Button>
			</form>
		</div>
	)
}
