import { LocationFormFields } from './LocationFormFields'
import { useLocation } from '../context/LocationsContext'
import { useNavigate } from 'react-router-dom'
import { useImageModal } from 'src/hooks/images/useImageModal'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { createEntity } from 'src/helper/forms/createEntity'
import LocationImagesModal from '../images/LocationImagesModal'
import { resetLocationFilters } from './resetLocationFields'
import initialState from '../context/initialState'
import { ILocation } from '@interfaces/location'

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
			<LocationImagesModal
				isOpen={state.imagesModal}
				onClose={closeModal}
				title="Add/Edit Location Images"
			/>
		</form>
	)
}

export default LocationMasterForm
