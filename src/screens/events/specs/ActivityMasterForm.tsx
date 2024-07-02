import { ActivityFormFields } from './ActivityFormFields'
import { useActivity } from '../context/ActivitiesContext'
import { useNavigate } from 'react-router-dom'
import ActivityImagesModal from '../images/ActivityImagesModal'
import { toast } from 'react-toastify'
import { toastOptions } from 'src/helper/toast'
import baseAPI from 'src/axios/axiosConfig'
import { useImageModal } from 'src/hooks/images/useImageModal'
import { uploadImages } from '@components/molecules/images/uploadImages'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { createEntity } from 'src/helper/forms/createEntity'
import { resetActivityFilters } from './resetActivityFields'

const ActivityMasterForm = () => {
	const { state, dispatch } = useActivity()
	const navigate = useNavigate()
	const { openModal, closeModal } = useImageModal({ dispatch })

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const isUpdating = state.update
		try {
			if (isUpdating) {
				await updateEntity(
					'events',
					state.currentActivity,
					state.activities || [],
					dispatch
				)
			} else {
				await createEntity(
					'events',
					state.currentActivity,
					state.currentActivity?.imageContentUrl || [],
					dispatch
				)
			}
			resetActivityFilters(dispatch, {
				city: '',
				price: 0
			})
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
					onClick={openModal}
					className="mx-2 px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
				>
					Add/Edit Images
				</button>
			</div>
			<ActivityImagesModal
				isOpen={state.imagesModal}
				onClose={closeModal}
				title="Add/Edit Activity Images"
			/>
		</form>
	)
}

export default ActivityMasterForm
