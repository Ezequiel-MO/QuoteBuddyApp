import { useNavigate } from 'react-router-dom'
import { TableHeaders } from '../../../ui'
import InvoiceListItem from './InvoiceListItem'
import { Spinner } from '../../../components/atoms'
import { useInvoice } from '../context/InvoiceContext'
import { createBlankInvoice } from '../context/createBlankInvoice'
import { ListHeader } from '@components/molecules'
import { usePagination } from 'src/hooks/lists/usePagination'


interface InvoiceListProps { }

export const InvoiceList: React.FC<InvoiceListProps> = () => {
	const navigate = useNavigate()
	const { dispatch, state, isLoading, setInvoices } = useInvoice()
	const { invoices } = state
	const { changePage } = usePagination({ state, dispatch })

	const handleClickCreateInvoice = () => {
		const newInvoice = createBlankInvoice()
		dispatch({
			type: 'SET_INVOICE',
			payload: newInvoice
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
			<ListHeader
				title='Invoices'
				handleClick={handleClickCreateInvoice}
				searchItem={state.searchTerm}
				placeHolderSearch='invoice number'
				filterList={(e: React.ChangeEvent<HTMLInputElement>) =>
					dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })
				}
				page={state.page}
				totalPages={state.totalPages}
				onChangePage={(direction) => {
					changePage(direction)
				}}
			>
			</ListHeader>
			<hr />
			<div className="flex flex-row">
				{isLoading ?
					<div className="flex items-center justify-center w-full mt-32">
						<Spinner />
					</div>
					: (
						<table className="w-full p-5">
							<TableHeaders headers="invoice" />
							{invoices?.map((invoice) => (
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
