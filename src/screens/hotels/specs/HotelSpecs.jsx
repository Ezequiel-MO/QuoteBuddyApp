import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Spinner } from '../../../components/atoms/spinner/Spinner'
import { errorToastOptions, toastOptions } from '../../../helper/toast'
import { HotelMasterForm, useHotelForm } from '../'

export const HotelSpecs = () => {
	const navigate = useNavigate()
	const {
		state: { hotel }
	} = useLocation()

	const onSuccess = (update) => {
		toast.success(`${update ? 'Hotel Updated' : 'Hotel Created'}`, toastOptions)
		setTimeout(() => {
			navigate('/app/hotel')
		}, 1000)
	}

	const onError = (error) => {
		toast.error(
			`Error Creating/Updating Hotel, ${error.response.data.message}`,
			errorToastOptions
		)
	}

	const { isLoading, handleSubmit } = useHotelForm(onSuccess, onError, hotel)

	return (
		<div>
			{isLoading ? (
				<Spinner />
			) : (
				<HotelMasterForm submitForm={handleSubmit} hotel={hotel} />
			)}
		</div>
	)
}
