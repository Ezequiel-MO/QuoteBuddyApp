import accounting from 'accounting'
import { useCurrentInvoice } from '../../../../hooks'
import { AddLine, BreakdownLines } from '../'
import '../../invoice_front_page/invoice.css'

export const BreakdownList = () => {
	const { currentInvoice } = useCurrentInvoice()
	const { currency, lineAmount } = currentInvoice

	return (
		<table className="ml-10 text-black-50 w-[700px] border max-h-[500px] table-fixed z-50">
			<tbody>
				<AddLine />
				<BreakdownLines />
			</tbody>
			<tfoot>
				<tr className="border-2 pl-2 font-bold">
					<td></td>
					<td>TOTAL INVOICE</td>
					<td>
						{accounting.formatMoney(lineAmount, `${currency} `, 2, '.', ',')}
					</td>
				</tr>
			</tfoot>
		</table>
	)
}
