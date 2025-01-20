import React, { FC, useState } from 'react'
import { ICollectionFromClient } from 'src/interfaces'
import { ButtonDeleteWithAuth, Button } from 'src/components/atoms'
import { usePaymentSlip } from '@screens/payment_slip/context/PaymentSlipContext'
import { ModalCollectionFromClientForm } from './ModalCollectionFromClientForm'
import accounting from 'accounting'

interface CollectionsFromClientRowProps {
	collectionFromClient: ICollectionFromClient
}

export const CollectionsFromClientRow: FC<CollectionsFromClientRowProps> = ({
	collectionFromClient
}) => {
	const { stateProject, dispatch, setIsUpdate, setCollectionFromClient } =
		usePaymentSlip()
	const [openModalUpdate, setOpenModalUpdate] = useState(false)

	const handleOpenUpdateModal = () => {
		setCollectionFromClient(collectionFromClient)
		setIsUpdate(true)
		setOpenModalUpdate(true)
	}

	const typesStatus = ['ISSUED', 'RECEIVED', 'PENDING']
	const isKnownStatus = typesStatus.includes(collectionFromClient.status)
	const statusColor = isKnownStatus ? 'text-green-400' : 'text-red-400'

	return (
		<tr className="hover:bg-gray-700 transition-colors">
			<td className="px-4 py-2 uppercase text-sm">
				{collectionFromClient.type}
			</td>
			<td className="px-4 py-2 text-sm">{collectionFromClient.dueDate}</td>
			<td className="px-4 py-2 text-sm">
				{accounting.formatMoney(collectionFromClient.amount, '€')}
			</td>
			<td
				className={`px-4 py-2 text-sm uppercase font-semibold ${statusColor}`}
			>
				{collectionFromClient.status}
			</td>
			<td className="px-4 py-2">
				<ModalCollectionFromClientForm
					open={openModalUpdate}
					setOpen={setOpenModalUpdate}
				/>
				<Button
					newClass="
            inline-flex items-center gap-2 bg-blue-600
            hover:bg-blue-500 text-white uppercase text-xs font-medium
            py-1 px-3 rounded-md
            transition-transform transform active:scale-95
          "
					icon=""
					handleClick={handleOpenUpdateModal}
				>
					Update
				</Button>
			</td>
			<td className="px-4 py-2">
				<ButtonDeleteWithAuth
					endpoint={'collectionsFromClients'}
					ID={collectionFromClient._id}
					setter={(updatedCollectionsFromClient: ICollectionFromClient[]) =>
						dispatch({
							type: 'DELETED_COLLECTION_FROM_CLIENT',
							payload: { updatedCollectionsFromClient }
						})
					}
					items={stateProject?.collectionsFromClient || []}
				/>
			</td>
		</tr>
	)
}
