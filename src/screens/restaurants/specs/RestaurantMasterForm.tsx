import { useNavigate } from 'react-router-dom'
import { useRestaurant } from '../context/RestaurantsContext'
import RestaurantImagesModal from '../images/RestaurantImagesModal'
import { RestaurantFormFields } from './RestaurantFormFields'
import baseAPI from 'src/axios/axiosConfig'
import { toast } from 'react-toastify'
import { toastOptions } from 'src/helper/toast'
import { useImageModal } from 'src/hooks/images/useImageModal'
import { uploadImages } from '@components/molecules/images/uploadImages'

const RestaurantMasterForm = () => {
	const { state, dispatch } = useRestaurant()
	const navigate = useNavigate()
	const { openModal, closeModal } = useImageModal({ dispatch })
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const isUpdating = state.update
		try {
			if (isUpdating) {
				await baseAPI.patch(
					`restaurants/${state.currentRestaurant?._id}`,
					state.currentRestaurant
				)
				toast.success('Restaurant updated successfully', toastOptions)
			} else {
				const { imageContentUrl, ...restaurantData } =
					state.currentRestaurant || {}
				const response = await baseAPI.post('restaurants', restaurantData, {
					headers: {
						'Content-Type': 'application/json'
					}
				})
				const newRestaurant = response.data.data.data
				await uploadImages(
					'restaurants',
					newRestaurant._id,
					imageContentUrl || []
				)
				dispatch({
					type: 'SET_RESTAURANT',
					payload: newRestaurant
				})
				toast.success('Restaurant created successfully', toastOptions)
			}
			navigate('/app/restaurant')
		} catch (error: any) {
			toast.error(
				`Failed to create/update restaurant: ${error.message}`,
				toastOptions
			)
		}
	}
	return (
		<form onSubmit={handleSubmit}>
			<RestaurantFormFields />
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
			<RestaurantImagesModal
				isOpen={state.imagesModal}
				onClose={closeModal}
				title="Add/Edit Restaurant Images"
			/>
		</form>
	)
}

export default RestaurantMasterForm
