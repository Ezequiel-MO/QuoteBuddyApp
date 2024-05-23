import { ICountry } from '@interfaces/country'
import { useApiFetch } from './useApiFetch'
interface Props {
	accessCode?: string
}

export const useFetchCountries = (options: Props = {}) => {
	const { accessCode } = options
	let url = 'countries?sort=accessCode'
	if (accessCode) {
		url = `countries?accessCode=${accessCode}`
	}

	const {
		data: countries,
		setData: setCountries,
		isLoading
	} = useApiFetch<ICountry[]>(url)

	return { countries, isLoading, setCountries }
}
