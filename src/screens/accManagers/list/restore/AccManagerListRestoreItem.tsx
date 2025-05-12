import { FC, useState } from 'react'
import { listStyles } from '@constants/styles/listStyles'
import { IAccManager } from '@interfaces/accManager'
import { useAccManager } from '../../context/AccManagersContext'
import { Icon } from '@iconify/react'
import { formatDate } from 'src/helper/formatDate'
import { MenuRestoreActions } from 'src/components/atoms/modal/menu/MenuRestoreActions'
import baseAPI from 'src/axios/axiosConfig'
import { AccManagerDetailModal } from './modal/AccManagerDetailModal'

interface AccManagerListItemProps {
	item: IAccManager
}

export const AccManagerListRestoreItem: FC<AccManagerListItemProps> = ({
	item: accManager
}) => {
	const { state, dispatch } = useAccManager()

	const [openModal, setOpenModal] = useState(false)

	const handleViewDetails = () => {
		setOpenModal(true)
	}

	const handleRestore = async (accManagerId: string) => {
		const updatedAccManagers = state.accManagers.filter(
			(el) => el._id !== accManagerId
		)
		await baseAPI.patch(`accManagers/isDeleted/true/${accManager._id}`)
		dispatch({ type: 'SET_ACCMANAGERS', payload: updatedAccManagers })
	}

	const handleDelete = async (accManagerId: string) => {
		const updatedAccManagers = state.accManagers.filter(
			(el) => el._id !== accManagerId
		)
		await baseAPI.delete(`accManagers/isDeleted/true/${accManager._id}`)
		dispatch({ type: 'SET_ACCMANAGERS', payload: updatedAccManagers })
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
				{accManager.firstName}
			</td>
			<td className={listStyles.td}>{accManager.familyName}</td>
			<td className={listStyles.td}>{accManager.email}</td>
			<td className={`${listStyles.td} text-red-500`}>
				{accManager?.deletedAt ? formatDate(accManager.deletedAt) : ''}
			</td>
			<td className={`${listStyles.td}`}>
				<AccManagerDetailModal
					accManager={accManager}
					open={openModal}
					setOpen={setOpenModal}
				/>
				<MenuRestoreActions
					item={accManager}
					itemType="Acc Manager"
					itemName={`${accManager.firstName} ${accManager.familyName} `}
					onViewDetails={handleViewDetails}
					onRestore={(accManagerId) => handleRestore(accManagerId)}
					onDelete={(accManagerId) => handleDelete(accManagerId)}
					key={accManager._id}
				/>
			</td>
		</tr>
	)
}
