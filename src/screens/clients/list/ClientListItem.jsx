import { useNavigate } from 'react-router-dom'
import { useGetCountries } from '../../../hooks'
import { ButtonDeleted } from '../../../components/atoms'

const ClientListItem = ({ client, clients, setClients }) => {
	const navigate = useNavigate()

	const { countries } = useGetCountries(client.country)

	const country = countries.length > 0 ? countries[0].name : client.country

	return (
		<tbody>
			<tr className="mb-2 p-1 bg-gray-900 hover:bg-green-100 hover:text-black-50 rounded-md text-white-50">
				<td
					onClick={() =>
						navigate(`/app/client/specs`, {
							state: { client }
						})
					}
					className="hover:text-blue-600 hover:underline cursor-pointer"
				>{`${client.firstName} ${client.familyName}`}</td>
				<td>{client.email}</td>
				<td>{client.clientCompany}</td>
				<td>{country}</td>
				<td className="cursor-pointer">
					<ButtonDeleted
						endpoint={'clients'}
						ID={client._id}
						setter={setClients}
						items={clients}
					/>
				</td>
			</tr>
		</tbody>
	)
}

export default ClientListItem
