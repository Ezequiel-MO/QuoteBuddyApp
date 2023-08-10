import { useNavigate } from 'react-router-dom'
import { useCurrentInvoice } from '../../../hooks/useCurrentInvoice'
import { useAuth } from '../../../hooks'
import { DisplayInvoiceDetails } from './DisplayInvoiceDetails'

const InvoiceListItem = ({ invoice, invoices, setInvoices }) => {
	const navigate = useNavigate()
	const { setInvoice } = useCurrentInvoice()

	const { auth } = useAuth()

	const handleClick = () => {
		setInvoice(invoice)
		navigate(`/app/invoice/specs/${invoice._id}`, { state: { invoice } })
	}

	return (
		<tbody>
			<DisplayInvoiceDetails
				invoice={invoice}
				handleClick={handleClick}
				auth={auth}
				invoices={invoices}
				setInvoices={setInvoices}
			/>
		</tbody>
	)
}

export default InvoiceListItem
