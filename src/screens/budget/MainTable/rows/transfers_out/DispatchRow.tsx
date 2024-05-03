import { useState } from "react"
import accounting from 'accounting'
import { ITransfer } from '../../../../../interfaces'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { EditableCellTransfer } from "../transfers_in/EditableCellTransfer"
import { useContextBudget } from '../../../context/BudgetContext'


interface DispatchRowProps {
	lastItem: ITransfer
	date: string
}

export const DispatchRow = ({ lastItem, date }: DispatchRowProps) => {
	const { meetGreet = 0, meetGreetCost = 0 } = lastItem || {}
	
	
	const { dispatch } = useContextBudget()
	
	const handleUpdate = (value: number, type: "meetGreet" | "meetGreetCost") => {
		dispatch({
			type: "UPDATE_MEETGREET_TRANSFER_OUT",
			payload: { value, key: type }
		})
	}
	
	if (!lastItem || meetGreet === 0 || meetGreetCost === 0) {
		return null
	}
	const [originalValueMeetGreet ] = useState(lastItem.meetGreet)
	const [originalValueMeetGreetCost ] = useState(lastItem.meetGreetCost)

	return (
		<tr className={tableRowClasses}>
			<td className={tableCellClasses}>{date}</td>
			<td></td>
			<td>Bus Dispatcher</td>
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
