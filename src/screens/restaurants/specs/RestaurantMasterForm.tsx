import { useNavigate } from 'react-router-dom'
import { useRestaurant } from '../context/RestaurantsContext'
import RestaurantImagesModal from '../images/RestaurantImagesModal'
import { RestaurantFormFields } from './RestaurantFormFields'
import baseAPI from 'src/axios/axiosConfig'
import { toast } from 'react-toastify'
import { toastOptions } from 'src/helper/toast'

const RestaurantMasterForm = () => {
	const { state, dispatch } = useRestaurant()
	const navigate = useNavigate()
	const handleOpenModal = () => {
		dispatch({
			type: 'SET_IMAGES_MODAL_OPEN',
			payload: true
		})
	}

	const handleCloseModal = () => {
		dispatch({
			type: 'SET_IMAGES_MODAL_OPEN',
			payload: false
		})
	}
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			if (!state.update) {
				const { imageContentUrl, ...restaurantData } =
					state.currentRestaurant || {}
				const response = await baseAPI.post('restaurants', restaurantData, {
					headers: {
						'Content-Type': 'application/json'
					}
				})
				const newRestaurant = response.data.data.data
				if (imageContentUrl && imageContentUrl.length > 0) {
					const imageFiles = await Promise.all(
						imageContentUrl.map(async (url) => {
							const response = await fetch(url)
							const blob = await response.blob()
							const file = new File([blob], 'image.jpg', { type: blob.type })
							return file
						})
					)
					const formData = new FormData()
					imageFiles.forEach((file) => {
						formData.append('imageContentUrl', file)
					})
					await baseAPI.patch(
						`restaurants/images/${newRestaurant._id}`,
						formData,
						{
							headers: {
								'Content-Type': 'multipart/form-data'
							}
						}
					)
				}
				dispatch({
					type: 'SET_RESTAURANT',
					payload: newRestaurant
				})
				toast.success('Restaurant created successfully', toastOptions)
			} else {
				await baseAPI.patch(
					`restaurants/${state.currentRestaurant?._id}`,
					state.currentRestaurant
				)
				toast.success('Restaurant updated successfully', toastOptions)
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
					onClick={handleOpenModal}
					className="mx-2 px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
				>
					Add/Edit Images
				</button>
			</div>
			<RestaurantImagesModal
				isOpen={state.imagesModal}
				onClose={handleCloseModal}
				title="Add/Edit Restaurant Images"
			/>
		</form>
	)
}

export default RestaurantMasterForm
