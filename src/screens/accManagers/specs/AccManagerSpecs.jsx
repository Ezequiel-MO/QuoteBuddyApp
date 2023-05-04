import { useLocation } from 'react-router-dom'
import { Spinner } from '../../../components/atoms/spinner/Spinner'
import AccManagerMasterForm from './AccManagerMasterForm'
import { useAccManagerSubmitForm } from './useAccManagerSubmitForm'
import { useOnErrorFormSubmit, useOnSuccessFormSubmit } from '../../../hooks'

const AccManagerSpecs = () => {
	const {
		state: { accManager }
	} = useLocation()

	const update = Object.keys(accManager).length > 0
	const { onSuccess } = useOnSuccessFormSubmit(
		'Account Manager',
		'accManager',
		update
	)
	const { onError } = useOnErrorFormSubmit('Account Manager')

	const { isLoading, handleSubmit } = useAccManagerSubmitForm({
		onSuccess,
		onError,
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
