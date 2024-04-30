import { useState } from "react"
import accounting from 'accounting'
import { ITransfer } from '../../../../../interfaces'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { EditableCellTransfer } from './EditableCellTransfer'
import { useContextBudget } from '../../../context/BudgetContext'


interface MeetGreetRowProps {
	firstItem: ITransfer
	date: string
}

export const MeetGreetRow = ({ firstItem, date }: MeetGreetRowProps) => {

	const { dispatch } = useContextBudget()

	const handleUpdate = (value: number, type: "meetGreet" | "meetGreetCost") => {
		dispatch({
			type: "UPDATE_MEETGREET_TRANSFER_IN",
			payload: { unit: value, key: type }
		})
	}


	if (!firstItem) {
		return null
	}
	const [originalValueMeetGreet ] = useState(firstItem.meetGreet)
	const [originalValueMeetGreetCost ] = useState(firstItem.meetGreetCost)

	const { meetGreet = 0, meetGreetCost = 0 } = firstItem

	if (meetGreet === 0) {
		return null
	}

	return (
		<tr className={tableRowClasses}>
			<td className={tableCellClasses}>{date}</td>
			<td></td>
			<td>Meet & Greet @ Airport</td>
			<td>
				<EditableCellTransfer
					value={meetGreet}
					originalValue={originalValueMeetGreet}
					typeValue='unit'
					onSave={(newValue) => handleUpdate(newValue, "meetGreet")}
				/>
			</td>
			<td>
				<EditableCellTransfer
					value={meetGreetCost}
					originalValue={originalValueMeetGreetCost}
					typeValue='price'
					onSave={(newValue) => handleUpdate(newValue, "meetGreetCost")}
				/>
			</td>
			<td>{accounting.formatMoney(meetGreet * meetGreetCost, '€')}</td>
		</tr>
	)
}
