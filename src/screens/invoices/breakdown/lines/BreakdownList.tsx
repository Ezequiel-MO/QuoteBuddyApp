import { AddLine, BreakdownLines } from '..'
import '../../invoice_front_page/invoice.css'
import { formatMoney } from '../../../../helper'
import { useInvoice } from '@screens/invoices/context/InvoiceContext'

export const BreakdownList = () => {
	const { state } = useInvoice()

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
					{formatMoney(
						state.currentInvoice?.lineAmount ?? 0,
						state.currentInvoice?.currency
					)}
				</div>
			</div>
		</div>
	)
}
