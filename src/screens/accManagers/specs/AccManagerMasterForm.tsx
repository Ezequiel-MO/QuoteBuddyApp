import { useNavigate } from 'react-router-dom'
import AccManagerImagesModal from '../images/AccManagerImagesModal'
import { useAccManager } from '../context/AccManagersContext'
import { useImageModal } from 'src/hooks/images/useImageModal'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { createEntity } from 'src/helper/forms/createEntity'
import { AccManagerFormFields } from './AccManagerFormFields'
import { resetAccManagerFilters } from './resetAccManagerFields'

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
			<AccManagerImagesModal
				isOpen={state.imagesModal}
				onClose={closeModal}
				title="Add/Edit Account Manager Images"
			/>
		</form>
	)
}

export default AccManagerMasterForm
