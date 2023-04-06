import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { TableHeaders } from '../../../ui'
import InvoiceListItem from './InvoiceListItem'
import {
	useGetInvoices,
	useCurrentInvoice,
	useGetDocumentLength,
	usePagination
} from '../../../hooks'
import { Spinner } from '../../../components/atoms'
import { InvoiceListHeader } from './InvoiceListHeader'

export const InvoiceList = () => {
	const navigate = useNavigate()
	const [searchItem, setSearchItem] = useState('')
	const [totalPages, setTotalPages] = useState(1)
	const { page, onChangePage } = usePagination(1, totalPages)
	const { invoices, setInvoices, isLoading } = useGetInvoices(page)
	const { results } = useGetDocumentLength('invoices')
	const [foundInvoices, setFoundInvoices] = useState([])
	const { incrementInvoiceNumber, changePostingStatus } = useCurrentInvoice()

	useEffect(() => {
		setFoundInvoices(invoices)
		setTotalPages(results)
	}, [invoices, results])

	const filterList = (e) => {
		const { value } = e.target
		setSearchItem(value)
		const result = invoices.filter(
			(data) =>
				data.invoiceNumber.toLowerCase().includes(value.toLowerCase()) ||
				data.client.toLowerCase().includes(value.toLowerCase()) ||
				data.company.toLowerCase().includes(value.toLowerCase()) ||
				data.reference.toLowerCase().includes(value.toLowerCase()) ||
				data.lineAmount.includes(value)
		)
		setFoundInvoices(result)
		if (searchItem === '') {
			setFoundInvoices(invoices)
		}
	}

	const invoiceList = foundInvoices?.map((invoice) => (
		<InvoiceListItem
			key={invoice._id}
			invoice={invoice}
			invoices={invoices}
			setInvoices={setInvoices}
		/>
	))

	const handleClick = () => {
		changePostingStatus('posting')
		let todaysYear = Number(new Date().getFullYear().toString().slice(2))
		const sortedInvoices = invoices
			.map((invoice) => {
				return { ...invoice, invoiceNumber: Number(invoice.invoiceNumber) }
			})
			.sort((a, b) => b.invoiceNumber - a.invoiceNumber)
		let invoiceNumber = Number(sortedInvoices[0].invoiceNumber)
		const invoiceYear = Number(invoiceNumber.toString().slice(0, 2))
		if (todaysYear > invoiceYear) {
			invoiceNumber = Number(`${todaysYear}000`)
		}
		incrementInvoiceNumber(invoiceNumber)

		navigate('/app/invoice/specs')
	}

	return (
		<>
			<InvoiceListHeader
				searchItem={searchItem}
				filterList={filterList}
				onClickCreate={handleClick}
				page={page}
				totalPages={totalPages}
				onChangePage={onChangePage}
			/>
			<hr />
			<div className="flex flex-row">
				{isLoading ? (
					<Spinner />
				) : (
					<table className="w-full p-5">
						<TableHeaders headers="invoice" />
						{invoiceList}
					</table>
				)}
			</div>
		</>
	)
}
