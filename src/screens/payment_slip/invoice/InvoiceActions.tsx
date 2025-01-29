import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IInvoice } from '@interfaces/invoice'
import { ICollectionFromClient } from '@interfaces/collectionFromClient'
import { ModalMenuActions } from 'src/components/atoms/modal/ModalMenuActions'
import { useInvoice } from '@screens/invoices/context/InvoiceContext'
import { Icon } from '@iconify/react'
import { usePaymentSlip } from '@screens/payment_slip/context/PaymentSlipContext'
import { ModalCollectionFromClientForm } from './ModalCollectionFromClientForm'
import { removeItemFromList } from 'src/helper/RemoveItemFromList'
import { useAuth } from 'src/context/auth/AuthProvider'

interface InvoiceActionsProps {
	invoice: IInvoice
}

export const InvoiceActions: FC<InvoiceActionsProps> = ({ invoice }) => {
	const { dispatch, state: stateInvoice } = useInvoice()

	const {
		stateProject: project,
		setIsUpdate,
		setCollectionFromClient,
		setForceRefresh: setForceRefreshPaymentSlip
	} = usePaymentSlip()

	const navigate = useNavigate()

	const { auth } = useAuth()

	const [openModal, setOpenModal] = useState(false)

	const handleOpenModalAddCollection = () => {
		dispatch({
			type: 'SET_INVOICE',
			payload: invoice
		})
		setCollectionFromClient({} as ICollectionFromClient)
		setOpenModal(true)
		setIsUpdate(false)
	}

	const handleViewInvoice = (invoice: IInvoice) => {
		dispatch({
			type: 'SET_INVOICE',
			payload: invoice
		})
		navigate(`invoice_specs/${invoice?._id}`)
	}

	return (
		<>
			<ModalCollectionFromClientForm open={openModal} setOpen={setOpenModal} />
			<ModalMenuActions item={invoice}>
				<div
					className="px-4 py-2 text-sm text-white-0 border-b border-gray-700"
					role="menuitem"
				>
					Invoice number: {invoice?.invoiceNumber}
				</div>
				<div
					className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-gray-700 cursor-pointer"
					role="menuitem"
					onClick={() => handleOpenModalAddCollection()}
				>
					<Icon icon="line-md:document-add" width={20} />
					Add new Collection
				</div>
				<div
					className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-gray-700 cursor-pointer"
					role="menuitem"
					onClick={() => handleViewInvoice(invoice)}
				>
					<Icon icon="material-symbols:preview" width={22} />
					View Invoice
				</div>
				{auth.role === 'admin' && invoice?.type === 'proforma' && (
					<div
						className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-gray-700 cursor-pointer transition-all duration-200 hover:text-red-500"
						role="menuitem"
						onClick={() => {
							removeItemFromList(
								'invoices',
								invoice._id as string,
								() => setForceRefreshPaymentSlip((prev) => prev + 1),
								project?.invoices as IInvoice[]
							)
						}}
					>
						<Icon icon="mdi:delete" width={20} />
						Delete Proforma
					</div>
				)}
			</ModalMenuActions>
		</>
	)
}
