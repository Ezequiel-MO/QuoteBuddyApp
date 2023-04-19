import { useCurrentInvoice } from '../../../hooks'
import './invoice.css'
import { PostedTable, PostingTable } from './'

export const InvoiceTable = ({ handleChange, invoice }) => {
	const { currentInvoice } = useCurrentInvoice()
	const { postingStatus, invoiceNumber } = currentInvoice

	if (postingStatus === 'posting') {
		return <PostingTable handleChange={handleChange} />
	}

	return <PostedTable invoiceNumber={invoiceNumber} invoice={invoice} />
}
