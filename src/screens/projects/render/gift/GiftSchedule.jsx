import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../helper/toast'
import { useCurrentProject } from '../../../../hooks'
import { AddGiftButton } from './AddGiftButton'
import { GiftsCardList } from './GiftsCardList'

export const GiftSchedule = () => {
	const navigate = useNavigate()
	const { currentProject, removeGiftFromProject, editGift } =
		useCurrentProject()

	const handleNavigate = () => {
		navigate('/app/gift')
	}

	const handleDeleteGift = (giftId) => {
		removeGiftFromProject({ id: giftId })
		toast.success('Gift Removed', toastOptions)
	}

	return (
		<div>
			<h1 className="underline text-orange-200">GIFTS</h1>
			<GiftsCardList
				gifts={currentProject.gifts}
				handleDeleteGift={handleDeleteGift}
				editGif={editGift}
			/>
			<AddGiftButton handleNavigate={handleNavigate} />
		</div>
	)
}
