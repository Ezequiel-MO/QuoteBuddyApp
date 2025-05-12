import { useState, useEffect, FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDate } from 'src/helper/formatDate'
import { listStyles } from '@constants/styles/listStyles'
import { ITransfer } from '@interfaces/transfer'
import { useTransfer } from '../..//context/TransfersContext'
import baseAPI from 'src/axios/axiosConfig'
import { MenuRestoreActions } from 'src/components/atoms/modal/menu/MenuRestoreActions'
import { TransferDetailModal } from './modal/TransferDetailModal'
import { Icon } from '@iconify/react'

interface TransferListRestoreItemProps {
	item: ITransfer
}

export const TransferListRestoreItem: FC<TransferListRestoreItemProps> = ({
	item: transfer
}) => {
	const { state, dispatch } = useTransfer()

	const [openModal, setOpenModal] = useState(false)

	const handleViewDetails = () => {
		setOpenModal(true)
	}

	const handleRestore = async (transferId: string) => {
		const updatedTransfers = state.transfers.filter(
			(el) => el._id !== transferId
		)
		await baseAPI.patch(`transfers/isDeleted/true/${transfer._id}`)
		dispatch({ type: 'SET_TRANSFERS', payload: updatedTransfers })
	}

	const handleDelete = async (transferId: string) => {
		const updatedTransfers = state.transfers.filter(
			(el) => el._id !== transferId
		)
		await baseAPI.delete(`transfers/isDeleted/true/${transfer._id}`)
		dispatch({ type: 'SET_TRANSFERS', payload: updatedTransfers })
	}

	return (
		<tr className={listStyles.tr}>
			<td
				className={`${listStyles.td} hover:text-blue-600 hover:underline flex items-center`}
			>
				<Icon
					icon="fluent:delete-arrow-back-16-regular"
					width={20}
					className="mr-1"
				/>
				{transfer.company}
			</td>
			<td className={listStyles.td}>{transfer.city}</td>
			<td className={listStyles.td}>{transfer.vehicleType}</td>
			<td className={listStyles.td}>{`${transfer.vehicleCapacity} seats`}</td>
			<td className={`${listStyles.td} text-red-500`}>
				{transfer.deletedAt ? formatDate(transfer.deletedAt) : ''}
			</td>
			<td className={`${listStyles.td}`}>
				<TransferDetailModal
					transfer={transfer}
					open={openModal}
					setOpen={setOpenModal}
				/>
				<MenuRestoreActions
					item={transfer}
					itemType="Transfer"
					itemName={transfer.company}
					onViewDetails={handleViewDetails}
					onRestore={(transferId) => handleRestore(transferId)}
					onDelete={(transferId) => handleDelete(transferId)}
					key={transfer._id}
				/>
			</td>
		</tr>
	)
}
