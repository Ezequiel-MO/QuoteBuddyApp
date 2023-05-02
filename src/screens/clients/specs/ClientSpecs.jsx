import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import baseAPI from '../../../axios/axiosConfig'
import { errorToastOptions, toastOptions } from '../../../helper/toast'
import ClientMasterForm from './ClientMasterForm'

const ClientSpecs = () => {
	const navigate = useNavigate()
	const {
		state: { client }
	} = useLocation()

	const submitForm = async (values, endpoint, update) => {
		try {
			if (update === false) {
				await baseAPI.post(`${endpoint}`, values)
				toast.success('Client Created', toastOptions)
			} else {
				await baseAPI.patch(`${endpoint}/${client._id}`, values)
				toast.success('Client Updated', toastOptions)
			}
			setTimeout(() => {
				navigate('/app/client')
			}, 1000)
		} catch (error) {
			toast.error(
				`Error Creating/Updating Client, ${error.message}`,
				errorToastOptions
			)
		}
	}
	return (
		<>
			<ClientMasterForm submitForm={submitForm} client={client} />
		</>
	)
}

export default ClientSpecs
