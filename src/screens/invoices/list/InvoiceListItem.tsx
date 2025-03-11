import { useNavigate } from 'react-router-dom'
import { DisplayInvoiceDetails } from './DisplayInvoiceDetails'
import { IInvoice } from '@interfaces/invoice'
import { useInvoice } from '../context/InvoiceContext'

interface Props {
	invoice: IInvoice
	invoices: IInvoice[]
	setInvoices: React.Dispatch<React.SetStateAction<IInvoice[]>>
}

const InvoiceListItem = ({ invoice, invoices, setInvoices }: Props) => {
	const navigate = useNavigate()
	const { dispatch } = useInvoice()

	const handleClick = () => {
		dispatch({
			type: 'SET_INVOICE',
			payload: invoice
		})
		navigate(`/app/invoice/specs/${invoice._id}`)
	}

	return (
		<tbody>
			<DisplayInvoiceDetails
				invoice={invoice}
				handleClick={handleClick}
				invoices={invoices}
				setInvoices={setInvoices}
			/>
		</tbody>
	)
}

export default InvoiceListItem
