import accounting from 'accounting'
import { ITransfer } from '../../../../../interfaces'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'

interface Props {
	firstItem: ITransfer
	date: string
	description: 'On Board Assistance' | 'En Route Assistance'
	id?: string
}

export const AssistanceRow = ({ firstItem, date, description }: Props) => {
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
			<td>{description}</td>
			<td>{assistance}</td>
			<td>{accounting.formatMoney(assistanceCost, '€')}</td>
			<td>{accounting.formatMoney(assistance * assistanceCost, '€')}</td>
		</tr>
	)
}
