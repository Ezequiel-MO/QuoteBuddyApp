import { LocationFormFields } from './LocationFormFields'
import { useLocation } from '../context/LocationsContext'
import { useNavigate } from 'react-router-dom'
import { useImageModal } from '@hooks/images/useImageModal'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { createEntity } from 'src/helper/forms/createEntity'
import LocationImagesModal from '../images/LocationImagesModal'
import { resetLocationFilters } from './resetLocationFields'
import initialState from '../context/initialState'
import { ILocation } from '@interfaces/location'
import { Button } from '@components/atoms'

const LocationMasterForm = () => {
	const { state, dispatch } = useLocation()
	const navigate = useNavigate()
	const { openModal, closeModal } = useImageModal({ dispatch })

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const isUpdating = state.update

		if (isUpdating) {
			await updateEntity(
				'locations',
				state.currentLocation,
				state.locations || [],
				dispatch
			)
		} else {
			await createEntity(
				'locations',
				state.currentLocation,
				state.currentLocation?.imageContentUrl || [],
				dispatch
			)
		}
		resetLocationFilters(dispatch, initialState.currentLocation as ILocation)
		navigate('/app/location')
	}

	return (
		<form onSubmit={handleSubmit}>
			<LocationFormFields />
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
			<LocationImagesModal
				isOpen={state.imagesModal}
				onClose={closeModal}
				title="Add/Edit Location Images"
			/>
		</form>
	)
}

export default LocationMasterForm
