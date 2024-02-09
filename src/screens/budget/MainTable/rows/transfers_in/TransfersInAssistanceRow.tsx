import accounting from 'accounting'
import { ITransfer } from '../../../../../interfaces'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'

interface TransfersInAssistanceRowProps {
	firstItem: ITransfer
	date: string
}

export const TransfersInAssistanceRow = ({
	firstItem,
	date
}: TransfersInAssistanceRowProps) => {
	if (!firstItem) {
		return null
	}

	const { assistance = 0, assistanceCost = 0 } = firstItem

	if (assistance === 0) {
		return null
	}

	return (
		<tr className={tableRowClasses}>
			<td className={tableCellClasses}>{date}</td>
			<td></td>
			<td>On-board Assistance @ Buses</td>
			<td>{assistance}</td>
			<td>{accounting.formatMoney(assistanceCost, '€')}</td>
			<td>{accounting.formatMoney(assistance * assistanceCost, '€')}</td>
		</tr>
	)
}
