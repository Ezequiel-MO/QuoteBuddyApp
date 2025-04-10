import React from 'react'
import { ITransfer } from '@interfaces/transfer'

interface TransferCardProps {
	transfer: ITransfer
	onDelete?: (id: string) => void
	onClick?: () => void
}

export const TransferCard: React.FC<TransferCardProps> = ({
	transfer,
	onDelete,
	onClick
}) => {
	return (
		<div
			className="bg-slate-700 p-4 rounded-lg shadow-md text-white-0 cursor-pointer"
			onClick={onClick}
		>
			<div className="grid grid-cols-4 text-white-0 font-semibold border-b-2 border-white">
				<div>Vehicle Capacity</div>
				<div>Vehicle Type</div>
				<div>Transfer Cost</div>
				{onDelete && <div>Actions</div>}
			</div>
			<div className="grid grid-cols-4 text-white p-2 border-b border-white">
				<div>{`${transfer.vehicleCapacity} Seater`}</div>
				<div>{transfer.vehicleType}</div>
				<div>COST : {transfer.transfer_in || transfer.transfer_out} EUR</div>
				{onDelete && (
					<div>
						<button onClick={() => onDelete(transfer._id)}>Delete</button>
					</div>
				)}
			</div>
		</div>
	)
}
