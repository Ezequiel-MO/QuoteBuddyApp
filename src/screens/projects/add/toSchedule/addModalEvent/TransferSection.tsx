import { useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useTransfers } from '../../toProject/transfers/render/context'
import { ServiceKey } from '../../../../../interfaces'

export const TransferSection = () => {
	const { state, dispatch, event } = useTransfers()
	const { transferEvent } = state

	let transfersRender = transferEvent

	useEffect(() => {
		if (event?.transfer && event.transfer.length > 0) {
			dispatch({
				type: 'UPDATE_TRANSFER_EVENT',
				payload: event.transfer
			})
		}
	}, [event])

	const handleDeletedTransfer = (index: number) => {
		dispatch({
			type: 'REMOVE_TRANSFER_EVENT',
			payload: index
		})
	}

	if (transfersRender.length === 0) return null

	return (
		<div className="my-4 bg-gray-750 p-4 rounded-lg shadow-md">
			<h3 className="text-sm font-medium text-gray-300 mb-2">Transfers</h3>
			<ul className="space-y-2">
				{transfersRender.map(
					({ company, vehicleCapacity, selectedService, ...el }, index) => {
						const serviceKey = selectedService as ServiceKey
						const price = el[serviceKey]
						return (
							<li
								key={index}
								className="flex justify-between items-center bg-gray-800 p-2 rounded"
							>
								<div className="text-sm text-white-0">
									<span>{company}</span> | <span>{vehicleCapacity} Seater</span>{' '}
									| <span>{selectedService}</span> | <span>€{price}</span>
								</div>
								<button
									onClick={() => handleDeletedTransfer(index)}
									className="text-red-500 hover:text-red-700 transition-colors duration-200"
								>
									<Icon icon="fluent:delete-24-regular" width={20} />
								</button>
							</li>
						)
					}
				)}
			</ul>
		</div>
	)
}
