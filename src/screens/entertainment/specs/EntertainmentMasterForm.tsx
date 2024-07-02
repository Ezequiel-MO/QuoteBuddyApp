import { useNavigate } from 'react-router-dom'
import { useEntertainment } from '../context/EntertainmentsContext'
import baseAPI from 'src/axios/axiosConfig'
import { toast } from 'react-toastify'
import { toastOptions } from 'src/helper/toast'
import { EntertainmentFormFields } from './EntertainmentFormFields'
import EntertainmentImagesModal from '../images/EntertainmentImagesModal'
import { useImageModal } from 'src/hooks/images/useImageModal'
import { uploadImages } from '@components/molecules/images/uploadImages'

export const EntertainmentMasterForm = () => {
	const { state, dispatch } = useEntertainment()
	const navigate = useNavigate()
	const { openModal, closeModal } = useImageModal({ dispatch })

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const isUpdating = state.update
		try {
			if (isUpdating) {
				await baseAPI.patch(
					`entertainments/${state.currentEntertainment?._id}`,
					state.currentEntertainment
				)
				toast.success('Entertainment updated successfully', toastOptions)
			} else {
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
				await uploadImages(
					'entertainments',
					newEntertainment._id,
					imageContentUrl || []
				)
				dispatch({
					type: 'SET_ENTERTAINMENT',
					payload: newEntertainment
				})
				toast.success('Entertainment created successfully', toastOptions)
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
					onClick={openModal}
					className="mx-2 px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
				>
					Add/Edit Images
				</button>
			</div>
			<EntertainmentImagesModal
				isOpen={state.imagesModal}
				onClose={closeModal}
				title="Add/Edit Entertainment Images"
			/>
		</form>
	)
}
