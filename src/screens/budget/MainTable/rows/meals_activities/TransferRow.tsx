import React from 'react'
import { TransferCells } from './TransferCells'
import { ITransfer, IEvent, IRestaurant } from '../../../../../interfaces/'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'

interface TransferRowProps {
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
	selectedEvent: IEvent | IRestaurant
}

export const TransferRow: React.FC<TransferRowProps> = ({
	date,
	options,
	description,
	id,
	selectedEvent
}) => {
	const groupedOptions = options.reduce((acc, option) => {
		const service = option.selectedService
		const id = option._id
		if (id) {
			if (acc[id + service]) {
				acc[id + service].count += 1
			} else {
				acc[id + service] = {
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
				<tr
					key={group._id + group.selectedService}
					className="hover:bg-gray-700/20 transition-colors duration-150"
				>
					<td className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis"></td>
					<TransferCells
						description={description}
						date={date}
						option={group}
						count={group.count}
						id={id}
						selectedEvent={selectedEvent}
					/>
				</tr>
			))}
		</>
	)
}
