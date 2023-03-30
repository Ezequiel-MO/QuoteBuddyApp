import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../../../helper/toast'
import {
	useCurrentProject,
	useGetTransferPrices,
	useTransfersOut,
	useGetTransfers
} from '../../../../../../../hooks'
import { AddTransfersOutFormFields } from './AddTransfersOutFormFields'
import {
	useTransferSettings,
	handleTransferChange,
	TransferForm,
	TransferLines,
	useTransferHandler
} from '../'

export const AddTransfersOUTToProject = () => {
	const navigate = useNavigate()
	const { state } = useLocation()
	const {
		addEventToSchedule,
		meetGreetOrDispatch,
		assistance,
		removeMeetGreetOrDispatch,
		removeAssistance
	} = useCurrentProject()
	const {
		addTransfersOut,
		updateTransferOut,
		removeTransferLine,
		addUpdateExtraLines,
		transfersOut
	} = useTransfersOut()
	const {
		company,
		setCompany,
		vehicleCapacity,
		setVehicleCapacity,
		city,
		setCity,
		data,
		setData
	} = useTransferSettings('out')
	const [idCompany, setIdCompany] = useState(1)

	const { transfers } = useGetTransfers(city, vehicleCapacity, company)

	const { transferOutPrice } = useGetTransferPrices(
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
		transferType: transfersOut,
		addTransfers: addTransfersOut,
		data,
		setData,
		idCompany,
		setIdCompany,
		transfers,
		transferPrice: transferOutPrice,
		updateTransfer: updateTransferOut,
		addUpdateExtraLines,
		removeTransferLine,
		setCompany,
		setVehicleCapacity,
		assistance: assistance[0] || {},
		meetGreetOrDispatch: meetGreetOrDispatch[0] || {}
	})

	const handleSubmit = (e) => {
		e.preventDefault()
		addEventToSchedule({
			dayOfEvent: state.dayOfEvent,
			timeOfEvent: state.timeOfEvent,
			event: transfersOut
		})
		toast.success('Transfer/s added', toastOptions)
		navigate('/app/project/schedule')
	}

	return (
		<div className="flex justify-start items-start p-8">
			<TransferForm onSubmit={handleSubmit}>
				<AddTransfersOutFormFields
					city={city}
					setCity={setCity}
					company={company}
					setCompany={setCompany}
					vehicleCapacity={vehicleCapacity}
					setVehicleCapacity={setVehicleCapacity}
					data={data}
					handleChange={(event) => handleTransferChange(event, data, setData)}
					handleClick={() => handleClickAdd('out')}
					meetGreetOrDispatch={meetGreetOrDispatch}
					assistance={assistance}
					state={state}
					removeMeetGreetOrDispatch={removeMeetGreetOrDispatch}
					removeAssistance={removeAssistance}
				/>
			</TransferForm>
			<TransferLines
				transfersType={transfersOut}
				removeTransferLine={removeTransferLine}
			/>
		</div>
	)
}
