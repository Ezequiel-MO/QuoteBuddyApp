import { useNavigate } from 'react-router-dom'
import { ButtonDeleteWithAuth } from '../../../components/atoms'
import { listStyles } from 'src/constants/listStyles'
import { IClient } from '@interfaces/client'
import { useClient } from '../context/ClientContext'

interface ClientListItemProps {
	item: IClient
	canBeAddedToProject: boolean
}

const ClientListItem = ({
	item: client,
	canBeAddedToProject = false
}: ClientListItemProps) => {
	const { state, dispatch } = useClient()
	const navigate = useNavigate()

	const handleNavigateToClientSpecs = () => {
		dispatch({
			type: 'TOGGLE_UPDATE',
			payload: true
		})
		dispatch({
			type: 'SET_CLIENT',
			payload: client
		})
		navigate('/app/marketing/client/specs')
	}

	return (
		<tr className={listStyles.tr}>
			<td
				className="hover:text-blue-600 hover:underline cursor-pointer"
				onClick={handleNavigateToClientSpecs}
			>{`${client.firstName} ${client.familyName}`}</td>
			<td className={listStyles.td}>{client.email}</td>
			<td>{client.clientCompany}</td>
			<td>{client.country}</td>
			<td className="cursor-pointer">
				<ButtonDeleteWithAuth
					endpoint={'clients'}
					ID={client._id}
					setter={(updatedClients: IClient[]) =>
						dispatch({
							type: 'SET_CLIENTS',
							payload: updatedClients
						})
					}
					items={state.clients || []}
				/>
			</td>
		</tr>
	)
}

export default ClientListItem
