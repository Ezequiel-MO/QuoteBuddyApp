import {
	InvoiceBankDetails,
	InvoiceDiagonal,
	InvoiceShippingData
} from '../details'
import { InvoiceTable, InvoiceTableHeader, InvoiceHeader } from './'
import { useCurrentInvoice } from '../../../hooks'

export const InvoiceFrontPage = () => {
	const { setInvoiceValue } = useCurrentInvoice()

	const handleChange = (e) => {
		const payload = { name: e.target.name, value: e.target.value }
		setInvoiceValue(payload)
	}
	return (
		<>
			<InvoiceHeader />
			<InvoiceShippingData handleChange={handleChange} />
			<InvoiceTableHeader />
			<InvoiceTable handleChange={handleChange} />
			<InvoiceBankDetails />
			<InvoiceDiagonal />
		</>
	)
}
