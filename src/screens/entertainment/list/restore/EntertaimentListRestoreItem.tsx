import { useState, FC } from 'react'
import { IEntertainment } from 'src/interfaces/entertainment'
import { listStyles } from '@constants/styles/listStyles'
import { useEntertainment } from '../../context/EntertainmentsContext'
import { formatDate } from 'src/helper/formatDate'
import { MenuRestoreActions } from 'src/components/atoms/modal/menu/MenuRestoreActions'
import baseAPI from 'src/axios/axiosConfig'
import { EntertaimentDetailModal } from './modal/EntertaimentDetailModal'
import { Icon } from '@iconify/react'

interface EntertaimentListRestoreItemProps {
	item: IEntertainment
	canBeAddedToProject: boolean
}

export const EntertaimentListRestoreItem: FC<
	EntertaimentListRestoreItemProps
> = ({ item: entertainmentShow }) => {
	const { state, dispatch } = useEntertainment()

	const [openModal, setOpenModal] = useState(false)

	const handleViewDetails = () => {
		setOpenModal(true)
	}

	const handleRestore = async (entertainmentId: string) => {
		const updatedEntertainments = state.entertainments.filter(
			(el) => el._id !== entertainmentId
		)
		await baseAPI.patch(
			`entertainments/isDeleted/true/${entertainmentShow._id}`
		)
		dispatch({ type: 'SET_ENTERTAINMENTS', payload: updatedEntertainments })
	}

	const handleDelete = async (entertainmentId: string) => {
		const updatedEntertainments = state.entertainments.filter(
			(el) => el._id !== entertainmentId
		)
		await baseAPI.delete(
			`entertainments/isDeleted/true/${entertainmentShow._id}`
		)
		dispatch({ type: 'SET_ENTERTAINMENTS', payload: updatedEntertainments })
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
				{entertainmentShow.name}
			</td>
			<td className={listStyles.td}>{entertainmentShow.city}</td>
			<td className={listStyles.td}>{entertainmentShow.vendor}</td>
			<td className={listStyles.td}>{entertainmentShow.category}</td>
			<td className={`${listStyles.td} text-red-500`}>
				{entertainmentShow?.deletedAt
					? formatDate(entertainmentShow.deletedAt)
					: ''}
			</td>
			<td className={`${listStyles.td}`}>
				<EntertaimentDetailModal
					entertainment={entertainmentShow}
					open={openModal}
					setOpen={setOpenModal}
				/>
				<MenuRestoreActions
					item={entertainmentShow}
					itemType="Entertaiment Show"
					onViewDetails={handleViewDetails}
					onRestore={(entertainmentId) => handleRestore(entertainmentId)}
					onDelete={(entertainmentId) => handleDelete(entertainmentId)}
					key={entertainmentShow._id}
				/>
			</td>
		</tr>
	)
}
