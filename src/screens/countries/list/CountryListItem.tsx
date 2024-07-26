import { ButtonDeleteWithAuth } from '../../../components/atoms'
import { listStyles } from 'src/constants/listStyles'
import { ICountry } from '@interfaces/country'
import { useCountry } from '../context/CountriesContext'
import { useNavigate } from 'react-router-dom'

interface CountryListItemProps {
	item: ICountry
	canBeAddedToProject: boolean
}

const CountryListItem: React.FC<CountryListItemProps> = ({
	item: country,
	canBeAddedToProject = false
}) => {
	const { state, dispatch } = useCountry()
	const navigate = useNavigate()

	const handleNavigateToCountrySpecs = () => {
		dispatch({
			type: 'TOGGLE_UPDATE',
			payload: true
		})
		dispatch({
			type: 'SET_COUNTRY',
			payload: country
		})
		navigate('/app/country/specs')
	}
	return (
		<tr className={listStyles.tr}>
			<td
				className="hover:text-blue-600 hover:underline cursor-pointer"
				onClick={handleNavigateToCountrySpecs}
			>
				{country.name}
			</td>
			<td className={listStyles.td}>{country.accessCode}</td>
			<td>{country.quoteLanguage}</td>
			<td className="cursor-pointer">
				<ButtonDeleteWithAuth
					endpoint={'countries'}
					ID={country._id}
					setter={(updatedCountries: ICountry[]) =>
						dispatch({
							type: 'SET_COUNTRIES',
							payload: updatedCountries
						})
					}
					items={state.countries || []}
				/>
			</td>
		</tr>
	)
}

export default CountryListItem
