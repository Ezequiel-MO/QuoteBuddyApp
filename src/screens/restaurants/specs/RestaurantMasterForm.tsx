import { useNavigate } from 'react-router-dom'
import { useRestaurant } from '../context/RestaurantsContext'
import RestaurantImagesModal from '../images/RestaurantImagesModal'
import { RestaurantFormFields } from './RestaurantFormFields'
import { useImageModal } from 'src/hooks/images/useImageModal'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { createEntity } from 'src/helper/forms/createEntity'
import { resetRestaurantFilters } from './resetRestaurantFields'
import { Button } from '@components/atoms'

const RestaurantMasterForm = () => {
	const { state, dispatch } = useRestaurant()
	const navigate = useNavigate()
	const { openModal, closeModal } = useImageModal({ dispatch })

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const isUpdating = state.update

		if (isUpdating) {
			await updateEntity(
				'restaurants',
				state.currentRestaurant,
				state.restaurants || [],
				dispatch
			)
		} else {
			await createEntity(
				'restaurants',
				state.currentRestaurant,
				state.currentRestaurant?.imageContentUrl || [],
				dispatch
			)
		}
		resetRestaurantFilters(dispatch, {
			city: '',
			isVenue: false,
			price: 0
		})
		navigate('/app/restaurant')
	}
	return (
		<form onSubmit={handleSubmit}>
			<RestaurantFormFields />
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
			<RestaurantImagesModal
				isOpen={state.imagesModal}
				onClose={closeModal}
				title="Add/Edit Restaurant Images"
			/>
		</form>
	)
}

export default RestaurantMasterForm
