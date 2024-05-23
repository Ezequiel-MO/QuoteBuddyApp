import { ButtonDeleteWithAuth } from '../../../components/atoms'
import { listStyles } from 'src/constants/listStyles'
import { ICountry } from '@interfaces/country'

interface CountryListItemProps {
	country: ICountry
	countries: ICountry[]
	setCountries: React.Dispatch<React.SetStateAction<ICountry[]>>
	handleNavigate: (country: ICountry) => void
}

const CountryListItem: React.FC<CountryListItemProps> = ({
	country,
	countries,
	setCountries,
	handleNavigate
}) => {
	return (
		<tbody className={listStyles.tbody}>
			<tr className={listStyles.tr}>
				<td
					onClick={() => handleNavigate(country)}
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
