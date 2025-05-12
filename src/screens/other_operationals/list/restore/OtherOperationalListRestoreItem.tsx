import { FC, useState } from 'react'
import { IOtherOperational } from 'src/interfaces/otherOperational'
import { listStyles } from '@constants/styles/listStyles'
import { formatDate } from 'src/helper/formatDate'
import { useOtherOperational } from '../../context/OtherOperationalsContext'
import { OtherOperationalDetailModal } from './modal/OtherOperationalDetailModal'
import baseAPI from 'src/axios/axiosConfig'
import { MenuRestoreActions } from 'src/components/atoms/modal/menu/MenuRestoreActions'
import { Icon } from '@iconify/react'

interface OtherOperationalListRestoreItemProps {
	item: IOtherOperational
}

export const OtherOperationalListRestoreItem: FC<
	OtherOperationalListRestoreItemProps
> = ({ item: otherOperational }) => {
	const { state, dispatch } = useOtherOperational()

	const [openModal, setOpenModal] = useState(false)

	const handleViewDetails = () => {
		setOpenModal(true)
	}

	const handleRestore = async (otherOperationalId: string) => {
		const updatedOtherOperationals = state.otherOperationals.filter(
			(el) => el._id !== otherOperationalId
		)
		await baseAPI.patch(
			`OtherOperationals/isDeleted/true/${otherOperationalId}`
		)
		dispatch({
			type: 'SET_OTHEROPERATIONALS',
			payload: updatedOtherOperationals
		})
	}

	const handleDelete = async (otherOperationalId: string) => {
		const updatedOtherOperationals = state.otherOperationals.filter(
			(el) => el._id !== otherOperationalId
		)
		await baseAPI.delete(
			`OtherOperationals/isDeleted/true/${otherOperationalId}`
		)
		dispatch({
			type: 'SET_OTHEROPERATIONALS',
			payload: updatedOtherOperationals
		})
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
				{otherOperational.name}
			</td>
			<td className={listStyles.td}>{otherOperational.city}</td>
			<td className={`${listStyles.td} text-red-500`}>
				{otherOperational?.deletedAt
					? formatDate(otherOperational?.deletedAt)
					: ''}
			</td>
			<td className={`${listStyles.td}`}>
				<OtherOperationalDetailModal
					otherOperational={otherOperational}
					open={openModal}
					setOpen={setOpenModal}
				/>
				<MenuRestoreActions
					item={otherOperational}
					itemType="Other Operational"
					onViewDetails={handleViewDetails}
					onRestore={(otherOperationalId) => handleRestore(otherOperationalId)}
					onDelete={(otherOperationalId) => handleDelete(otherOperationalId)}
					key={otherOperational._id}
				/>
			</td>
		</tr>
	)
}
