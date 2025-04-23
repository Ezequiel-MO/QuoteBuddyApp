import { useApiFetch } from '@hooks/fetchData/useApiFetch'
import { IAccManager } from '@interfaces/accManager'
import { useEffect } from 'react'

export const useAccManagerLookup = () => {
	// Use the existing useApiFetch hook to fetch account managers
	const { data: accManagers, isLoading } = useApiFetch<IAccManager[]>(
		'accManagers?limit=100'
	)

	// Log the fetched account managers when the data changes
	useEffect(() => {
		if (accManagers) {
			console.log('useAccManagerLookup: Fetched managers:', accManagers)
		}
	}, [accManagers])

	// Function to find an account manager by ID
	const findAccManager = (id: string): IAccManager | undefined => {
		return accManagers?.find((manager) => manager._id === id)
	}

	// Get a formatted name for an account manager by ID
	const getAccManagerName = (id?: string): string => {
		if (!id) return 'Unknown'

		const manager = findAccManager(id)
		if (manager) {
			return `${manager.firstName} ${manager.familyName}`
		}
		console.log(`useAccManagerLookup: Manager not found for ID: ${id}`)
		return id // Fall back to ID if the account manager is not found
	}

	return {
		accManagers: accManagers || [],
		loading: isLoading,
		findAccManager,
		getAccManagerName
	}
}
