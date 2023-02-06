import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../../helper/toast'
import {
	useCurrentProject,
	useGetTransferPrices
} from '../../../../../../hooks'
import {
	CityFilter,
	TransferVendorFilter,
	VehicleSizeFilter
} from '../../../../../../ui'
import { TransferLine } from '../../../'

export const AddTransfersOUTToProject = () => {
	const navigate = useNavigate()
	const { state } = useLocation()
	const { addEventToSchedule } = useCurrentProject()
	const [company, setCompany] = useState('')
	const [nrVehicles, setNrVehicles] = useState(1)
	const [assistance, setAssistance] = useState(0)
	const [groupDispatch, setGroupDispatch] = useState(0)
	const [vehicleCapacity, setVehicleCapacity] = useState(0)
	const [city, setCity] = useState('')
	const [transferLines, setTransferLines] = useState([
		/* {
			from: 'Transfer From Hotel',
			units: 2,
			type: '50 Seater Bus',
			total: 2240
		},
		{
			from: '',
			units: 1,
			type: 'Dispatch',
			total: 100
		},
		{
			from: '',
			units: 1,
			type: 'On Board Assist',
			total: 120
		} */
	])

	useEffect(() => {
		if (city && company && vehicleCapacity) {
			setTransferLines([transferLine, assistanceLine, groupDispatchLine])
		}
	}, [city, company, vehicleCapacity])

	const { transferOutPrice, transfer } = useGetTransferPrices(
		city,
		vehicleCapacity,
		company
	)

	const handleSubmit = (e) => {
		e.preventDefault()
		const assistanceNeeded = assistance > 0 || groupDispatch > 0
		const transfer_out = assistanceNeeded
			? {
					...transfer,
					assistance: +assistance,
					meetGreet: +groupDispatch,
					withAssistance: true
					// eslint-disable-next-line no-mixed-spaces-and-tabs
			  }
			: transfer
		for (let i = 0; i < nrVehicles; i++) {
			addEventToSchedule({
				dayOfEvent: state.dayOfEvent,
				timeOfEvent: state.timeOfEvent,
				event: transfer_out
			})
		}

		toast.success('Transfer/s added', toastOptions)
		navigate('/app/project/schedule')
	}

	const transferLine = {
		from: 'Transfer From Hotel',
		units: nrVehicles,
		type: `${vehicleCapacity} Seater Vehicle`,
		total: transferOutPrice * nrVehicles
	}
	const assistanceLine = {
		from: '',
		units: assistance,
		type: 'On Board Assist',
		total: 120 * assistance
	}
	const groupDispatchLine = {
		from: '',
		units: groupDispatch,
		type: 'Dispatch',
		total: 100 * groupDispatch
	}

	const handleClick = () => {
		if (!company || !vehicleCapacity) {
			toast.error('Please select a company and vehicle size', toastOptions)
			return
		}
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
							onChange={(e) => setNrVehicles(e.target.value)}
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
							onChange={(e) => setGroupDispatch(e.target.value)}
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
							onChange={(e) => setAssistance(e.target.value)}
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
				{transferLines.map((line, index) => (
					<div key={index}>
						<TransferLine line={line} />
					</div>
				))}
			</div>
		</div>
	)
}
