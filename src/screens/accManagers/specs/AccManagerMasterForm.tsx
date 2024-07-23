import { useNavigate } from 'react-router-dom'
import AccManagerImagesModal from '../images/AccManagerImagesModal'
import { useAccManager } from '../context/AccManagersContext'
import { useImageModal } from 'src/hooks/images/useImageModal'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { createEntity } from 'src/helper/forms/createEntity'
import { AccManagerFormFields } from './AccManagerFormFields'
import { resetAccManagerFilters } from './resetAccManagerFields'
import { Button } from '@components/atoms'

const AccManagerMasterForm = () => {
	const { state, dispatch } = useAccManager()
	const navigate = useNavigate()
	const { openModal, closeModal } = useImageModal({ dispatch })

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const isUpdating = state.update

		if (isUpdating) {
			await updateEntity(
				'accManagers',
				state.currentAccManager,
				state.accManagers || [],
				dispatch
			)
		} else {
			await createEntity(
				'accManagers',
				state.currentAccManager,
				state.currentAccManager?.imageContentUrl || [],
				dispatch
			)
		}
		resetAccManagerFilters(dispatch, {})

		navigate('/app/accManager')
	}

	return (
		<form onSubmit={handleSubmit}>
			<AccManagerFormFields />
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
			<AccManagerImagesModal
				isOpen={state.imagesModal}
				onClose={closeModal}
				title="Add/Edit Account Manager Images"
			/>
		</form>
	)
}

export default AccManagerMasterForm
