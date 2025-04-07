import { useState } from 'react'
import { Spinner } from 'src/components/atoms/spinner/Spinner'
import { formatMoney } from 'src/helper'
import { usePayment } from '../../context/PaymentsProvider'
import { listStyles } from 'src/constants/listStyles'
import { TableHeaders } from 'src/ui'
import { Icon } from '@iconify/react'
import { formatDate } from 'src/helper/formatDate'
import { MenuRestoreActions } from 'src/components/atoms/modal/menu/MenuRestoreActions'
import baseAPI from 'src/axios/axiosConfig'
import { IVendorInvoice } from '@interfaces/vendorInvoice'
import { VendorInvoiceDetailModal } from './modal/VendorInvoiceDetailModal'

export const VendorInvoiceListRestoreItem = () => {
	const { state, isLoading, dispatch, filterIsDeleted } = usePayment()

	const [openModal, setOpenModal] = useState(false)

	const [vendorInvoiceModal, setVendorInvoiceModal] = useState<IVendorInvoice>()

	const handleViewDetails = (vendorInvoice: IVendorInvoice) => {
		setVendorInvoiceModal(vendorInvoice)
		setOpenModal(true)
	}

	const handleRestore = async (
		vendorInvoiceId: string,
		vendorInvoice: IVendorInvoice
	) => {
		const updatedVendorInvoices = state.vendorInvoices.filter(
			(el) => el._id !== vendorInvoiceId
		)
		await baseAPI.patch(`vendorInvoices/isDeleted/true/${vendorInvoice._id}`)
		dispatch({ type: 'SET_VENDORINVOICES', payload: updatedVendorInvoices })
	}

	const handleDelete = async (
		vendorInvoiceId: string,
		vendorInvoice: IVendorInvoice
	) => {
		const updatedVendorInvoices = state.vendorInvoices.filter(
			(el) => el._id !== vendorInvoiceId
		)
		await baseAPI.delete(`vendorInvoices/isDeleted/true/${vendorInvoice._id}`)
		dispatch({ type: 'SET_VENDORINVOICES', payload: updatedVendorInvoices })
	}

	if (!filterIsDeleted) {
		return null
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			<VendorInvoiceDetailModal
				vendorInvoice={vendorInvoiceModal}
				open={openModal}
				setOpen={setOpenModal}
			/>
			<table className={listStyles.table}>
				<TableHeaders headers="vendorInvoiceRestore" />
				{state.vendorInvoices?.map((vendorInvoice) => {
					return (
						<tr key={vendorInvoice?._id} className={listStyles.tr}>
							<td
								className={`${listStyles.td} hover:text-blue-600 hover:underline flex items-center`}
							>
								<Icon
									icon="fluent:delete-arrow-back-16-regular"
									width={20}
									className="mr-1"
								/>
								{vendorInvoice?.project?.code ?? 'PROJECT DELETED'}
							</td>
							<td className={listStyles.td}>
								{vendorInvoice.project?.accountManager[0] &&
									`${vendorInvoice?.project?.accountManager[0]?.firstName} 
                                    ${vendorInvoice?.project?.accountManager[0]?.familyName}` || 'ACC. MANAGER DELETED'}
							</td>
							<td  className={listStyles.td}>
								{vendorInvoice?.invoiceNumber}
							</td>
							<td className={listStyles.td}>
								{vendorInvoice?.invoiceDate}
							</td>
							<td className={listStyles.td}>
								{(vendorInvoice?.vendor as any)?.name ?? 
									(vendorInvoice?.vendor as any)?.company  ??
									(vendorInvoice?.vendor as any)?.email ?? 'VENDOR DELETED'}
							</td>
							<td  className={listStyles.td}>
								{vendorInvoice?.vendorType}
							</td>
							<td  className={listStyles.td}>
								{formatMoney(vendorInvoice?.amount)}
							</td>
							<td className={`${listStyles.td} text-red-500`}>
								{vendorInvoice.deletedAt
									? formatDate(vendorInvoice?.deletedAt)
									: ''}
							</td>
							<td className={listStyles.td}>
								<MenuRestoreActions
									item={vendorInvoice}
									itemType="Vendor Invoice"
									itemName={`${vendorInvoice.invoiceNumber}`}
									onViewDetails={() => handleViewDetails(vendorInvoice)}
									onRestore={(vendorInvoiceId) =>
										handleRestore(vendorInvoiceId, vendorInvoice)
									}
									onDelete={(vendorInvoiceId) =>
										handleDelete(vendorInvoiceId, vendorInvoice)
									}
								/>
							</td>
						</tr>
					)
				})}
			</table>
		</>
	)
}
