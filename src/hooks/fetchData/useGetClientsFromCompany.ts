// Updated useGetClientsFromCompany.ts
import { IClientCompany } from '@interfaces/clientCompany'
import { useApiFetch } from './useApiFetch'
import { IClient } from '@interfaces/client'

export const useGetClientsFromCompany = (
	companyName: string,
	forceRefresh: number
) => {
	const url = companyName
		? `client_companies?name=${encodeURIComponent(companyName)}`
		: ''

	const { data, isLoading } = useApiFetch<IClientCompany[]>(
		url,
		forceRefresh,
		!!companyName // Only fetch if companyName exists
	)

	// Extract employees from first matching company
	const employees = data?.[0]?.employees || []

	return {
		isLoading,
		employees: employees as IClient[]
	}
}
