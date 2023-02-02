import { useEffect, useState , useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { TableHeaders, SearchInput } from '../../../ui'
import InvoiceListItem from './InvoiceListItem'
import { useGetInvoices, useCurrentInvoice ,useGetDocumentLength } from '../../../hooks'
import { Spinner ,Pagination } from '../../../components/atoms'

const InvoiceList = () => {
	const navigate = useNavigate()
	const [page, setPage] = useState(1)
	const [searchItem, setSearchItem] = useState('')
	const { invoices, setInvoices, isLoading } = useGetInvoices(page)
	const {results} = useGetDocumentLength("invoices")
	const [foundInvoices, setFoundInvoices] = useState([])
	const [totalPages, setTotalPages] = useState(page ?? 1)
	const { incrementInvoiceNumber, changePostingStatus } = useCurrentInvoice()

	useEffect(() => {
		setFoundInvoices(invoices)
		setTotalPages(results)
	}, [invoices , results])

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


	const onChangePage = (direction) => {
		if (direction === 'prev' && page > 1) {
			setPage(page === 1 ? page : page - 1)
		} else if (direction === 'next' && page < totalPages) {
			setPage(page === totalPages ? page : page + 1)
		}
	}

	useMemo(() => {
		setPage(1)
	}, [])

	const invoiceList = foundInvoices?.map((invoice) => (
		<InvoiceListItem
			key={invoice._id}
			invoice={invoice}
			invoices={invoices}
			setInvoices={setInvoices}
		/>
	))

	const handleClick = () => {
		//set postingStatus to posting
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
			<div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
				<div className="flex flex-col w-full">
					<h1 className="text-2xl">Invoice List</h1>
					<div className="flex flex-row justify-start items-center">
						<button
							onClick={handleClick}
							className="mx-5 focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded"
						>
							Create New Invoice
						</button>
						<SearchInput searchItem={searchItem} filterList={filterList} />
						<div className="absolute right-11 top-[170px]">
							<Pagination page={page} totalPages={totalPages} onChangePage={onChangePage}/>
						</div>
					</div>
				</div>
			</div>
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

export default InvoiceList
