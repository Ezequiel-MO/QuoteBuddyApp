import '../invoice_front_page/invoice.css'
import { PostedTable } from '../invoice_front_page'
import { BreakdownList } from '.'
import { useInvoice } from '../context/InvoiceContext'

export const InvoiceBreakdownTable = () => {
	const { state } = useInvoice()

	if (state.currentInvoice?.status === 'posted') {
		return <PostedTable />
	}

	return <BreakdownList />
}
