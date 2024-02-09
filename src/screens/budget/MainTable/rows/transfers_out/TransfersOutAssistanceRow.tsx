import accounting from 'accounting'
import { ITransfer } from '../../../../../interfaces'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'

interface TransfersOutAssistanceRowProps {
	firstItem: ITransfer
	date: string
}

export const TransfersOutAssistanceRow = ({
	firstItem,
	date
}: TransfersOutAssistanceRowProps) => {
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
			<td>{assistance}</td>
			<td>{accounting.formatMoney(assistanceCost, '€')}</td>
			<td>{accounting.formatMoney(assistance * assistanceCost, '€')}</td>
		</tr>
	)
}
