import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../../../helper/toast'
import {
	useCurrentProject,
	useGetTransferPrices,
	useTransfersIn,
	useGetTransfers
} from '../../../../../../../hooks'

import {
	TransferForm,
	TransferLines,
	useTransferSettings,
	handleTransferChange,
	useTransferHandler
} from '../'
import { AddTransfersINFormFields } from './AddTransfersINFormFields'

export const AddTransfersINToProject = () => {
	const navigate = useNavigate()
	const { state } = useLocation()
	const {
		meetGreetOrDispatch,
		assistance,
		removeMeetGreetOrDispatch,
		removeAssistance,
		addTransferInOrTransferOutSchedule
	} = useCurrentProject()
	const {
		addTransfersIn,
		updateTransferIn,
		removeTransferLine,
		addUpdateExtraLines,
		transfersIn
	} = useTransfersIn()

	const {
		company,
		setCompany,
		vehicleCapacity,
		setVehicleCapacity,
		city,
		setCity,
		data,
		setData
	} = useTransferSettings('in')
	const [idCompany, setIdCompany] = useState(1)
	const { transfers } = useGetTransfers(city, vehicleCapacity, company)

	const { transferInPrice } = useGetTransferPrices(
		city,
		vehicleCapacity,
		company
	)

	if (company === 'none') {
		setCompany(undefined)
	}
	if (city === 'none') {
		setCity(undefined)
	}

	const { handleClickAdd } = useTransferHandler({
		city,
		company,
		vehicleCapacity,
		transferType: transfersIn,
		addTransfers: addTransfersIn,
		data,
		setData,
		idCompany,
		setIdCompany,
		transfers,
		transferPrice: transferInPrice,
		updateTransfer: updateTransferIn,
		addUpdateExtraLines,
		removeTransferLine,
		setCompany,
		setVehicleCapacity,
		assistance: assistance[0] || {},
		meetGreetOrDispatch: meetGreetOrDispatch[0] || {}
	})

	const handleSubmit = (event) => {
		event.preventDefault()
		addTransferInOrTransferOutSchedule({
			dayOfEvent: state.dayOfEvent,
			timeOfEvent: state.timeOfEvent,
			event: transfersIn
		})
		toast.success('Transfer/s added', toastOptions)
		navigate('/app/project/schedule')
	}

	return (
		<div className="flex justify-start items-start p-8">
			<TransferForm onSubmit={handleSubmit}>
				<AddTransfersINFormFields
					city={city}
					setCity={setCity}
					company={company}
					setCompany={setCompany}
					vehicleCapacity={vehicleCapacity}
					setVehicleCapacity={setVehicleCapacity}
					data={data}
					handleChange={(event) => handleTransferChange(event, data, setData)}
					handleClick={() => handleClickAdd('in')}
					meetGreetOrDispatch={meetGreetOrDispatch}
					assistance={assistance}
					state={state}
					removeMeetGreetOrDispatch={removeMeetGreetOrDispatch}
					removeAssistance={removeAssistance}
				/>
			</TransferForm>
			<TransferLines
				transfersType={transfersIn}
				removeTransferLine={removeTransferLine}
			/>
		</div>
	)
}
