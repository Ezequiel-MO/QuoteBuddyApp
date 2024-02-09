import accounting from 'accounting'
import { ITransfer } from '../../../../../interfaces'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'

interface MeetGreetRowProps {
	firstItem: ITransfer
	date: string
}

export const MeetGreetRow = ({ firstItem, date }: MeetGreetRowProps) => {
	if (!firstItem) {
		return null
	}

	const { meetGreet = 0, meetGreetCost = 0 } = firstItem

	if (meetGreet === 0) {
		return null
	}

	return (
		<tr className={tableRowClasses}>
			<td className={tableCellClasses}>{date}</td>
			<td></td>
			<td>Meet & Greet @ Airport</td>
			<td>{meetGreet}</td>
			<td>{accounting.formatMoney(meetGreetCost, '€')}</td>
			<td>{accounting.formatMoney(meetGreet * meetGreetCost, '€')}</td>
		</tr>
	)
}
