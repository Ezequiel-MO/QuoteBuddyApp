import { ITransfer } from '@interfaces/transfer'
import React, { FC } from 'react'
import { ModalComponent, ModalCancelButton } from 'src/components/atoms'
import { formatMoney } from 'src/helper'

const styleModal = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '45%',
	maxHeight: '90vh',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	overflow: 'auto',
	padding: 5
}

interface TransferDetailModalProps {
	transfer: ITransfer
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const TransferDetailModal: FC<TransferDetailModalProps> = ({
	transfer,
	open,
	setOpen
}) => {
	const handleModalClose = () => {
		setOpen(false)
	}

	return (
		<div role="menuitem">
			<ModalComponent
				open={open}
				setOpen={() => handleModalClose()}
				styleModal={styleModal}
			>
				<ModalCancelButton handleClose={() => handleModalClose()} />
				<h1 className="text-center mb-4 text-4xl">{transfer.company}</h1>

				<div className="grid grid-cols-3 gap-2 text-sm text-white">
					<p>
						<strong>City: </strong>
						{transfer.city}
					</p>
					<p>
						<strong>Vehicle type: </strong>
						{transfer.vehicleType}
					</p>
					<p>
						<strong>Vehicle Capacity: </strong>
						{transfer.vehicleCapacity}
					</p>
					<p>
						<strong>Transfer in: </strong>
						{formatMoney(transfer.transfer_in ? transfer.transfer_in : 0)}
					</p>
					<p>
						<strong>Transfer out: </strong>
						{formatMoney(transfer.transfer_out ? transfer.transfer_out : 0)}
					</p>
                    <p>
						<strong>Transfer in/out night: </strong>
						{formatMoney(transfer.transfer_in_out_night ? transfer.transfer_in_out_night : 0)}
					</p>
                    <p>
                        <strong>Dispo 4h</strong>
                        {formatMoney(transfer.dispo_4h  ? transfer.dispo_4h : 0)}
                    </p>
                    <p>
                        <strong>One way city transfer</strong>
                        {formatMoney(transfer.one_way_city_transfer  ? transfer.one_way_city_transfer : 0)}
                    </p>
                    <p>
                        <strong>One way city trnsf night: </strong>
                        {formatMoney(transfer.one_way_city_transfer_night  ? transfer.one_way_city_transfer_night : 0)}
                    </p>
                    <p>
                        <strong>Dispo 6h</strong>
                        {formatMoney(transfer.dispo_6h  ? transfer.dispo_6h : 0)}
                    </p>
                    <p>
                        <strong>Dispo 9h: </strong>
                        {formatMoney(transfer.dispo_9h  ? transfer.dispo_9h : 0)}
                    </p>
                    <p>
                        <strong>Hextra: </strong>
                        {formatMoney(transfer.hextra  ? transfer.hextra : 0)}
                    </p>
                    <p>
                        <strong>Hextra night: </strong>
                        {formatMoney(transfer.hextra_night  ? transfer.hextra_night : 0)}
                    </p>
                    <p>
                        <strong>Dispo 5h out: </strong>
                        {formatMoney(transfer.dispo_5h_out  ? transfer.dispo_5h_out : 0)}
                    </p>
                    <p>
                        <strong>Dispo 4h airport: </strong>
                        {formatMoney(transfer.dispo_4h_airport  ? transfer.dispo_4h_airport : 0)}
                    </p>
                    <p>
                        <strong>Dispo 4h night: </strong>
                        {formatMoney(transfer.dispo_4h_night  ? transfer.dispo_4h_night : 0)}
                    </p>
                    <p>
                        <strong>Dispo 6h night: </strong>
                        {formatMoney(transfer.dispo_6h_night  ? transfer.dispo_6h_night : 0)}
                    </p>
				</div>
			</ModalComponent>
		</div>
	)
}
