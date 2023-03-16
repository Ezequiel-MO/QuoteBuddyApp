import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { errorToastOptions, toastOptions } from '../../../helper/toast'
import { useRestaurantSubmitForm } from '../'
import RestaurantMasterForm from './RestaurantMasterForm'
import { Spinner } from '../../../components/atoms'

const RestaurantSpecs = () => {
	const navigate = useNavigate()
	const {
		state: { restaurant }
	} = useLocation()

	const onSuccess = (update) => {
		toast.success(
			`${update ? 'Restaurant Updated' : 'Restaurant Created'}`,
			toastOptions
		)
		setTimeout(() => {
			navigate('/app/restaurant')
		}, 1000)
	}

	const onError = (error) => {
		toast.error(
			`Error Creating/Updating Restaurant, ${error.response.data.message}`,
			errorToastOptions
		)
	}

	const { isLoading, handleSubmit } = useRestaurantSubmitForm({
		onSuccess: (update) => onSuccess(update),
		onError: (error) => onError(error),
		restaurant
	})

	return (
		<div>
			{isLoading ? (
				<Spinner />
			) : (
				<RestaurantMasterForm
					submitForm={handleSubmit}
					restaurant={restaurant}
				/>
			)}
		</div>
	)
}

export default RestaurantSpecs
