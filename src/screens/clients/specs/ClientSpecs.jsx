import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import baseAPI from '../../../axios/axiosConfig'
import { errorToastOptions, toastOptions } from '../../../helper/toast'
import ClientMasterForm from './ClientMasterForm'

export const ClientSpecs = ({ open, setOpen, dataCompany, setDataCompany }) => {
	const navigate = useNavigate()
	const {
		state: { client }
	} = useLocation()

	const submitForm = async (values, endpoint, update) => {
		try {
			if (update === false) {
				const dataCreate = await baseAPI.post(`${endpoint}`, values)
				toast.success('Client Created', toastOptions)
				//esto sirve para el componente "ModalClientForm.jsx"
				if (open) {
					const { firstName, familyName, _id } = dataCreate.data.data.data
					dataCreate.status === 201 &&
						setDataCompany({
							...dataCompany,
							employees: [
								dataCompany.employees,
								`${_id} ${firstName} ${familyName}`
							].flat(2)
						})
					return setOpen(false)
				}
			} else {
				await baseAPI.patch(`${endpoint}/${client._id}`, values)
				toast.success('Client Updated', toastOptions)
			}
			setTimeout(() => {
				navigate('/app/client')
			}, 1000)
		} catch (error) {
			toast.error(
				`Error Creating/Updating Client, ${error.response.data.message}`,
				errorToastOptions
			)
		}
	}
	return (
		<>
			<ClientMasterForm submitForm={submitForm} client={client ?? {}} />
		</>
	)
}

export default ClientSpecs
