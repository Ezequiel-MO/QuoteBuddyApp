import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import baseAPI from '../../../axios/axiosConfig'
import { errorToastOptions, toastOptions } from '../../../helper/toast'
import LocationMasterForm from './LocationMasterForm'
import { LocationFormData } from './LocationFormData'

const LocationSpecs = () => {
	const navigate = useNavigate()

	const {
		state: { location }
	} = useLocation()

	const update = Object.keys(location).length > 0 ? true : false

	const submitForm = async (values, files, endpoint, update) => {
		let dataToPost
		try {
			if (update) {
				dataToPost = LocationFormData.update(values)
				await baseAPI.patch(`locations/${location._id}`, dataToPost)
				toast.success('Location Updated', toastOptions)
			}
			if (!update) {
				dataToPost = LocationFormData.create(values, files)
				await baseAPI.post('locations', dataToPost)
				toast.success('Location Created', toastOptions)
			}
			if (endpoint === 'locations/image') {
				dataToPost = LocationFormData.updateImageData(values, files)
				await baseAPI.patch(`locations/images/${location._id}`, dataToPost)
			}

			setTimeout(() => {
				navigate('/app/location')
			}, 1000)
		} catch (error) {
			toast.error(
				`Error Creating/Updating Location, ${error.response.data.message}`,
				errorToastOptions
			)
		}
	}

	return (
		<>
			<LocationMasterForm
				submitForm={submitForm}
				location={location}
				update={update}
			/>
		</>
	)
}

export default LocationSpecs
