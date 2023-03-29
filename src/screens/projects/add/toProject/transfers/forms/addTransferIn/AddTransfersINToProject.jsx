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
import { TransferLinesRender } from "../../render/TransferLine"
import { AddTransfersINFormFields } from "./AddTransfersINFormFields"
import { handleClick } from "./handleClick"


export const AddTransfersINToProject = () => {
	const navigate = useNavigate()
	const { state } = useLocation()
	const { addEventToSchedule, meetGreetOrDispatch  , assistance } = useCurrentProject()
	const {
		addTransfersIn,
		updateTransferIn,
		removeTransferLine,
		addUpdateExtraLines,
		transfersIn
	} = useTransfersIn()
	const [data, setData] = useState({
		nrVehicles: 1,
		meetGreet: Number(),
		assistance: Number(),
	})
	const [company, setCompany] = useState("")
	const [vehicleCapacity, setVehicleCapacity] = useState(0)
	const [city, setCity] = useState('')
	const [idCompany, setIdCompany] = useState(1)
	const { transfers, isLoading } = useGetTransfers(
		city,
		vehicleCapacity,
		company,
	)

	const { transferInPrice } = useGetTransferPrices(city, vehicleCapacity, company)

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
	

	const handleClickadd = () => {
		handleClick({
			city,
			company,
			vehicleCapacity,
			transfersIn,
			addTransfersIn,
			data,
			setData,
			idCompany,
			setIdCompany,
			transfers,
			transferInPrice,
			updateTransferIn,
			addUpdateExtraLines,
			removeTransferLine,
			setCompany,
			setVehicleCapacity,
			assistance:assistance[0] || {},
			meetGreetOrDispatch: meetGreetOrDispatch[0] || {} ,
		})
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		addEventToSchedule({
			dayOfEvent: state.dayOfEvent,
			timeOfEvent: state.timeOfEvent,
			event: transfersIn
		})
		toast.success('Transfer/s added', toastOptions)
		navigate('/app/project/schedule')
	}


	return (
		<div className="flex justify-start items-start p-8">
			<form onSubmit={event => handleSubmit(event)} className="flex flex-col">
				<AddTransfersINFormFields
					city={city}
					setCity={setCity}
					company={company}
					setCompany={setCompany}
					vehicleCapacity={vehicleCapacity}
					setVehicleCapacity={setVehicleCapacity}
					data={data}
					handleChange={handleChange}
					handleClick={handleClickadd}
					meetGreetOrDispatch={meetGreetOrDispatch}
					assistance={assistance}
					state={state}
				/>
			</form>
			<div className="ml-5">
				<TransferLinesRender
					transfersType={transfersIn}
					removeTransferLine={removeTransferLine}
				/>
			</div>
		</div>
	)
}
