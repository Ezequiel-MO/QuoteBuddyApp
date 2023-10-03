import { useLocation } from 'react-router-dom'
import CountryMasterForm from './CountryMasterForm'
import { useCountrySubmit } from './useCountrySubmit'
import { Spinner } from '@components/atoms'
import { ICountry } from '@interfaces/country'
import {
	useOnErrorFormSubmit,
	useOnSuccessFormSubmit,
	useSubmitForm
} from 'src/hooks'
import { CountryFormData } from './countryFormData'

const CountrySpecs: React.FC = () => {
	const location = useLocation()
	const country = (location.state as { country: ICountry }).country

	const update = Object.keys(country).length > 0

	const { onSuccess } = useOnSuccessFormSubmit('Country', 'country', update)
	const { onError } = useOnErrorFormSubmit('Country')

	const { isLoading, handleSubmit } = useSubmitForm({
		onSuccess,
		onError,
		item: country as ICountry,
		formDataMethods: CountryFormData
	})

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<CountryMasterForm submitForm={handleSubmit} country={country} />
			)}
		</>
	)
}

export default CountrySpecs
