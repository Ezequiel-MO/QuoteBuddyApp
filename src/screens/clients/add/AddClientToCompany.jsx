import { toast } from 'react-toastify'
import baseAPI from '../../../axios/axiosConfig'
import ClientMasterForm from '../specs/ClientMasterForm'
import { toastOptions } from '../../../helper/toast'

export const AddClientToCompany = ({ selectedCompanyName, setOpen }) => {
	const handleAddClientToCompany = async (values, endpoint = 'clients') => {
		let postedClient
		let newValues = { ...values, clientCompany: selectedCompanyName }

		try {
			const clients = await baseAPI.get(endpoint)
			const clientExists = clients.data.data.data.some(
				(client) => client.email === newValues.email
			)
			if (clientExists) {
				throw new Error(
					`This client already exists. Please, check the email: ${newValues.email}`
				)
			} else {
				const postedClientResponse = await baseAPI.post(endpoint, newValues)
				postedClient = postedClientResponse.data.data.data
				// Codifica caracteres especiales a su representación %xx basada en ASCII/UTF-8 para URLs
				const encodedNameCompany = encodeURIComponent(selectedCompanyName)
				const companyResponse = await baseAPI.get(
					`client_companies?name=${encodedNameCompany}`
				)

				const company = companyResponse.data.data.data

				const employees = [...company[0].employees, postedClient]
				const companyID = company[0]._id
				await baseAPI.patch(`client_companies/${companyID}`, {
					country: company[0].country,
					name: selectedCompanyName,
					employees
				})
			}
			toast.success('Client added successfully!', toastOptions)
			setOpen(false)
			return postedClient
		} catch (error) {
			toast.error(error.message)
		}
	}
	return (
		<>
			<ClientMasterForm submitForm={handleAddClientToCompany} />
		</>
	)
}
