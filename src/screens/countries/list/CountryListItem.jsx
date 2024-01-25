import { useNavigate } from 'react-router-dom'
import { ButtonDeleteWithAuth } from '../../../components/atoms'
import { listStyles } from 'src/constants/listStyles'

const CountryListItem = ({ country, countries, setCountries }) => {
	const navigate = useNavigate()

	return (
		<tbody className={listStyles.tbody}>
			<tr className={listStyles.tr}>
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
				<td className={listStyles.td}>{country.accessCode}</td>
				<td>{country.quoteLanguage}</td>
				<td className="cursor-pointer">
					<ButtonDeleteWithAuth
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
