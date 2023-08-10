import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TransferListItem from './TransferListItem'
import {
	VehicleSizeFilter,
	CityFilter,
	TransferVendorFilter,
	TransferServiceFilter,
	TableHeaders
} from '../../../ui'

import { useCurrentProject, useGetTransfers } from '../../../hooks'
import { Spinner } from '../../../components/atoms'

const TransferList = () => {
	const navigate = useNavigate()
	const [transfer] = useState({})
	const { currentProject } = useCurrentProject()
	const [city, setCity] = useState(currentProject.groupLocation ?? '')
	const [vehicleCapacity, setVehicleCapacity] = useState(0)
	const [company, setCompany] = useState('')
	const [service, setService] = useState('')
	const { transfers, setTransfers, isLoading } = useGetTransfers(
		city,
		vehicleCapacity,
		company,
		service
	)
	const currentProjectIsLive = Object.keys(currentProject).length !== 0

	return (
		<>
			<div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
				<div className="flex flex-col w-full">
					<h1 className="text-2xl">Transfer List</h1>
					<div className="flex flex-row justify-between">
						<div className="flex-0.5">
							{currentProjectIsLive ? null : (
								<CityFilter setCity={setCity} city={city} />
							)}
							<TransferVendorFilter setCompany={setCompany} city={city} />
							<VehicleSizeFilter
								setVehicleCapacity={setVehicleCapacity}
								vehicleCapacity={vehicleCapacity}
								company={company}
							/>
							<TransferServiceFilter
								transfers={transfers}
								service={service}
								setService={setService}
							/>
						</div>
						<button
							onClick={() =>
								navigate('/app/transfer/specs', { state: { transfer } })
							}
							className="focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded"
						>
							Create New Transfer
						</button>
					</div>
				</div>
			</div>
			<hr />
			<div className="flex-1 m-4 flex-col">
				{isLoading ? (
					<Spinner />
				) : (
					<table className="w-full p-5">
						<TableHeaders headers="transfer" />
						{transfers?.map((transfer) => (
							<TransferListItem
								key={transfer._id}
								transfer={transfer}
								transfers={transfers}
								setTransfers={setTransfers}
							/>
						))}
					</table>
				)}
			</div>
		</>
	)
}

export default TransferList
