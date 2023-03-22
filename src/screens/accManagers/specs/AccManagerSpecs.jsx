import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Spinner } from '../../../components/atoms/spinner/Spinner'
import { errorToastOptions, toastOptions } from '../../../helper/toast'
import AccManagerMasterForm from './AccManagerMasterForm'
import { useAccManagerSubmitForm } from './useAccManagerSubmitForm'

const AccManagerSpecs = () => {
	const navigate = useNavigate()
	const {
		state: { accManager }
	} = useLocation()

	const onSuccess = (update) => {
		toast.success(
			`${
				update
					? 'Accommodation Manager Updated'
					: 'Accommodation Manager Created'
			}`,
			toastOptions
		)
		setTimeout(() => {
			navigate('/app/accManager')
		}, 1000)
	}

	const onError = (error) => {
		toast.error(
			`Error Creating/Updating Accommodation Manager, ${error.response.data.message}`,
			errorToastOptions
		)
	}

	const { isLoading, handleSubmit } = useAccManagerSubmitForm({
		onSuccess: (update) => onSuccess(update),
		onError: (error) => onError(error),
		accManager
	})

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<AccManagerMasterForm
					submitForm={handleSubmit}
					accManager={accManager}
				/>
			)}
		</>
	)
}

export default AccManagerSpecs
