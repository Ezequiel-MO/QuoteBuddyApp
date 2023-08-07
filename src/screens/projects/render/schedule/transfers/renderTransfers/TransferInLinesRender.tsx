import { FC } from 'react'
import { ITransfer } from '../../../../../../interfaces'

interface Props {
	transfersIn: ITransfer[]
}

export const TransferInLinesRender: FC<Props> = ({ transfersIn }) => {
	return (
		<div className="bg-slate-700 p-4 rounded-lg shadow-md max-w-[600px] text-white-0">
			<div className="grid grid-cols-3 text-white font-semibold border-b-2 border-white">
				<div>Vehicle Capacity</div>
				<div>Vehicle Type</div>
				<div>Transfer In</div>
			</div>
			{transfersIn.map((transfer, index) => (
				<div
					key={transfer._id}
					className="grid grid-cols-3 text-white p-2 border-b border-white"
				>
					<div>{`${transfer.vehicleCapacity} Seater`}</div>
					<div>{transfer.vehicleType}</div>
					<div>COST : {transfer.transfer_in} EUR</div>
					{index === 0 && transfer.meetGreet + transfer.assistance > 0 && (
						<div className="col-span-3 text-sm text-gray-200 mt-2">
							{transfer.meetGreet > 0 && (
								<p>
									Meet & Greet: {transfer.meetGreet} Unit - Cost:{' '}
									{transfer.meetGreetCost} EUR
								</p>
							)}
							{transfer.assistance > 0 && (
								<p>
									Assistance: {transfer.assistance} - Cost:{' '}
									{transfer.assistanceCost}
								</p>
							)}
						</div>
					)}
				</div>
			))}
		</div>
	)
}
