import InvoiceDiagonal from './InvoiceDiagonal'
import InvoiceLogo from './InvoiceLogo'
import { InvoiceTableHeader, InvoiceBreakdownTable } from './table_data'

const InvoiceBreakdown = () => {
	return (
		<>
			<InvoiceLogo />
			<InvoiceTableHeader breakdown />
			<InvoiceBreakdownTable />
			<InvoiceDiagonal />
		</>
	)
}

export default InvoiceBreakdown
