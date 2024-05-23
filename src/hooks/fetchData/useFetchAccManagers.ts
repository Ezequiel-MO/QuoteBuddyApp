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
		data: accManagers,
		setData: setAccManagers,
		isLoading
	} = useApiFetch<IAccManager[]>(url)

	return { accManagers, setAccManagers, isLoading }
}
