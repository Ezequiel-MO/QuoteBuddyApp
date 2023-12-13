import { filter } from 'src/helper'
import { useApiFetch } from './useApiFetch'
import { IClient } from '@interfaces/client'

interface Props {
	country?: string
	page?: number
	all?: string
}

export const useFetchClients = ({ country, page = 1, all }: Props) => {
	const valuesRute = [
		{ name: 'country', value: country === 'none' ? undefined : country }
	]
	let url = `clients?page=${page}&limit=10`

	if (country) {
		const filterOptions = ['country']
		url = filter({
			url: 'clients',
			valuesRute,
			filterOptions,
			page
		})
	}

	if (all === 'yes') {
		url = 'clients'
	}

	const {
		data: clients,
		setData: setClients,
		isLoading
	} = useApiFetch<IClient[]>(url)

	return { clients, setClients, isLoading }
}
