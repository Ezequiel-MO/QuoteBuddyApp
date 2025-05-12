import { FC, useState } from 'react'
import { IGift } from 'src/interfaces'
import { listStyles } from '@constants/styles/listStyles'
import { Icon } from '@iconify/react'
import { formatDate } from 'src/helper/formatDate'
import { formatMoney } from 'src/helper/'
import { useGift } from '../../context/GiftsContext'
import { MenuRestoreActions } from 'src/components/atoms/modal/menu/MenuRestoreActions'
import baseAPI from 'src/axios/axiosConfig'
import { GiftDetailModal } from './modal/GiftDetailModal'

interface GiftListRestoreItemProps {
	item: IGift
}

export const GiftListRestoreItem: FC<GiftListRestoreItemProps> = ({
	item: gift
}) => {
	const { state, dispatch } = useGift()

	const [openModal, setOpenModal] = useState(false)

	const handleViewDetails = () => {
		setOpenModal(true)
	}

	const handleRestore = async (giftId: string) => {
		const updatedGifts = state.gifts.filter((el) => el._id !== giftId)
		await baseAPI.patch(`gifts/isDeleted/true/${gift._id}`)
		dispatch({ type: 'SET_GIFTS', payload: updatedGifts })
	}

	const handleDelete = async (giftId: string) => {
		const updatedGifts = state.gifts.filter((el) => el._id !== giftId)
		await baseAPI.delete(`gifts/isDeleted/true/${gift._id}`)
		dispatch({ type: 'SET_GIFTS', payload: updatedGifts })
	}

	return (
		<tr className={`${listStyles.tr}`}>
			<td
				className={`${listStyles.td} hover:text-blue-600 hover:underline flex items-center`}
			>
				<Icon
					icon="fluent:delete-arrow-back-16-regular"
					width={20}
					className="mr-1"
				/>
				{gift?.name}
			</td>
			<td className={listStyles.td}>
				{formatMoney(gift?.price ? gift?.price : 0)}
			</td>
			<td className={`${listStyles.td} text-red-500`}>
				{gift?.deletedAt ? formatDate(gift?.deletedAt) : ''}
			</td>
			<td className={`${listStyles.td}`}>
				<GiftDetailModal gift={gift} open={openModal} setOpen={setOpenModal} />
				<MenuRestoreActions
					item={gift}
					itemType="Restaurant"
					onViewDetails={handleViewDetails}
					onRestore={(giftId) => handleRestore(giftId)}
					onDelete={(giftId) => handleDelete(giftId)}
					key={gift._id}
				/>
			</td>
		</tr>
	)
}
