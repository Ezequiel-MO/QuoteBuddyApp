import accounting from 'accounting'
import { ITransfer } from '../../../../../interfaces'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'

interface DispatchRowProps {
	lastItem: ITransfer
	date: string
}

export const DispatchRow = ({ lastItem, date }: DispatchRowProps) => {
	const { meetGreet = 0, meetGreetCost = 0 } = lastItem || {}

	if (!lastItem || meetGreet === 0 || meetGreetCost === 0) {
		return null
	}

	return (
		<tr className={tableRowClasses}>
			<td className={tableCellClasses}>{date}</td>
			<td></td>
			<td>Bus Dispatcher</td>
			<td>{meetGreet}</td>
			<td>{accounting.formatMoney(meetGreetCost, '€')}</td>
			<td>{accounting.formatMoney(meetGreet * meetGreetCost, '€')}</td>
		</tr>
	)
}
