import { ListHeader } from '@components/molecules'
import { IVendorInvoice } from '@interfaces/vendorInvoice'
import { useNavigate } from 'react-router-dom'
import { CreateBlankVendorInvoice } from '../context/CreateBlankVendorInvoice'
import { usePayment } from '../context/PaymentsProvider'
import { usePagination } from 'src/hooks/lists/usePagination'
import { ListTableVendorInvoice } from './ListTableVendorInvoice'
import { VendorTypeFilter } from './filter/VendorTypeFilter'
import { VendorIdFilter } from './filter/VendorIdFilter'
import { ProjectIdFilter } from './filter/ProjectIdFilter'

export const VendorInvoicesList = () => {
	const navigate = useNavigate()
	const { state, dispatch, setForceRefresh } = usePayment()

	const { changePage } = usePagination({ state, dispatch })

	const handleCreateNewItem = () => {
		const newVendorInvoice: IVendorInvoice = CreateBlankVendorInvoice()
		dispatch({
			type: 'ADD_VENDORINVOICE',
			payload: newVendorInvoice
		})
		dispatch({
			type: 'TOGGLE_UPDATE',
			payload: false
		})
		navigate('specs')
	}

	return (
		<>
			<ListHeader
				title="Vendor Invoices"
				handleClick={handleCreateNewItem}
				searchItem={state.searchTerm}
				placeHolderSearch="invoice number"
				filterList={(e: React.ChangeEvent<HTMLInputElement>) => {
					dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })
				}}
				page={state.page ?? 1}
				totalPages={state.totalPages ?? 1}
				onChangePage={(direction) => {
					changePage(direction)
					setForceRefresh((prev) => prev + 1)
				}}
			>
				<div className="w-52">
					<div className="mb-3">
						<ProjectIdFilter />
					</div>
					<VendorTypeFilter />
					<VendorIdFilter />
				</div>
			</ListHeader>
			<hr />
			<ListTableVendorInvoice />
		</>
	)
}
