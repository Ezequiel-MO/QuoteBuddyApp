import { ActivityFormFields } from './ActivityFormFields'
import { useActivity } from '../context/ActivitiesContext'
import { useNavigate } from 'react-router-dom'
import ActivityImagesModal from '../images/ActivityImagesModal'
import { toast } from 'react-toastify'
import { toastOptions } from 'src/helper/toast'
import baseAPI from 'src/axios/axiosConfig'

const ActivityMasterForm = () => {
	const { state, dispatch } = useActivity()
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
				const { imageContentUrl, ...activityData } = state.currentActivity || {}
				const response = await baseAPI.post('events', activityData, {
					headers: {
						'Content-Type': 'application/json'
					}
				})
				const newActivity = response.data.data.data
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
					await baseAPI.patch(`events/images/${newActivity._id}`, formData, {
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					})
				}
				dispatch({
					type: 'SET_ACTIVITY',
					payload: newActivity
				})
			} else {
				await baseAPI.patch(
					`events/${state.currentActivity?._id}`,
					state.currentActivity
				)
				toast.success('Activity updated successfully', toastOptions)
			}
			navigate('/app/activity')
		} catch (error: any) {
			toast.error(
				`Failed to create/update activity: ${error.message}`,
				toastOptions
			)
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<ActivityFormFields />
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
			<ActivityImagesModal
				isOpen={state.imagesModal}
				onClose={handleCloseModal}
				title="Add/Edit Activity Images"
			/>
		</form>
	)
}

export default ActivityMasterForm
