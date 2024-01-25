import { useNavigate } from 'react-router-dom'
import { ButtonDeleteWithAuth } from '../../../components/atoms'
import { useFetchCountries } from 'src/hooks/fetchData/useFetchCountries'
import { listStyles } from 'src/constants/listStyles'

const ClientListItem = ({ client, clients, setClients }) => {
	const navigate = useNavigate()

	const { countries } = useFetchCountries({ accessCode: client.country })

	const country = countries.length > 0 ? countries[0].name : client.country

	return (
		<tbody className={listStyles.tbody}>
			<tr className={listStyles.tr}>
				<td
					onClick={() =>
						navigate(`/app/client/specs`, {
							state: { client }
						})
					}
					className="hover:text-blue-600 hover:underline cursor-pointer"
				>{`${client.firstName} ${client.familyName}`}</td>
				<td className={listStyles.td}>{client.email}</td>
				<td>{client.clientCompany}</td>
				<td>{country}</td>
				<td className="cursor-pointer">
					<ButtonDeleteWithAuth
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
