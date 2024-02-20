import React from 'react'
import { TransferCells } from './TransferCells'
import { ITransfer } from '../../../../../interfaces/transfer'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'

interface TransferRowProps {
	pax?: number
	date: string
	options: ITransfer[]
	description: string
	id:
		| 'transfer_morningEvents'
		| 'transfer_afternoonEvents'
		| 'transfer_lunch'
		| 'transfer_dinner'
		| 'transfer_morningItinerary'
		| 'transfer_afternoonItinerary'
}

export const TransferRow: React.FC<TransferRowProps> = ({
	date,
	options,
	description,
	id
}) => {
	const groupedOptions = options.reduce((acc, option) => {
		const service = option.selectedService

		if (service) {
			if (acc[service]) {
				acc[service].count += 1
			} else {
				acc[service] = {
					...option,
					count: 1
				}
			}
		}
		return acc
	}, {} as { [key: string]: ITransfer & { count: number } })

	const groupedOptionsArray = Object.values(groupedOptions)

	return (
		<>
			{groupedOptionsArray.map((group) => (
				<tr key={group.selectedService} className={tableRowClasses}>
					<td className={tableCellClasses}>{date}</td>
					<TransferCells
						description={description}
						date={date}
						option={group}
						count={group.count}
						id={id}
					/>
				</tr>
			))}
		</>
	)
}
