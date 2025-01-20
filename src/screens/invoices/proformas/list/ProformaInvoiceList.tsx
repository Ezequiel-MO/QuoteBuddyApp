import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ListTableProformaInvoice } from './ListTableProformaInvoice'
import { useInvoice } from '../../context/InvoiceContext'
import { createBlankInvoice } from '../../context/createBlankInvoice'
import { ListHeader } from '@components/molecules'
import { usePagination } from 'src/hooks/lists/usePagination'

export const ProformaInvoiceList = () => {
	const navigate = useNavigate()
	const { dispatch, state, isLoading, setInvoices } = useInvoice()

	const { changePage } = usePagination({ state, dispatch })

	useEffect(() => {
		dispatch({
			type: 'SET_FILTER',
			payload: {
				name: 'typeFilter',
				value: 'proforma'
			}
		})
		if (state.typeFilter === 'official') {
			dispatch({
				type: 'SET_SEARCH_TERM',
				payload: ''
			})
			dispatch({
				type: 'SET_PAGE',
				payload: 1
			})
			dispatch({
				type: 'SET_TOTAL_PAGES',
				payload: 1
			})
		}
	}, [])

	const handleClickCreate = () => {
		navigate('/app/invoice/proforma/specs')
	}

	return (
		<>
			<ListHeader
				title="Proforma Invoices"
				handleClick={() => handleClickCreate()}
				searchItem={state.searchTerm}
				placeHolderSearch="invoice number, client or company"
				filterList={(e: React.ChangeEvent<HTMLInputElement>) =>
					dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })
				}
				page={state.page}
				totalPages={state.totalPages}
				onChangePage={(direction) => {
					changePage(direction)
				}}
			></ListHeader>
			<hr />
			<ListTableProformaInvoice />
		</>
	)
}
