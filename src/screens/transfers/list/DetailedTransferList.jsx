import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import baseAPI from '../../../axios/axiosConfig'
import { formatMoney } from '../../../helper'
import { selectCurrentProject } from '../../../redux/features/CurrentProjectSlice'
import {
	selectTransferCompanies,
	SET_TRANSFER_COMPANIES
} from '../../../redux/features/TransferCompaniesSlice'

const DetailedTransferList = ({ handleAddTransfer }) => {
	const dispatch = useDispatch()
	const [city, setCity] = useState('')
	const [vehicleCapacity, setVehicleCapacity] = useState(null)
	const [transfers, setTransfers] = useState([])
	const [nrVehicles, setNrVehicles] = useState(0)
	const [selectedCompany, setSelectedCompany] = useState('')
	const [selectedService, setSelectedService] = useState('')
	const currentProject = useSelector(selectCurrentProject)
	const currentProjectIsLive = Object.keys(currentProject).length !== 0

	const companies = useSelector(selectTransferCompanies)

	useEffect(() => {
		const getCompanies = async () => {
			try {
				const response = await baseAPI.get(`transfers?city=${city}`)
				const companiesArr = response.data.data.data.map(
					(transfer) => transfer.company
				)
				const uniqueCompanies = [...new Set(companiesArr)]
				localStorage.setItem('uniqueCompanies', JSON.stringify(uniqueCompanies))
				dispatch(SET_TRANSFER_COMPANIES(uniqueCompanies))
			} catch (error) {
				console.log(error)
			}
		}

		getCompanies()
	}, [city, dispatch])

	useEffect(() => {
		if (currentProjectIsLive) {
			const { groupLocation } = currentProject
			setCity(groupLocation)
		}
	}, [currentProject, currentProjectIsLive])

	useEffect(() => {
		const getTransferList = async () => {
			try {
				const response = await baseAPI.get(
					`transfers?city=${city}&vehicleCapacity=${vehicleCapacity}&company=${selectedCompany}`
				)
				setTransfers(response.data.data.data) //
			} catch (error) {
				console.log(error)
			}
		}

		if (city && vehicleCapacity && selectedCompany) {
			getTransferList()
		}
	}, [city, vehicleCapacity, selectedCompany])

	const transferList = transfers.map((transfer) => (
		<tr key={transfer._id}>
			<td>{transfer.company}</td>
			<td>{transfer.vehicleType}</td>
			<td>{transfer.vehicleCapacity}</td>
			<td>{formatMoney(transfer[selectedService])}</td>
			<td>
				<input
					type="number"
					className="w-10 mr-2 px-2"
					placeholder="1"
					value={nrVehicles}
					onChange={(e) => setNrVehicles(e.target.value)}
				/>
			</td>
			<td
				onClick={() => handleAddTransfer(transfer, selectedService, nrVehicles)}
			>
				<Icon icon="ic:twotone-add-circle" color="#ea5933" width="25" />
			</td>
		</tr>
	))

	return (
		<>
			<h1 className="text-2xl mb-4 indent-8">Add Transfer to an Event ? </h1>
			<div className="container grid grid-cols-4 gap-4 my-4">
				<form className="text-orange-50">
					<div className="block relative w-64">
						<label htmlFor="company">Filter by Local Vendor:</label>
						<select
							name="company"
							id="company"
							className="block cursor-pointer w-full bg-white-100 border border-gray-400 hover:border-gray-50 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
							onChange={(e) => setSelectedCompany(e.target.value)}
						>
							<option value="">Select Preferred vendor</option>
							{companies?.map((company) => (
								<option key={company} value={company}>
									{company}
								</option>
							))}
						</select>
					</div>
					<div className="block relative w-64">
						<label htmlFor="vehicleCapacity">Filter by Vehicle Size:</label>
						<select
							name="vehicleCapacity"
							id="vehicleCapacity"
							className="block cursor-pointer w-full bg-white-100 border border-gray-400 hover:border-gray-50 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
							onChange={(e) => setVehicleCapacity(parseInt(e.target.value))}
						>
							<option value="">Choose type of Vehicle</option>
							<option value={3}>3-seat Mercedes</option>
							<option value={20}>Mini Bus</option>
							<option value={30}>30-seater Bus</option>
							<option value={50}>50-seater Bus</option>
							<option value={70}>70-seater Bus</option>
						</select>
					</div>
					<div className="block relative w-64">
						<label htmlFor="vehicleCapacity">Choose Type of service:</label>
						<select
							name="vehicleCapacity"
							id="vehicleCapacity"
							className="block cursor-pointer w-full bg-white-100 border border-gray-400 hover:border-gray-50 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
							onChange={(e) => setSelectedService(e.target.value)}
						>
							<option value="">Choose type of Service</option>
							<option value="transfer_in_out">Transfer In/Out Airport</option>
							<option value="dispo_4h">4h At Disposal</option>
							<option value="hextra">Extra Hour</option>
							<option value="hextra_night">Extra Hour Night</option>
							<option value="dispo_5h_out">5h At Disposal Outside City</option>
							<option value="dispo_4h_airport">
								4h Dispo start/end at Airport
							</option>
							<option value="dispo_4h_night">4h At Disposal Night</option>
							<option value="transfer_in_out_night">
								Transfer In/Out Airport Night
							</option>
							<option value="dispo_6h_night">6h Dispo Night</option>
						</select>
					</div>
				</form>
				<table className="table-auto col-span-3">
					<thead className="bg-gray-50 border-b text-left">
						<tr>
							<th>Company</th>
							<th>Vehicle Type</th>
							<th>Vehicle Capacity</th>
							<th>Cost of service</th>
							<th>Add To Project</th>
						</tr>
					</thead>
					<tbody className="text-white-50">{transferList}</tbody>
				</table>
			</div>
		</>
	)
}

export default DetailedTransferList
