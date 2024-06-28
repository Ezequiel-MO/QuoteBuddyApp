import { useNavigate } from 'react-router-dom'
import { useEntertainment } from '../context/EntertainmentsContext'
import baseAPI from 'src/axios/axiosConfig'
import { toast } from 'react-toastify'
import { toastOptions } from 'src/helper/toast'
import { EntertainmentFormFields } from './EntertainmentFormFields'
import EntertainmentImagesModal from '../images/EntertainmentImagesModal'

export const EntertainmentMasterForm = () => {
	const { state, dispatch } = useEntertainment()
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
				const { imageContentUrl, ...entertainmentData } =
					state.currentEntertainment || {}
				const response = await baseAPI.post(
					'entertainments',
					entertainmentData,
					{
						headers: {
							'Content-Type': 'application/json'
						}
					}
				)
				const newEntertainment = response.data.data.data
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
						`entertainments/images/${newEntertainment._id}`,
						formData,
						{
							headers: {
								'Content-Type': 'multipart/form-data'
							}
						}
					)
				}
				dispatch({
					type: 'SET_ENTERTAINMENT',
					payload: newEntertainment
				})
				toast.success('Entertainment created successfully', toastOptions)
			} else {
				await baseAPI.patch(
					`entertainments/${state.currentEntertainment?._id}`,
					state.currentEntertainment
				)
				toast.success('Entertainment updated successfully', toastOptions)
			}
			navigate('/app/entertainment')
		} catch (error: any) {
			toast.error(
				`Failed to create/update entertainment: ${error.message}`,
				toastOptions
			)
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<EntertainmentFormFields />
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
			<EntertainmentImagesModal
				isOpen={state.imagesModal}
				onClose={handleCloseModal}
				title="Add/Edit Entertainment Images"
			/>
		</form>
	)
}
