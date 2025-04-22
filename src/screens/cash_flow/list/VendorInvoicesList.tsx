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
import { Button } from 'src/components/atoms'
import { useAuth } from 'src/context/auth/AuthProvider'
import { VendorInvoiceListRestoreItem } from './restore/VendorInvoiceListRestoreItem'

const classButton =
	'flex items-center uppercase  px-3 py-1 text-sm  text-white-0 bg-green-800 rounded-md shadow-lg transform transition duration-300 ease-in-out hover:bg-green-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-gray-900 active:scale-95'

export const VendorInvoicesList = () => {
	const navigate = useNavigate()

	const { auth } = useAuth()

	const {
		state,
		dispatch,
		setForceRefresh,
		isLoading,
		setFilterIsDeleted,
		filterIsDeleted
	} = usePayment()

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
				title={!filterIsDeleted ? 'Vendor Invoices' : 'Vendor Invoices Restore'}
				handleClick={() => {
					setFilterIsDeleted(false)
					handleCreateNewItem()
				}}
				titleCreate="Vendor Invoice"
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
			{auth.role === 'admin' && (
				<div className="flex justify-end -mt-10 mb-3 mr-2">
					<Button
						icon="hugeicons:data-recovery"
						widthIcon={20}
						type="button"
						handleClick={() => {
							setFilterIsDeleted((prev) => !prev)
							setForceRefresh((prev) => prev + 1)
						}}
					>
						{!filterIsDeleted ? `activate restore` : 'exit restore'}
					</Button>
				</div>
			)}
			<hr />
			{!filterIsDeleted ? (
				<ListTableVendorInvoice />
			) : (
				<div className="mb-40">
					<VendorInvoiceListRestoreItem />
				</div>
			)}
		</>
	)
}
