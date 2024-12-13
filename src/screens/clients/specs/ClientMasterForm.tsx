import { ClientFormFields } from './ClientFormFields'
import { useClient } from '../context/ClientContext'
import { useNavigate } from 'react-router-dom'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { createEntity } from 'src/helper/forms/createEntity'
import { resetClientFilters } from './resetClientFilters'
import { Button } from '@components/atoms'
import React from 'react'
import { IClient } from '@interfaces/client'


interface ClientMasterFormProps {
	handleAddClient?: (client:IClient) => void
}

const ClientMasterForm: React.FC<ClientMasterFormProps> = ({ handleAddClient }) => {
	const { state, dispatch, openAddClient } = useClient()
	const navigate = useNavigate()

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		event.stopPropagation()
		const isUpdating = state.update
		if (openAddClient && handleAddClient && state.currentClient) {
			handleAddClient(state.currentClient as IClient)
			return
		}
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
				<Button type="submit" icon="iconoir:submit-document" widthIcon={30}>
					{state.update ? 'Edit & Exit' : 'Submit'}
				</Button>
			</div>
		</form>
	)
}

export default ClientMasterForm
