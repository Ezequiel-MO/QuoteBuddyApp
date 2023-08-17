import { FC } from 'react'
import { ITransfer } from '../../../../../../interfaces'
import { DeleteIcon } from '../../../hotel/DeleteIcon'
import { useCurrentProject } from '../../../../../../hooks'
import { useTransfers } from "../../../../add/toProject/transfers/render/context"

interface Props {
	transfersIn: ITransfer[]
}

export const TransferInLinesRender: FC<Props> = ({ transfersIn }) => {
	const { removeTransferFromSchedule } = useCurrentProject()
	const { setOpen , dispatch } = useTransfers()

	const handleDelete = (id: string , index:number) => {
		removeTransferFromSchedule('transfer_in', id)
		dispatch({
			type:"REMOVE_TRANSFER_IN",
			payload:index
		})
	}
	return (
		<div className="bg-slate-700 p-4 rounded-lg shadow-md max-w-[600px] text-white-0 active:scale-95 active:transition active:duration-150 active:ease-in-out"
			style={{ cursor: "pointer" }}
			onClick={() => setOpen(true)}
		>
			<div className="grid grid-cols-4 text-white font-semibold border-b-2 border-white">
				<div>Vehicle Capacity</div>
				<div>Vehicle Type</div>
				<div>Transfer In</div>
			</div>
			{transfersIn.map((transfer, index) => (
				<div
					key={index}
					className="grid grid-cols-4 text-white p-2 border-b border-white"
				>
					<div>{`${transfer.vehicleCapacity} Seater`}</div>
					<div>{transfer.vehicleType}</div>
					<div>COST : {transfer.transfer_in} EUR</div>
					<div>
						<DeleteIcon id={transfer._id} onDelete={(id) => handleDelete(id ,index)} />
					</div>
					{index === 0 && transfer.meetGreet + transfer.assistance > 0 && (
						<div className="col-span-3 text-sm text-gray-200 mt-2">
							{transfer.meetGreet > 0 && (
								<p>
									Meet & Greet: {transfer.meetGreet} Unit/s - Cost:{' '}
									{transfer.meetGreetCost} EUR
								</p>
							)}
							{transfer.assistance > 0 && (
								<p>
									Assistance: {transfer.assistance} Unit/s- Cost:{' '}
									{transfer.assistanceCost} EUR
								</p>
							)}
						</div>
					)}
				</div>
			))}
		</div>
	)
}
