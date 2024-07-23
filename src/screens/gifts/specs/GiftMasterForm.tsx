import { useNavigate } from 'react-router-dom'
import { useGift } from '../context/GiftsContext'
import { useImageModal } from 'src/hooks/images/useImageModal'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { createEntity } from 'src/helper/forms/createEntity'
import { GiftFormFields } from './GifFormFields'
import GiftImagesModal from '../images/GiftImagesModal'
import { resetGiftFilters } from './resetGiftFields'
import { Button } from '@components/atoms'

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
				<Button type="submit" icon="iconoir:submit-document" widthIcon={30}>
					{state.update ? 'Edit & Exit' : 'Submit'}
				</Button>
				<Button
					type="button"
					handleClick={openModal}
					icon="ph:image-light"
					widthIcon={30}
				>
					Add/Edit Images
				</Button>
			</div>
			<GiftImagesModal
				isOpen={state.imagesModal}
				onClose={closeModal}
				title="Add/Edit Gift Images"
			/>
		</form>
	)
}
