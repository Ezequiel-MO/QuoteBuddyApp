import { useCurrentInvoice } from '../../../hooks'
import '../invoice.css'
import { PostedTable, PostingBreakdownTable } from './'

export const InvoiceBreakdownTable = () => {
	const { currentInvoice } = useCurrentInvoice()
	const { postingStatus, invoiceNumber } = currentInvoice

	if (postingStatus === 'posted' || postingStatus === 'review') {
		return <PostedTable invoiceNumber={invoiceNumber} />
	}

	return <PostingBreakdownTable />
}
