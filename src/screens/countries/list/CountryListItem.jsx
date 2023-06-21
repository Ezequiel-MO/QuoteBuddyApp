import { useNavigate } from 'react-router-dom'
import { ButtonDeleted } from '../../../components/atoms'

const CountryListItem = ({ country, countries, setCountries }) => {
	const navigate = useNavigate()

	return (
		<tbody>
			<tr className="mb-2 p-1 bg-gray-900 hover:bg-green-100 hover:text-black-50 rounded-md text-white-50">
				<td
					onClick={() =>
						navigate(`/app/country/specs`, {
							state: { country }
						})
					}
					className="hover:text-blue-600 hover:underline cursor-pointer"
				>
					{country.name}{' '}
				</td>
				<td>{country.accessCode}</td>
				<td>{country.quoteLanguage}</td>
				<td className="cursor-pointer">
					<ButtonDeleted
						endpoint={'countries'}
						ID={country._id}
						setter={setCountries}
						items={countries}
					/>
				</td>
			</tr>
		</tbody>
	)
}

export default CountryListItem
