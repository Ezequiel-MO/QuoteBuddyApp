import {
	InvoiceBankDetails,
	InvoiceDiagonal,
	InvoiceShippingData
} from '../details'
import { InvoiceTable, InvoiceTableHeader, InvoiceHeader } from './'
import { useCurrentInvoice } from '../../../hooks'

export const InvoiceFrontPage = ({ invoice, posting }) => {
	const { setInvoiceValue } = useCurrentInvoice()

	const handleChange = (e) => {
		const payload = { name: e.target.name, value: e.target.value }
		setInvoiceValue(payload)
	}
	return (
		<>
			<InvoiceHeader />
			<InvoiceShippingData
				handleChange={handleChange}
				invoice={invoice}
				posting={posting}
			/>
			<InvoiceTableHeader />
			<InvoiceTable handleChange={handleChange} invoice={invoice} />
			<InvoiceBankDetails />
			<InvoiceDiagonal />
		</>
	)
}
