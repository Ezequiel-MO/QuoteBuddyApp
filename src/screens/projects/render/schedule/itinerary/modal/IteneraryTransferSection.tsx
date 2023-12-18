import { useEffect } from "react"
import { Icon } from '@iconify/react'
import { useTransfers } from '../../../../add/toProject/transfers/render/context'
import { Button } from '@mui/material'
import { ServiceKey } from 'src/interfaces'

export const IteneraryTransferSection = () => {
	const { state, dispatch,} = useTransfers()
	const { transferEvent } = state

	let transfersRender = transferEvent


	const handleDeletedTransfer = (index: number) => {
		dispatch({
			type: "REMOVE_TRANSFER_EVENT",
			payload: index
		})
	}

	if (transfersRender.length === 0) return null

	return (
		<div className="my-2 bg-slate-400 text-white-0 p-6 rounded-lg shadow-md">
			<ul className="space-y-4">
				{transfersRender.map(({ company, vehicleCapacity, selectedService, ...el }, index) => {
					const serviceKey = selectedService as ServiceKey
					const price = el[serviceKey]
					return (
						<li className="flex justify-between border-b-2 pb-2" key={index}>
							<div className="flex-1 flex justify-start">
								<span className="font-medium text-gray-600">VENDOR:</span>
								<span className="text-gray-800 ml-2">{company}</span>
							</div>
							<div className="flex-1 flex justify-start">
								<span className="font-medium text-gray-600">VEHICLE SIZE:</span>
								<span className="text-gray-800 ml-2">{vehicleCapacity}</span>
							</div>
							<div className="flex-1 flex justify-start">
								<span className="font-medium text-gray-600">
									TYPE OF SERVICE:
								</span>
								<span className="text-gray-800 ml-2">{selectedService}</span>
							</div>
							<div className="flex-1 flex justify-start">
								<span className="font-medium text-gray-600">
									COST:
								</span>
								<span className="text-gray-800 ml-2">{price}</span>
							</div>
							<Button
								onClick={() => handleDeletedTransfer(index)}
							>
								<Icon
									icon="fluent:delete-24-regular"
									color="#ea5933"
									width={20}
								/>
							</Button>
						</li>
					)
				})}
			</ul>
		</div>
	)
}