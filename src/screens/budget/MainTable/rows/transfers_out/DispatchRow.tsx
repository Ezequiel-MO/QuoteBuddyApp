import { useState } from 'react'
import accounting from 'accounting'
import { ITransfer } from '../../../../../interfaces'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { EditableCellTransfer } from '../transfers_in/EditableCellTransfer'
import { useCurrentProject } from 'src/hooks'

interface DispatchRowProps {
	lastItem: ITransfer
	date: string
}

export const DispatchRow = ({ lastItem, date }: DispatchRowProps) => {
	const { meetGreet = 0, meetGreetCost = 0 } = lastItem || {}
	const [originalValueMeetGreet] = useState(meetGreet)
	const [originalValueMeetGreetCost] = useState(meetGreetCost)

	const { updateMeetGreetTransferOut } = useCurrentProject()

	const handleUpdate = (value: number, type: 'meetGreet' | 'meetGreetCost') => {
		updateMeetGreetTransferOut({ value, key: type })
	}

	return (
		<tr
			className={`${tableRowClasses} hover:bg-gray-700/20 transition-colors duration-150`}
		>
			<td className={tableCellClasses}></td>
			<td></td>
			<td className={`${tableCellClasses} min-w-[200px] text-gray-100`}>
				Bus Dispatcher
			</td>
			<td className={tableCellClasses}>
				<EditableCellTransfer
					value={meetGreet}
					originalValue={originalValueMeetGreet}
					typeValue="unit"
					onSave={(newValue) => handleUpdate(newValue, 'meetGreet')}
				/>
			</td>
			<td className={tableCellClasses}>
				<EditableCellTransfer
					value={meetGreetCost}
					originalValue={originalValueMeetGreetCost}
					typeValue="price"
					onSave={(newValue) => handleUpdate(newValue, 'meetGreetCost')}
				/>
			</td>
			<td
				className={`${tableCellClasses} text-gray-100 px-2 py-1 min-w-[80px]`}
			>
				{accounting.formatMoney(meetGreet * meetGreetCost, '€')}
			</td>
		</tr>
	)
}
