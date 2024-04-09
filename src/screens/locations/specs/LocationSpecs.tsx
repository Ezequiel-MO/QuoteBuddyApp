import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import baseAPI from '../../../axios/axiosConfig'
import { errorToastOptions, toastOptions } from '../../../helper/toast'
import LocationMasterForm from './LocationMasterForm'
import { LocationFormData } from './LocationFormData'
import { ILocation } from '@interfaces/location'

interface LocationState {
	location?: ILocation
}

const LocationSpecs = () => {
	const navigate = useNavigate()
	const {
		state: { location }
	} = useLocation()

	const update = Object.keys(location).length > 0

	const submitForm = async (
		values: any,
		files: File[],
		endpoint: string,
		update: boolean
	) => {
		let dataToPost: FormData | any

		try {
			if (update && location) {
				dataToPost = LocationFormData.update(values)
				await baseAPI.patch(`locations/${location?._id}`, dataToPost)
				toast.success('Location Updated', toastOptions)
			} else {
				dataToPost = LocationFormData.create(values, files)
				await baseAPI.post('locations', dataToPost)
				toast.success('Location Created', toastOptions)
			}

			if (endpoint === 'locations/image' && location) {
				dataToPost = LocationFormData.updateImageData(values, files)
				await baseAPI.patch(`locations/images/${location._id}`, dataToPost)
			}

			setTimeout(() => {
				navigate('/app/location')
			}, 800)
		} catch (error: any) {
			toast.error(
				`Error Creating/Updating Location: ${error.response?.data?.message}`,
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
