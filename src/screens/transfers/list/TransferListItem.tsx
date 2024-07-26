import { useState, useEffect, FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatYearMonthDate, getTailwindClassesForDate } from '../../../helper'
import { ButtonDeleteWithAuth } from '../../../components/atoms'
import { listStyles } from 'src/constants/listStyles'
import { ITransfer } from '@interfaces/transfer'
import { useTransfer } from '../context/TransfersContext'

interface TransferListItemProps {
	item: ITransfer
	canBeAddedToProject: boolean
}

const TransferListItem: FC<TransferListItemProps> = ({
	item: transfer,
	canBeAddedToProject = false
}) => {
	const { state, dispatch } = useTransfer()
	const navigate = useNavigate()
	const [priceStyle, setPriceStyle] = useState('')

	const handleNavigateToTransferSpecs = () => {
		dispatch({
			type: 'TOGGLE_UPDATE',
			payload: true
		})
		dispatch({
			type: 'SET_TRANSFER',
			payload: transfer
		})
		navigate('/app/transfer/specs')
	}

	useEffect(() => {
		let priceDueStatus = getTailwindClassesForDate(transfer.updatedAt)
		priceDueStatus === 'overdue'
			? setPriceStyle('text-red-500')
			: priceDueStatus === 'due-soon'
			? setPriceStyle('text-yellow-500')
			: setPriceStyle('text-green-500')
	}, [transfer])

	return (
		<tr className={listStyles.tr}>
			<td
				onClick={handleNavigateToTransferSpecs}
				className="hover:text-blue-600 hover:underline cursor-pointer"
			>
				{transfer.company}
			</td>
			<td className={listStyles.td}>{transfer.city}</td>
			<td>{transfer.vehicleType}</td>
			<td>{`${transfer.vehicleCapacity} seats`}</td>
			<td className={priceStyle}>{formatYearMonthDate(transfer.updatedAt)}</td>
			<td className="cursor-pointer">
				<ButtonDeleteWithAuth
					endpoint="transfers"
					ID={transfer._id}
					setter={(updatedTransfers: ITransfer[]) =>
						dispatch({
							type: 'SET_TRANSFERS',
							payload: updatedTransfers
						})
					}
					items={state.transfers || []}
				/>
			</td>
		</tr>
	)
}

export default TransferListItem
