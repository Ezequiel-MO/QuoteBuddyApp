import { ActivityFormFields } from './ActivityFormFields'
import { useActivity } from '../context/ActivitiesContext'
import { useNavigate } from 'react-router-dom'
import ActivityImagesModal from '../images/ActivityImagesModal'
import { useImageModal } from '@hooks/images/useImageModal'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { createEntity } from 'src/helper/forms/createEntity'
import { resetActivityFilters } from './resetActivityFields'
import { Button } from '@components/atoms'

const ActivityMasterForm = () => {
	const { state, dispatch } = useActivity()
	const navigate = useNavigate()
	const { openModal, closeModal } = useImageModal({ dispatch })

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const isUpdating = state.update

		if (isUpdating) {
			await updateEntity(
				'events',
				state.currentActivity,
				state.activities || [],
				dispatch
			)
		} else {
			const dataCreateActivity = {
				...state.currentActivity,
				imageUrlCaptions: [],
				imageContentUrl: []
			}
			await createEntity(
				'events',
				dataCreateActivity,
				state.currentActivity?.imageUrlCaptions || [],
				dispatch
			)
		}
		resetActivityFilters(dispatch, {
			city: '',
			price: 0
		})
		navigate('/app/activity')
	}

	return (
		<form onSubmit={handleSubmit}>
			<ActivityFormFields />
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
			<ActivityImagesModal
				isOpen={state.imagesModal}
				onClose={closeModal}
				title="Add/Edit Activity Images"
			/>
		</form>
	)
}

export default ActivityMasterForm
