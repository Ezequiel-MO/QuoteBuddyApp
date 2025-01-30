import React, { FC, useState } from 'react'
import { ICollectionFromClient } from 'src/interfaces'
import { ButtonDeleteWithAuth, Button } from 'src/components/atoms'
import { usePaymentSlip } from '@screens/payment_slip/context/PaymentSlipContext'
import { ModalCollectionFromClientForm } from './invoice/ModalCollectionFromClientForm'
import accounting from 'accounting'
import { ModalMenuActions } from "src/components/atoms/modal/ModalMenuActions"
import { useAuth } from 'src/context/auth/AuthProvider'
import { removeItemFromList } from 'src/helper/RemoveItemFromList'
import { Icon } from '@iconify/react'


interface CollectionsFromClientRowProps {
	collectionFromClient: ICollectionFromClient
}

export const CollectionsFromClientRow: FC<CollectionsFromClientRowProps> = ({
	collectionFromClient
}) => {
	const { stateProject, dispatch, setIsUpdate, setCollectionFromClient , setForceRefresh } =
		usePaymentSlip()
	const [openModalUpdate, setOpenModalUpdate] = useState(false)

    const { auth } = useAuth()

	const handleOpenUpdateModal = () => {
		setCollectionFromClient(collectionFromClient)
		setIsUpdate(true)
		setOpenModalUpdate(true)
	}

	const typesStatus = ['ISSUED', 'RECEIVED', 'PENDING']
	const isKnownStatus = typesStatus.includes(collectionFromClient.status)
	const statusColor = isKnownStatus ? 'text-green-400' : 'text-red-400'

	if (collectionFromClient.invoiceId) {
		return null
	}

	return (
		<tr className="hover:bg-gray-700 transition-colors">
			<td className="px-3 py-2 uppercase text-sm">
				"LEGACY"
			</td>
			<td align="left" className="px-3 py-2 uppercase text-sm">
				{collectionFromClient.type}
			</td>
			<td align="left" className="px-3 py-2 text-sm">
				{collectionFromClient.dueDate}
			</td>
			<td
				align="left"
				className={`px-3 py-2 text-sm uppercase font-semibold ${statusColor}`}
			>
				{collectionFromClient.status}
			</td>
			<td></td>
			<td align="left" className="px-3 py-2 text-sm">
				{accounting.formatMoney(collectionFromClient.amount, '€')}
			</td>
			<td align="left" className="px-4 py-1 text-sm relative">
				<ModalCollectionFromClientForm
					open={openModalUpdate}
					setOpen={setOpenModalUpdate}
				/>
				{/* Modal del menu de acciones */}
				<ModalMenuActions item={collectionFromClient}>
					<div className="px-4 py-2 text-sm text-white-0 border-b border-gray-700 uppercase" role="menuitem">
						collection
					</div>
					<div
						className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-gray-700 cursor-pointer"
						role="menuitem"
						onClick={() => handleOpenUpdateModal()}
					>
						<Icon icon="dashicons:update-alt" width={20} />
						Update Collection
					</div>
					{
						auth.role === "admin" &&
						<div
							className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-gray-700 cursor-pointer transition-all duration-200 hover:text-red-500"
							role="menuitem"
							onClick={() => {
								removeItemFromList(
									"collectionsFromClients",
									collectionFromClient?._id,
									() => setForceRefresh(prev => prev + 1),
									stateProject?.collectionsFromClient as ICollectionFromClient[]
								)
							}}
						>
							<Icon icon="mdi:delete" width={20} />
							Delete Collection
						</div>
					}
				</ModalMenuActions>
			</td>
		</tr>
	)
}
