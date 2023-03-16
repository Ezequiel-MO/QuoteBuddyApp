import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import baseAPI from '../../../axios/axiosConfig'
import { errorToastOptions, toastOptions } from '../../../helper/toast'
import { RestaurantFormData } from '../'
import RestaurantMasterForm from './RestaurantMasterForm'

const RestaurantSpecs = () => {
	const navigate = useNavigate()
	const {
		state: { restaurant }
	} = useLocation()

	const submitForm = async (values, files, endpoint, update) => {
		let dataToPost
		try {
			if (update === false) {
				dataToPost = RestaurantFormData.create(values, files)
				await baseAPI.post('v1/restaurants', dataToPost)
				toast.success('Restaurant Created', toastOptions)
			} else if (endpoint == 'restaurants/image') {
				dataToPost = RestaurantFormData.updateImageData(values, files)
				await baseAPI.patch(
					`v1/restaurants/images/${restaurant._id}`,
					dataToPost
				)
				toast.success('Restaurant images Updated', toastOptions)
			} else {
				dataToPost = RestaurantFormData.update(values)
				await baseAPI.patch(`v1/restaurants/${restaurant._id}`, dataToPost)
				toast.success('Restaurant Updated', toastOptions)
			}
			setTimeout(() => {
				navigate('/app/restaurant')
			}, 1000)
		} catch (error) {
			toast.error(
				`Error Creating/Updating Restaurant, ${error.response.data.message}`,
				errorToastOptions
			)
		}
	}

	return (
		<>
			<RestaurantMasterForm submitForm={submitForm} restaurant={restaurant} />
		</>
	)
}

export default RestaurantSpecs
