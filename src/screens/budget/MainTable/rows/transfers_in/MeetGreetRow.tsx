import { useState } from 'react'
import accounting from 'accounting'
import { ITransfer } from '../../../../../interfaces'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { EditableCellTransfer } from './EditableCellTransfer'
import { useCurrentProject } from 'src/hooks'

interface MeetGreetRowProps {
	firstItem: ITransfer
	date: string
}

export const MeetGreetRow = ({ firstItem, date }: MeetGreetRowProps) => {
	const [originalValueMeetGreet] = useState(firstItem?.meetGreet)
	const [originalValueMeetGreetCost] = useState(firstItem?.meetGreetCost)

	const { meetGreet = 0, meetGreetCost = 0 } = firstItem

	const { updateMeetGreetTransferIn } = useCurrentProject()

	const handleUpdate = (value: number, type: 'meetGreet' | 'meetGreetCost') => {
		updateMeetGreetTransferIn({ unit: value, key: type })
	}

	return (
		<tr
			className={`${tableRowClasses} hover:bg-gray-700/20 transition-colors duration-150`}
		>
			<td className={tableCellClasses}></td>
			<td></td>
			<td className={`${tableCellClasses} min-w-[200px] text-gray-100`}>
				Meet & Greet @ Airport
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
			<td className="text-gray-100 px-16 py-1 min-w-[80px]">
				{accounting.formatMoney(meetGreet * meetGreetCost, '€')}
			</td>
		</tr>
	)
}
