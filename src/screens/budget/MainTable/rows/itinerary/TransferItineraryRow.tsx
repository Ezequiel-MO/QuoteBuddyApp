import { FC } from 'react'
import { TransferItineraryCells } from './TransferItineraryCells'
import { tableCellClasses, tableRowClasses } from '@constants/styles/listStyles'
import { ITransfer } from 'src/interfaces'

interface TransferItineraryRowProps {
	options: ITransfer[]
	date: string
	starts: 'morning' | 'afternoon' | 'night' | ''
	ends: 'morning' | 'afternoon' | 'night' | ''
}

export const TransferItineraryRow: FC<TransferItineraryRowProps> = ({
	options,
	date,
	starts,
	ends
}) => {
	if (options.length === 0) {
		return null
	}

	//creo un objeto de objetos, la "key" del obejct  va ser el id "Transfer"
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
			{groupedOptionsArray.map((group) => {
				return (
					<tr
						key={group._id + group.selectedService}
						className={tableRowClasses}
					>
						<td className={tableCellClasses}>{date}</td>
						<TransferItineraryCells
							transfer={group}
							count={group.count}
							date={date}
							starts={starts}
							ends={ends}
						/>
					</tr>
				)
			})}
		</>
	)
}
