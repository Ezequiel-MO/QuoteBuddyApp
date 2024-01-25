import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatYearMonthDate, getTailwindClassesForDate } from '../../../helper'
import { ButtonDeleteWithAuth } from '../../../components/atoms'

const TransferListItem = ({ transfer, transfers, setTransfers }) => {
	const navigate = useNavigate()
	const [priceStyle, setPriceStyle] = useState('')

	useEffect(() => {
		let priceDueStatus = getTailwindClassesForDate(transfer.updatedAt)
		priceDueStatus === 'overdue'
			? setPriceStyle('text-red-500')
			: priceDueStatus === 'due-soon'
			? setPriceStyle('text-yellow-500')
			: setPriceStyle('text-green-500')
	}, [transfer])

	return (
		<tbody>
			<tr className="mb-2 p-1 bg-gray-900 hover:bg-green-100 hover:text-black-50 rounded-md text-white-50">
				<td
					onClick={() =>
						navigate(`/app/transfer/specs`, {
							state: { transfer }
						})
					}
					className="hover:text-blue-600 hover:underline cursor-pointer"
				>
					{transfer.company}
				</td>
				<td>{transfer.city}</td>
				<td>{transfer.vehicleType}</td>
				<td>{`${transfer.vehicleCapacity} seats`}</td>
				<td className={priceStyle}>
					{formatYearMonthDate(transfer.updatedAt)}
				</td>
				<td className="cursor-pointer">
					<ButtonDeleteWithAuth
						endpoint={'transfers'}
						ID={transfer._id}
						setter={setTransfers}
						items={transfers}
					/>
				</td>
			</tr>
		</tbody>
	)
}

export default TransferListItem
