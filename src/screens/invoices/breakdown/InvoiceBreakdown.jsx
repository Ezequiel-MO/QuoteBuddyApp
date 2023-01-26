import { InvoiceDiagonal } from '../details'
import { InvoiceLogo, InvoiceTableHeader } from '../invoice_front_page'
import { InvoiceBreakdownTable } from './'

export const InvoiceBreakdown = () => {
	return (
		<>
			<InvoiceLogo />
			<InvoiceTableHeader breakdown />
			<InvoiceBreakdownTable />
			<InvoiceDiagonal />
		</>
	)
}
