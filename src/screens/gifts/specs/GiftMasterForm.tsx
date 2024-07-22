import { useNavigate } from 'react-router-dom'
import { useGift } from '../context/GiftsContext'
import { useImageModal } from 'src/hooks/images/useImageModal'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { createEntity } from 'src/helper/forms/createEntity'
import { GiftFormFields } from './GifFormFields'
import GiftImagesModal from '../images/GiftImagesModal'
import { resetGiftFilters } from './resetGiftFields'

export const GiftMasterForm = () => {
	const { state, dispatch } = useGift()
	const navigate = useNavigate()
	const { openModal, closeModal } = useImageModal({ dispatch })

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const isUpdating = state.update
		if (isUpdating) {
			await updateEntity(
				'gifts',
				state.currentGift,
				state.gifts || [],
				dispatch
			)
		} else {
			await createEntity(
				'gifts',
				state.currentGift,
				state.currentGift?.imageContentUrl || [],
				dispatch
			)
		}
		resetGiftFilters(dispatch, {
			price: 0
		})
		navigate('/app/gift')
	}

	return (
		<form onSubmit={handleSubmit}>
			<GiftFormFields />
			<div className="flex justify-center m-6">
				<button
					type="submit"
					className="mx-2 px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
				>
					Submit
				</button>
				<button
					type="button"
					onClick={openModal}
					className="mx-2 px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
				>
					Add/Edit Images
				</button>
			</div>
			<GiftImagesModal
				isOpen={state.imagesModal}
				onClose={closeModal}
				title="Add/Edit Gift Images"
			/>
		</form>
	)
}
