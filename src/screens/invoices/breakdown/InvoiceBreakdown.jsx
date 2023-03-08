import { InvoiceDiagonal } from '../details'
import { InvoiceHeader, InvoiceTableHeader } from '../invoice_front_page'
import { InvoiceBreakdownTable } from './'

export const InvoiceBreakdown = () => {
	return (
		<>
			<InvoiceHeader />
			<InvoiceTableHeader breakdown />
			<InvoiceBreakdownTable />
			<InvoiceDiagonal />
		</>
	)
}
