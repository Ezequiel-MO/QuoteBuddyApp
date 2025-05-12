import { FC, useState } from 'react'
import { listStyles } from '@constants/styles/listStyles'
import { IClient } from '@interfaces/client'
import { useClient } from '../../context/ClientContext'
import baseAPI from 'src/axios/axiosConfig'
import { MenuRestoreActions } from 'src/components/atoms/modal/menu/MenuRestoreActions'
import { Icon } from '@iconify/react'
import { formatDate } from 'src/helper/formatDate'
import { ClientDetailModal } from './modal/ClientDetailModal'

interface ClientListRestoreItemProps {
	item: IClient
}

export const ClientListRestoreItem: FC<ClientListRestoreItemProps> = ({
	item: client
}) => {
	const { state, dispatch } = useClient()

	const [openModal, setOpenModal] = useState(false)

	const handleViewDetails = () => {
		setOpenModal(true)
	}

	const handleRestore = async (clientId: string) => {
		const updatedClients = state.clients.filter((el) => el._id !== clientId)
		await baseAPI.patch(`clients/isDeleted/true/${client._id}`)
		dispatch({ type: 'SET_CLIENTS', payload: updatedClients })
	}

	const handleDelete = async (clientId: string) => {
		const updatedClients = state.clients.filter((el) => el._id !== clientId)
		await baseAPI.delete(`clients/isDeleted/true/${client._id}`)
		dispatch({ type: 'SET_CLIENTS', payload: updatedClients })
	}

	return (
		<tr className={listStyles.tr}>
			<td
				className={`${listStyles.td} hover:text-blue-600 hover:underline flex items-center`}
			>
				<Icon
					icon="fluent:delete-arrow-back-16-regular"
					width={20}
					className="mr-1"
				/>
				{`${client?.firstName} ${client?.familyName}`}
			</td>
			<td className={listStyles.td}>{client?.email}</td>
			<td className={listStyles.td}>{client?.clientCompany}</td>
			<td className={listStyles.td}>{client?.country}</td>
			<td className={`${listStyles.td} text-red-500`}>
				{client.deletedAt ? formatDate(client?.deletedAt) : ''}
			</td>
			<td>
				<ClientDetailModal
					client={client}
					open={openModal}
					setOpen={setOpenModal}
				/>
				<MenuRestoreActions
					item={client}
					itemType="Client"
					itemName={`${client.firstName} ${client.familyName}`}
					onViewDetails={handleViewDetails}
					onRestore={(clientId) => handleRestore(clientId)}
					onDelete={(clientId) => handleDelete(clientId)}
				/>
			</td>
		</tr>
	)
}
