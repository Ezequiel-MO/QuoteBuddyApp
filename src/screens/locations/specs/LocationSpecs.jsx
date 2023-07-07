import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import baseAPI from '../../../axios/axiosConfig'
import { errorToastOptions, toastOptions } from '../../../helper/toast'
import LocationMasterForm from './LocationMasterForm'

const LocationSpecs = () => {
	const navigate = useNavigate()

	const {
		state: { location }
	} = useLocation()

	const update = Object.keys(location).length > 0 ? true : false

	const fillFormData = (values, files) => {
		let formData = new FormData()
		formData.append('name', values.name)
		formData.append('textContent', values.textContent)
		formData.append('location[coordinates][0]', values.latitude)
		formData.append('location[coordinates][1]', values.longitude)
		if (files.length > 0) {
			for (let i = 0; i < files.length; i++) {
				formData.append('imageContentUrl', files[i])
			}
		}
		return formData
	}

	const fillJSONData = (values) => {
		let jsonData = {}
		jsonData.name = values.name
		jsonData.textContent = values.textContent
		jsonData.location = {
			type: 'Point',
			coordinates: [values.latitude, values.longitude]
		}

		return jsonData
	}

	const submitForm = async (values, files, endpoint, update) => {
		let dataToPost
		try {
			if (update === false) {
				dataToPost = fillFormData(values, files)
				await baseAPI.post('locations', dataToPost)
				toast.success('Location Created', toastOptions)
			} else {
				dataToPost = fillJSONData(values)
				await baseAPI.patch(`locations/${location._id}`, dataToPost)
				toast.success('Location Updated', toastOptions)
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
