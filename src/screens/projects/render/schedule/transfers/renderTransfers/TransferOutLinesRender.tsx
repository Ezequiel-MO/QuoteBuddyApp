import { FC, useEffect } from 'react'
import { ITransfer } from '@interfaces/transfer'
import { useCurrentProject } from '@hooks/index'
import { useTransfers } from '../../../../add/toProject/transfers/render/context'
import { DeleteIcon } from '@components/atoms'

interface Props {
	transfersOut: ITransfer[]
}

export const TransferOutLinesRender: FC<Props> = ({ transfersOut }) => {
	const { removeTransferFromSchedule } = useCurrentProject()
	const { setOpen, dispatch } = useTransfers()

	// Initialize the transfers in the context when the component mounts or transfersOut changes
	useEffect(() => {
		if (transfersOut && transfersOut.length > 0) {
			dispatch({
				type: 'UPDATE_TRANSFER_OUT',
				payload: { transferObject: transfersOut }
			})
		}
	}, [transfersOut, dispatch])

	const handleDelete = (id: string, index: number) => {
		removeTransferFromSchedule('transfer_out', id)
		dispatch({
			type: 'REMOVE_TRANSFER_OUT',
			payload: index
		})
	}

	const handleOpenModal = () => {
		// Ensure the transfers are updated in the context before opening the modal
		if (transfersOut && transfersOut.length > 0) {
			dispatch({
				type: 'UPDATE_TRANSFER_OUT',
				payload: { transferObject: transfersOut }
			})
		}
		setOpen(true)
	}

	const cardTransferClassName =
		'bg-slate-700 p-4 rounded-lg shadow-md max-w-[600px] text-white-0 active:scale-95 active:transition active:duration-150 active:ease-in-out'

	return (
		<div
			className={cardTransferClassName}
			style={{ cursor: 'pointer' }}
			onClick={handleOpenModal}
		>
			<div className="grid grid-cols-4 text-white font-semibold border-b-2 border-white">
				<div>Vehicle Capacity</div>
				<div>Vehicle Type</div>
				<div>Transfer Out</div>
			</div>
			{transfersOut?.map((transfer, index) => (
				<div
					key={index}
					className="grid grid-cols-4 text-white p-2 border-b border-white"
				>
					<div>{`${transfer.vehicleCapacity} Seater`}</div>
					<div>{transfer.vehicleType}</div>
					<div>COST : {transfer.transfer_out} EUR</div>
					<div>
						<DeleteIcon
							id={transfer._id}
							onDelete={(id) => handleDelete(id, index)}
						/>
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
