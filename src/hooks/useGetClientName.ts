import { useMemo } from 'react'
import { useApiFetch } from './fetchData/useApiFetch'
import { IClient } from 'src/interfaces'

export const useGetClientName = (clientId: string) => {
	// Only fetch if we have a valid client ID
	const url = clientId ? `clients/${clientId}` : ''
	const shouldFetch = !!clientId

	// Use the existing useApiFetch hook
	const { data: client, isLoading } = useApiFetch<IClient>(url, 0, shouldFetch)

	// Format the client name
	const clientName = useMemo(() => {
		if (isLoading) return ''
		if (!client || !client.firstName) return 'No client'

		return `${client.firstName} ${client.familyName}`
	}, [client, isLoading])

	return { clientName, isLoading }
}
