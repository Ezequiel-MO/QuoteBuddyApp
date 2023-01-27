import accounting from 'accounting'
import { useCurrentInvoice } from '../../../../hooks'

export const BreakdownLine = ({ line }) => {
	const { currentInvoice } = useCurrentInvoice()
	const { currency } = currentInvoice
	return (
		<>
			<td className="border-r-1 pl-2 w-[120px]">
				<p className="flex items-center overflow-hidden">{line.date}</p>
			</td>
			<td className="border-r-1 pl-2">
				<p className="indent-5 text-wrap p-2">{line.text}</p>
			</td>
			<td className="border-r-1 pl-2 w-[120px]">
				<div className="flex items-center">
					{accounting.formatMoney(line.amount, `${currency} `, 2, '.', ',')}
				</div>
			</td>
		</>
	)
}
