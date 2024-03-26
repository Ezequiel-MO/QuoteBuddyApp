import accounting from 'accounting'
import { ITransfer } from '../../../../../interfaces'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { EditableCellTransfer } from "../transfers_in/EditableCellTransfer"
import { useContextBudget } from '../../../context/BudgetContext'

interface TransfersOutAssistanceRowProps {
	firstItem: ITransfer
	date: string
}

export const TransfersOutAssistanceRow = ({
	firstItem,
	date
}: TransfersOutAssistanceRowProps) => {

	const { dispatch } = useContextBudget()

	const handleUpdate = (value: number, type: "assistance" | "assistanceCost") => {
		dispatch({
			type: "UPDATE_ASSISTANCE_TRANSFER_OUT",
			payload: { value, key: type }
		})
	}

	if (!firstItem) {
		return null
	}

	const { assistance = 0, assistanceCost = 0 } = firstItem

	return (
		<tr className={tableRowClasses}>
			<td className={tableCellClasses} title={date}>
				{date}
			</td>
			<td></td>
			<td>On-board Assistance @ Buses</td>
			<td>
				<EditableCellTransfer
					value={assistance}
					typeValue='unit'
					onSave={(newValue) => handleUpdate(newValue, "assistance")}
				/>
			</td>
			<td>
				<EditableCellTransfer
					value={assistanceCost}
					typeValue='price'
					onSave={(newValue) => handleUpdate(newValue, "assistanceCost")}
				/>
			</td>
			<td>{accounting.formatMoney(assistance * assistanceCost, '€')}</td>
		</tr>
	)
}
