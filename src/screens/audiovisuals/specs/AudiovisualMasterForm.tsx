import { useNavigate } from 'react-router-dom'
import { useAudiovisual } from '../context/AudiovisualsContext'
import RestaurantImagesModal from '../images/AudiovisualImagesModal'
import { AudiovisualFormFields } from './AudiovisualFormFields'
import { useImageModal } from 'src/hooks/images/useImageModal'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { createEntity } from 'src/helper/forms/createEntity'
import { resetAudiovisualFilters } from './resetAudiovisualFields'
import { Button } from '@components/atoms'
import AudiovisualImagesModal from '../images/AudiovisualImagesModal'

const AudiovisualMasterForm = () => {
	const { state, dispatch } = useAudiovisual()
	const navigate = useNavigate()
	const { openModal, closeModal } = useImageModal({ dispatch })

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const isUpdating = state.update

		const audiovisualsWithEquipmentWithoutId = {
			...state.currentAudiovisual,
			equipmentList: state.currentAudiovisual?.equipmentList
				?.map(({ id, ...rest }) => rest) // strip out `id`
				.filter((item) => item.name && item.quantity > 0) // remove invalid items
		}

		if (isUpdating) {
			await updateEntity(
				'audiovisuals',
				audiovisualsWithEquipmentWithoutId,
				state.audiovisuals || [],
				dispatch
			)
		} else {
			await createEntity(
				'audiovisuals',
				audiovisualsWithEquipmentWithoutId,
				state.currentAudiovisual?.imageContentUrl || [],
				dispatch
			)
		}
		resetAudiovisualFilters(dispatch, {
			city: ''
		})
		navigate('/app/audiovisual')
	}
	return (
		<form onSubmit={handleSubmit}>
			<AudiovisualFormFields />
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
			<AudiovisualImagesModal
				isOpen={state.imagesModal}
				onClose={closeModal}
				title="Add/Edit Audiovisuals Images"
			/>
		</form>
	)
}

export default AudiovisualMasterForm
