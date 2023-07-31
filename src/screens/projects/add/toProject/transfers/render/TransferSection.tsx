import { Icon } from '@iconify/react'
import { useTransfers } from './context'
import { Button } from '@mui/material'

export const TransferSection = () => {
	const { state, dispatch } = useTransfers()
	const { transfers } = state

	return (
		<div className="bg-white-100 p-6 rounded-lg shadow-md">
			<ul className="space-y-4">
				{transfers.map(({ company, vehicleCapacity, service }, index) => (
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
							<span className="text-gray-800 ml-2">{service}</span>
						</div>
						<Button
							onClick={() =>
								dispatch({
									type: 'REMOVE_TRANSFER',
									payload: index
								})
							}
						>
							<Icon
								icon="fluent:delete-24-regular"
								color="#ea5933"
								width={20}
							/>
						</Button>
					</li>
				))}
			</ul>
		</div>
	)
}
