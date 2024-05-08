import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TableHeaders } from '../../../ui'
import InvoiceListItem from './InvoiceListItem'
import {
	useGetDocumentLength,
	usePagination,
	useFilterList
} from '../../../hooks'
import { Spinner } from '../../../components/atoms'
import { InvoiceListHeader } from './InvoiceListHeader'
import { useFetchInvoices } from 'src/hooks/fetchData'
import { useInvoice } from '../context/InvoiceContext'
import { IInvoice } from '@interfaces/invoice'

interface InvoiceListProps {}

export const InvoiceList: React.FC<InvoiceListProps> = () => {
	const navigate = useNavigate()
	const [totalPages, setTotalPages] = useState<number>(1)
	const { page, onChangePage } = usePagination(1, totalPages)
	const { invoices, setInvoices, isLoading } = useFetchInvoices({ page })
	const { results } = useGetDocumentLength('invoices')
	const { dispatch } = useInvoice()

	// Type `filterFunction` explicitly
	const filterFunction = (data: IInvoice, value: string): boolean =>
		data.invoiceNumber.toLowerCase().includes(value.toLowerCase()) ||
		data.client.toLowerCase().includes(value.toLowerCase()) ||
		data.company.toLowerCase().includes(value.toLowerCase()) ||
		data.reference.toLowerCase().includes(value.toLowerCase()) ||
		data.lineAmount.toString().includes(value)

	// Destructure the output from `useFilterList` with appropriate types
	const {
		filteredData: foundInvoices,
		searchTerm: searchItem,
		filterList,
		setData: setFoundInvoices
	} = useFilterList<IInvoice>([], filterFunction)

	useEffect(() => {
		setFoundInvoices(invoices)
		setTotalPages(results)
	}, [invoices, results])

	useEffect(() => {
		setFoundInvoices(invoices)
	}, [invoices, setFoundInvoices])

	const handleClick = () => {
		dispatch({
			type: 'CLEAR_INVOICE'
		})
		dispatch({
			type: 'UPDATE_INVOICE_FIELD',
			payload: { name: 'status', value: 'posting' }
		})

		dispatch({
			type: 'INCREMENT_INVOICE_NUMBER',
			payload: invoices.sort((a, b) =>
				b.invoiceNumber.localeCompare(a.invoiceNumber)
			)
		})

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
						{foundInvoices?.map((invoice) => (
							<InvoiceListItem
								key={invoice._id}
								invoice={invoice}
								invoices={invoices}
								setInvoices={setInvoices}
							/>
						))}
					</table>
				)}
			</div>
		</>
	)
}
