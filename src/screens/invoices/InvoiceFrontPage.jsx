import InvoiceBankDetails from './Bank/InvoiceBankDetails'
import InvoiceDiagonal from './InvoiceDiagonal'
import { InvoiceTable, InvoiceTableHeader } from './table_data/'
import InvoiceShippingData from './InvoiceShippingData'
import InvoiceLogo from './InvoiceLogo'
import { useCurrentInvoice } from '../../hooks'

const InvoiceFrontPage = () => {
	const { setInvoiceValue } = useCurrentInvoice()

	const handleChange = (e) => {
		const payload = { name: e.target.name, value: e.target.value }
		setInvoiceValue(payload)
	}
	return (
		<>
			<InvoiceLogo />
			<InvoiceShippingData handleChange={handleChange} />
			<InvoiceTableHeader />
			<InvoiceTable handleChange={handleChange} />
			<InvoiceBankDetails />
			<InvoiceDiagonal />
		</>
	)
}

export default InvoiceFrontPage
