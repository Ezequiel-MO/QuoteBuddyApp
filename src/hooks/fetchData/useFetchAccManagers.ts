import { IAccManager } from '@interfaces/accManager'
import { useApiFetch } from './useApiFetch'

interface Props {
	query?: string
	page?: number
}

export function useFetchAccManagers(options: Props = {}) {
	const { query, page } = options
	let url = 'accManagers'
	if (query) {
		url += `?email=${query}`
	} else if (page !== undefined) {
		url += `?page=${page}&limit=10`
	}

	const {
		data,
		setData: setAccManagers,
		isLoading
	} = useApiFetch<IAccManager | IAccManager[]>(url)

	const accManagers = query && data.length > 0 ? data[0] : data

	return { accManagers, setAccManagers, isLoading }
}
