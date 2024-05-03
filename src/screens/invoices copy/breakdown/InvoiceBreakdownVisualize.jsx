import { InvoiceDiagonal } from '../details'
import { InvoiceHeader, InvoiceTableHeader } from '../invoice_front_page'
import { InvoiceBreakdownTableVisualize } from './'

export const InvoiceBreakdownVisualize = () => {
	return (
		<>
			<InvoiceHeader />
			<InvoiceTableHeader breakdown />
			<InvoiceBreakdownTableVisualize />
			<InvoiceDiagonal />
		</>
	)
}
