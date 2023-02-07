import accounting from 'accounting'
import { useCurrentInvoice } from '../../../../hooks'
import { AddLine, BreakdownLines } from '../'
import '../../invoice_front_page/invoice.css'

export const BreakdownList = () => {
	const { currentInvoice } = useCurrentInvoice()
	const { currency, lineAmount } = currentInvoice

	return (
		<div className="w-[700px] ml-10 text-black-50 z-[200]">
			<div className="flex flex-col">
				<div id="lines_breakdown_form">
					<AddLine />
				</div>
				<BreakdownLines />
			</div>

			<div className="border-2 pl-2 font-bold flex justify-between">
				<p>TOTAL INVOICE</p>
				<div>
					{accounting.formatMoney(lineAmount, `${currency} `, 2, '.', ',')}
				</div>
			</div>
		</div>
	)
}
