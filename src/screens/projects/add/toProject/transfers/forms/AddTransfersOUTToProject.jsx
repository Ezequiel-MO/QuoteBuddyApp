import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../../helper/toast'
import {
	useCurrentProject,
	useGetTransferPrices,
	useTransfers,
	useGetTransfers
} from '../../../../../../hooks'
import {
	CityFilter,
	TransferVendorFilter,
	VehicleSizeFilter
} from '../../../../../../ui'
import { TransferLinesRender } from '../render/TransferLine'

export const AddTransfersOUTToProject = () => {
	const navigate = useNavigate()
	const { state } = useLocation()
	const { addEventToSchedule } = useCurrentProject()
	const {
		addTransfersOut,
		updateTransferOut,
		removeTransferLine,
		addUpdateExtraLines,
		transfersOut
	} = useTransfers()
	const [company, setCompany] = useState('')
	const [nrVehicles, setNrVehicles] = useState(1)
	const [assistance, setAssistance] = useState(0)
	const [groupDispatch, setGroupDispatch] = useState(0)
	const [vehicleCapacity, setVehicleCapacity] = useState(0)
	const [city, setCity] = useState('')
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

	if (company === "none") {
		setCompany(undefined)
	}
	if (city === "none") {
		setCity(undefined)
	}

	const handleClick = () => {
		if (!city || !company || !vehicleCapacity || nrVehicles < 1) {
			toast.info(
				"If you want to add transfer please select city, company, vehicle size and number of vehicles",
				toastOptions
			)
			// return
		}
		if (transfersOut.length === 0 && city && company && Number(vehicleCapacity) && nrVehicles > 0) {
			setIdCompany(idCompany + 1)
			addTransfersOut({
				//render "TransferLinesRender"
				from: 'From Hotel',
				units: Number(nrVehicles),
				type: 'Transfer Out',
				total: Number(nrVehicles) * transferOutPrice,
				idCompany: idCompany,
				//model transfer
				company: company,
				vehicleCapacity,
				nrVehicles: Number(nrVehicles),
				transfer_out: Number(nrVehicles) * transferOutPrice,
				vehicleType: transfers[0].vehicleType
			})
		} else {
			const transferOutObjects = transfersOut.filter(
				(transfer) => transfer.type === 'Transfer Out'
			)
			const found = transferOutObjects.find(
				(transfer) => transfer.vehicleCapacity === vehicleCapacity &&
					transfer.company === company
			)
			if (found) {
				updateTransferOut({
					//render "TransferLinesRender"
					units: Number(nrVehicles),
					type: 'Transfer Out',
					total: Number(nrVehicles) * transferOutPrice,
					//model transfer
					company: company,
					vehicleCapacity,
					nrVehicles: Number(nrVehicles),
					transfer_out: Number(nrVehicles) * transferOutPrice,
				})
			} else if (!found && transfersOut.length > 0 && city && company && Number(vehicleCapacity) && nrVehicles > 0) {
				setIdCompany(idCompany + 1)
				addTransfersOut({
					//render "TransferLinesRender"
					from: 'From Hotel',
					units: Number(nrVehicles),
					type: 'Transfer Out',
					total: Number(nrVehicles) * transferOutPrice,
					idCompany: idCompany,
					//model transfer
					nrVehicles: Number(nrVehicles),
					vehicleCapacity,
					transfer_out: Number(nrVehicles) * transferOutPrice,
					company: company,
					vehicleType: transfers[0].vehicleType
				})
			}
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
		if (Number(groupDispatch) > 0) {
			addUpdateExtraLines({
				//render "TransferLinesRender"
				units: groupDispatch,
				type: 'Group Dispatch',
				total: groupDispatch * 233,
				idCompany: idCompany + "G",
				//model transfer
				company: "CUTT/events",
				meetGreet: groupDispatch,
				meetGreetCost: groupDispatch * 233
			})
		} else {
			removeTransferLine({
				type: 'Group Dispatch'
			})
		}

		setNrVehicles(1)
		setCompany('')
		setVehicleCapacity(0)
	}


	return (
		<div className="flex justify-start items-start p-8">
			<form onSubmit={handleSubmit} className="flex flex-col">
				<div className="flex flex-col items-start">
					<CityFilter setCity={setCity} city={city} />
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
							Group Dispatch (if any)
						</label>
						<input
							type="number"
							name="groupDispatch"
							value={groupDispatch}
							onChange={(e) => setGroupDispatch(Number(e.target.value))}
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
						className="text-white-0 mt-5 border border-white-0 p-3 rounded-xl cursor-pointer w-60"
					>
						Add type of transfer +{' '}
					</button>
					<input
						className="text-white-0 mt-5 border border-white-0 p-3 rounded-xl cursor-pointer w-60"
						type="submit"
						value="Submit choices"
					/>
				</div>
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
