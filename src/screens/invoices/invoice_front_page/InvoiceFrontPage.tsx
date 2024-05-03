import {
	InvoiceBankDetails,
	InvoiceDiagonal,
	InvoiceShippingData
} from '../details'
import { InvoiceTableHeader, InvoiceHeader } from '.'
import InvoiceTable from './InvoiceTable'

export const InvoiceFrontPage: React.FC = () => {
	return (
		<>
			<InvoiceHeader />
			<InvoiceShippingData />
			<InvoiceTableHeader />
			<InvoiceTable />
			<InvoiceBankDetails />
			<InvoiceDiagonal />
		</>
	)
}
