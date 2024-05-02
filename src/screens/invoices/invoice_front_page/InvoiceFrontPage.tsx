import { ChangeEvent, FC } from 'react'
import {
	InvoiceBankDetails,
	InvoiceDiagonal,
	InvoiceShippingData
} from '../details'
import { InvoiceTableHeader, InvoiceHeader } from '.'
import { useCurrentInvoice } from '../../../hooks'
import { IInvoice } from '@interfaces/invoice'
import InvoiceTable from './InvoiceTable'

interface Props {
	invoice: IInvoice
	posting: boolean
}

export const InvoiceFrontPage: FC<Props> = ({ invoice, posting }) => {
	const { setInvoiceValue } = useCurrentInvoice()

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
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
