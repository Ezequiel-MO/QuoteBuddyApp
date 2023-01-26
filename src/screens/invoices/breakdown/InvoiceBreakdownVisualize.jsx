import { InvoiceDiagonal } from '../details'
import { InvoiceLogo, InvoiceTableHeader } from '../invoice_front_page'
import { InvoiceBreakdownTableVisualize } from './'

export const InvoiceBreakdownVisualize = () => {
	return (
		<>
			<InvoiceLogo />
			<InvoiceTableHeader breakdown />
			<InvoiceBreakdownTableVisualize />
			<InvoiceDiagonal />
		</>
	)
}
