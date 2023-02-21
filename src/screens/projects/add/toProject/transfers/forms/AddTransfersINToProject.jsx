import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../../helper/toast'
import {
	useCurrentProject,
	useGetTransferPrices,
	useTransfersIn,
	useGetTransfers
} from '../../../../../../hooks'
import {
	CityFilter,
	TransferVendorFilter,
	VehicleSizeFilter
} from '../../../../../../ui'
import { TransferLinesRender } from "../render/TransferLine"

export const AddTransfersINToProject = () => {
	const navigate = useNavigate()
	const { state } = useLocation()
	const { addEventToSchedule } = useCurrentProject()
	const {
		addTransfersIn,
		updateTransferIn,
		removeTransferLine,
		addUpdateExtraLines,
		transfersIn
	} = useTransfersIn()
	const [company, setCompany] = useState("")
	const [nrVehicles, setNrVehicles] = useState(1)
	const [assistance, setAssistance] = useState(0)
	const [meetGreet, setMeetGreet] = useState(0)
	const [vehicleCapacity, setVehicleCapacity] = useState(0)
	const [city, setCity] = useState('')
	const [idCompany , setIdCompany] = useState(1)
	const { transfers, isLoading } = useGetTransfers(
		city,
		vehicleCapacity,
		company,
	)

	const { transferInPrice} = useGetTransferPrices(city, vehicleCapacity, company)


	const handleClick = () => {
		console.log(transfersIn)
		if (!city || !company || !vehicleCapacity || nrVehicles < 1) {
			return toast.error(
				'Please select city, company ,vehicle size and number of vehicles',
				toastOptions
			)
		}
		if (transfersIn.length === 0) {
			setIdCompany(idCompany + 1 )
			addTransfersIn({
				//render "TransferLinesRender"
				from: 'From Airport',
				type: 'Transfer in',
				units: Number(nrVehicles),
				total: Number(nrVehicles) * transferInPrice,
				idCompany: idCompany,
				//model transfer
				company: company,
				vehicleCapacity,
				nrVehicles: Number(nrVehicles),
				transfer_in: Number(nrVehicles) * transferInPrice,
				vehicleType: transfers[0].vehicleType
			})
		}
		const transferInObjects = transfersIn.filter(
			el => el.type === "Transfer in"
		)
		const found = transferInObjects.find(
			el => el.vehicleCapacity === vehicleCapacity &&
				el.company === company
		)
		if (found) {
			updateTransferIn({
				//render "TransferLinesRender"
				type: "Transfer in",
				units: Number(nrVehicles),
				total: Number(nrVehicles) * transferInPrice,
				//model transfer
				company: company,
				vehicleCapacity,
				nrVehicles: Number(nrVehicles),
				transfer_in: Number(nrVehicles) * transferInPrice,
			})
		}
		if (!found && transfersIn.length > 0) {
			setIdCompany(idCompany + 1)
			addTransfersIn({
				//render "TransferLinesRender"
				from: 'From Airport',
				type: 'Transfer in',
				units: Number(nrVehicles),
				total: Number(nrVehicles) * transferInPrice,
				idCompany: idCompany,
				//model transfer
				nrVehicles: Number(nrVehicles),
				vehicleCapacity,
				transfer_in: Number(nrVehicles) * transferInPrice,
				company: company,
				vehicleType: transfers[0].vehicleType
			})
		}
		if (Number(assistance) > 0) {
			addUpdateExtraLines({
				//render "TransferLinesRender"
				units: assistance,
				type: 'Assistance',
				total: assistance * 224,
				idCompany: idCompany + "A",
				//model transfer
				company: "CUTT/events",
				assistance, 
				assistanceCost: assistance * 224
			})
		} else {
			removeTransferLine({
				type: 'Assistance'
			})
		}
		if (Number(meetGreet) > 0) {
			addUpdateExtraLines({
				//render "TransferLinesRender"
				units: meetGreet,
				type: 'Meet&Greet',
				total: meetGreet * 233,
				idCompany:idCompany+"M",
				//model transfer
				company: "CUTT/events",
				meetGreet,
				meetGreetCost: meetGreet * 233
			})
		} else {
			removeTransferLine({
				type: 'Meet&Greet'
			})
		}
		setNrVehicles(1)
		setCompany('')
		setVehicleCapacity(0)
	}



	const handleSubmit = (event) => {
		event.preventDefault()
		console.log(transfersIn)
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
			<form  onSubmit={event=> handleSubmit(event) } className="flex flex-col">
				<div className="flex flex-col items-start">
					<CityFilter setCity={setCity} city={city} />
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
					<div className="flex justify-between items-center w-60">
						<label className="text-xl text-gray-100" htmlFor="nrVehicles">
							Number of Vehicles{' '}
						</label>
						<input
							type="number"
							name="nrVehicles"
							value={nrVehicles}
							onChange={(e) => setNrVehicles(Number(e.target.value))}
							className="px-2 py-1 border-0 rounded-xl bg-green-50 text-center cursor-pointer w-20"
						/>
					</div>
					<div className="flex justify-between items-center w-60 mt-2">
						<label className="text-xl text-gray-100" htmlFor="groupDispatch">
							<p style={{ fontSize: "19px" }}>Meet&Greet cost (if any)</p>
						</label>
						<input
							type="number"
							name="meetGreet"
							value={meetGreet}
							onChange={(e) => setMeetGreet(Number(e.target.value))}
							className="px-2 py-1 border-0 rounded-xl bg-green-50 text-center cursor-pointer w-20"
						/>
					</div>
					<div className="flex justify-between items-center w-60 mt-2">
						<label className="text-xl text-gray-100" htmlFor="assistance">
							Transfer Assist cost
						</label>
						<input
							type="number"
							name="assistance"
							value={assistance}
							onChange={(e) => setAssistance(Number(e.target.value))}
							className="px-2 py-1 border-0 rounded-xl bg-green-50 text-center cursor-pointer w-20"
						/>
					</div>
					<button
						onClick={handleClick}
						type="button"
						className="text-white-0 mt-5 border border-white-0 p-3 rounded-xl cursor-pointer w-60 hover:bg-green-700 "
					>
						Add type of transfer +{' '}
					</button>
					<input
						className="text-white-0 mt-5 border border-white-0 p-3 rounded-xl cursor-pointer w-60 hover:bg-red-700"
						type="submit"
						value="Submit choices"
					/>
				</div>
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
