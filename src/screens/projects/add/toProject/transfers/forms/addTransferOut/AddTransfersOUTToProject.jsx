import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../../../helper/toast'
import {
	useCurrentProject,
	useGetTransferPrices,
	useTransfersOut,
	useGetTransfers,
	useLocalStorage
} from '../../../../../../../hooks'
import { TransferLinesRender } from '../../render/TransferLine'
import { handleClick } from "./handleClick"
import { AddTransfersOutFormFields } from "./AddTransfersOutFormFields"

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
	const [company, setCompany] = useLocalStorage('company', '')
	const [vehicleCapacity, setVehicleCapacity] = useLocalStorage('vehicleCapacity', 0)
	const [city, setCity] = useLocalStorage('city', '')
	const [data, setData] = useLocalStorage('dataTransferOut', {
		nrVehicles: 1,
		groupDispatch: Number(),
		assistance: Number()
	})
	const [idCompany, setIdCompany] = useState(1)

	const { transfers, isLoading } = useGetTransfers(
		city,
		vehicleCapacity,
		company,
	)

	const { transferOutPrice, } = useGetTransferPrices(
		city,
		vehicleCapacity,
		company
	)



	if (company === "none") {
		setCompany(undefined)
	}
	if (city === "none") {
		setCity(undefined)
	}

	const handleChange = (event) => {
		if (!isNaN(event.target.value)) {
			setData({
				...data,
				[event.target.name]: Number(event.target.value)
			})
		}
	}

	const handleClickAdd = () => {
		handleClick({
			city,
			company,
			vehicleCapacity,
			transfersOut,
			addTransfersOut,
			data,
			setData,
			idCompany,
			setIdCompany,
			transfers,
			transferOutPrice,
			updateTransferOut,
			addUpdateExtraLines,
			removeTransferLine,
			setCompany,
			setVehicleCapacity,
			assistance: assistance[0] || {},
			meetGreetOrDispatch: meetGreetOrDispatch[0] || {}
		})
	}

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
			<form onSubmit={handleSubmit} className="flex flex-col">
				<AddTransfersOutFormFields
					city={city}
					setCity={setCity}
					company={company}
					setCompany={setCompany}
					vehicleCapacity={vehicleCapacity}
					setVehicleCapacity={setVehicleCapacity}
					data={data}
					handleChange={handleChange}
					handleClick={handleClickAdd}
					meetGreetOrDispatch={meetGreetOrDispatch}
					assistance={assistance}
					state={state}
					removeMeetGreetOrDispatch={removeMeetGreetOrDispatch}
					removeAssistance={removeAssistance}
				/>
			</form>
			<div className="ml-5">
				<TransferLinesRender
					transfersType={transfersOut}
					removeTransferLine={removeTransferLine}
				/>
			</div>
		</div>
	)
}
