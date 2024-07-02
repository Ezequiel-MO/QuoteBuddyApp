import { useNavigate } from 'react-router-dom'
import { useEntertainment } from '../context/EntertainmentsContext'
import { EntertainmentFormFields } from './EntertainmentFormFields'
import EntertainmentImagesModal from '../images/EntertainmentImagesModal'
import { useImageModal } from 'src/hooks/images/useImageModal'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { createEntity } from 'src/helper/forms/createEntity'
import { resetEntertainmentFilters } from './resetEntertainmentFields'

export const EntertainmentMasterForm = () => {
	const { state, dispatch } = useEntertainment()
	const navigate = useNavigate()
	const { openModal, closeModal } = useImageModal({ dispatch })

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const isUpdating = state.update

		if (isUpdating) {
			await updateEntity(
				'entertainments',
				state.currentEntertainment,
				state.entertainments || [],
				dispatch
			)
		} else {
			await createEntity(
				'entertainments',
				state.currentEntertainment,
				state.currentEntertainment?.imageContentUrl || [],
				dispatch
			)
		}
		resetEntertainmentFilters(dispatch, {
			city: ''
		})
		navigate('/app/entertainment')
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
