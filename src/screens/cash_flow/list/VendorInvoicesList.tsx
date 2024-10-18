import { ListHeader } from '@components/molecules'
import { IVendorInvoice } from '@interfaces/vendorInvoice'
import { useNavigate } from 'react-router-dom'
import { useVendorInvoiceList } from './useVendorInvoiceList'
import { CreateBlankVendorInvoice } from '../context/CreateBlankVendorInvoice'
import { usePayment } from '../context/PaymentsProvider'
import { usePagination } from 'src/hooks/lists/usePagination'
import { ListTableVendorInvoice } from "./ListTableVendorInvoice"


export const VendorInvoicesList = () => {

	const navigate = useNavigate()
	const {
		state,
		dispatch,
		setForceRefresh
	} = usePayment()

	const { changePage } = usePagination({ state, dispatch })


	const handleCreateNewItem = () => {
		const newVendorInvoice: IVendorInvoice = CreateBlankVendorInvoice()
		dispatch({
			type: 'ADD_VENDORINVOICE',
			payload: newVendorInvoice
		})
		dispatch({
			type: "TOGGLE_UPDATE",
			payload: false
		})
		navigate('specs')
	}

	return (
		<>
			<ListHeader title="Vendor Invoices"
				handleClick={handleCreateNewItem}
				searchItem={state.searchTerm}
				placeHolderSearch='invoice number'
				filterList={(e: React.ChangeEvent<HTMLInputElement>) => {
					console.log(e)
					dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })
				}}
				page={state.page ?? 1}
				totalPages={state.totalPages ?? 1}
				onChangePage={(direction) => {
					changePage(direction)
					setForceRefresh((prev) => prev + 1)
				}}
			/>
			<hr />
			<ListTableVendorInvoice />
		</>
	)
}
