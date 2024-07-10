import { ClientFormFields } from './ClientFormFields'
import { useClient } from '../context/ClientContext'
import { useNavigate } from 'react-router-dom'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { createEntity } from 'src/helper/forms/createEntity'
import { resetClientFilters } from './resetClientFilters'

const ClientMasterForm = () => {
	const { state, dispatch } = useClient()
	const navigate = useNavigate()
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		event.stopPropagation()

		const isUpdating = state.update

		if (isUpdating) {
			await updateEntity(
				'clients',
				state.currentClient,
				state.clients || [],
				dispatch
			)
		} else {
			await createEntity('clients', state.currentClient, [], dispatch)
		}
		resetClientFilters(dispatch, {
			country: ''
		})
		navigate('/app/marketing/client')
	}

	return (
		<form onSubmit={handleSubmit}>
			<ClientFormFields />
			<div className="flex justify-center m-6">
				<button
					type="submit"
					className="mx-2 px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
				>
					Submit
				</button>
			</div>
		</form>
	)
}

export default ClientMasterForm
