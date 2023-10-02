import { useLocation } from 'react-router-dom'
import { Spinner } from '../../../components/atoms/spinner/Spinner'
import AccManagerMasterForm from './AccManagerMasterForm'

import {
	useOnErrorFormSubmit,
	useOnSuccessFormSubmit,
	useSubmitForm
} from '../../../hooks'
import { IAccManager } from '@interfaces/accManager'
import { AccManagerFormData } from './AccManagerFormData'

const AccManagerSpecs = () => {
	const location = useLocation()
	const accManager = (location.state as { accManager: IAccManager }).accManager

	const update = Object.keys(accManager).length > 0

	const { onSuccess } = useOnSuccessFormSubmit(
		'Account Manager',
		'accManager',
		update
	)
	const { onError } = useOnErrorFormSubmit('Account Manager')

	const { isLoading, handleSubmit } = useSubmitForm({
		onSuccess,
		onError,
		item: accManager as IAccManager,
		formDataMethods: AccManagerFormData
	})

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<AccManagerMasterForm
					submitForm={handleSubmit}
					accManager={accManager}
					update={update}
				/>
			)}
		</>
	)
}

export default AccManagerSpecs
