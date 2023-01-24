import InvoiceDiagonal from '../InvoiceDiagonal'
import InvoiceLogo from '../InvoiceLogo'
import { InvoiceTableHeader } from '../table_data'
import { InvoiceBreakdownTableVisualize } from './InvoiceBreakdownTableVisualize'

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
