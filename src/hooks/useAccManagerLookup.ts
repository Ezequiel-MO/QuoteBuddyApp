import { useApiFetch } from '@hooks/fetchData/useApiFetch'
import { IAccManager } from '@interfaces/accManager'

export const useAccManagerLookup = () => {
	// Use the existing useApiFetch hook to fetch account managers
	const { data: accManagers, isLoading } = useApiFetch<IAccManager[]>(
		'accManagers?limit=100'
	)

	// Function to find an account manager by ID
	const findAccManager = (id: string): IAccManager | undefined => {
		return accManagers?.find((manager) => manager._id === id)
	}

	// Get a formatted name for an account manager by ID
	const getAccManagerName = (
		idOrManager?: string | Partial<IAccManager>
	): string => {
		if (!idOrManager) return 'Unknown'

		// Handle string IDs immediately
		if (typeof idOrManager === 'string') {
			const manager = findAccManager(idOrManager)
			return manager?.firstName && manager?.familyName
				? `${manager.firstName} ${manager.familyName}`
				: idOrManager // Return raw ID if no manager found
		}

		// Handle object cases
		if (typeof idOrManager === 'object') {
			// Case 1: Already has name properties
			if (idOrManager.firstName && idOrManager.familyName) {
				return `${idOrManager.firstName} ${idOrManager.familyName}`
			}

			// Case 2: Extract ID from object (including MongoDB-style _id)
			const extractedId =
				idOrManager._id?.toString?.() || idOrManager._id?.toString?.()
			if (extractedId) {
				const manager = findAccManager(extractedId)
				return manager?.firstName && manager?.familyName
					? `${manager.firstName} ${manager.familyName}`
					: extractedId
			}

			// Case 3: Log detailed error for invalid objects
			console.warn('Invalid manager object format:', idOrManager)
			return 'Invalid Manager Data'
		}

		// Fallback for unexpected types
		console.warn('Unexpected manager reference type:', typeof idOrManager)
		return 'Unknown Manager'
	}

	return {
		accManagers: accManagers || [],
		loading: isLoading,
		findAccManager,
		getAccManagerName
	}
}
