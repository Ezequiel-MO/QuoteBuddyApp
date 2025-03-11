import { useApiFetch } from './fetchData/useApiFetch'
import { IClientCompany } from '../interfaces'

export function useGetCompanyByName(companyName: string) {
	const encodedCompanyName = encodeURIComponent(companyName || '')
	const url = companyName ? `client_companies?name=${encodedCompanyName}` : ''

	const { data: companies, isLoading } = useApiFetch<IClientCompany[]>(
		url,
		0,
		!!companyName
	)

	const company = companies && companies.length > 0 ? companies[0] : null

	return { company, isLoading }
}
