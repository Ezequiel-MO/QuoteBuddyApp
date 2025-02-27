import { useNavigate } from 'react-router-dom'
import { useEntertainment } from '../context/EntertainmentsContext'
import { EntertainmentFormFields } from './EntertainmentFormFields'
import EntertainmentImagesModal from '../images/EntertainmentImagesModal'
import { useImageModal } from '@hooks/images/useImageModal'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { createEntity } from 'src/helper/forms/createEntity'
import { resetEntertainmentFilters } from './resetEntertainmentFields'
import { Button } from '@components/atoms'

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
			<EntertainmentImagesModal
				isOpen={state.imagesModal}
				onClose={closeModal}
				title="Add/Edit Entertainment Images"
			/>
		</form>
	)
}
