import { useLocation } from 'react-router-dom'
import { Spinner } from '../../../components/atoms/spinner/Spinner'
import AccManagerMasterForm from './AccManagerMasterForm'
import { useSubmitForm } from './useSubmitForm'

const AccManagerSpecs = () => {
	const {
		state: { accManager }
	} = useLocation()

	const { submitForm, isSubmitting } = useSubmitForm(accManager)

	return (
		<>
			{isSubmitting ? (
				<Spinner />
			) : (
				<AccManagerMasterForm submitForm={submitForm} accManager={accManager} />
			)}
		</>
	)
}

export default AccManagerSpecs
