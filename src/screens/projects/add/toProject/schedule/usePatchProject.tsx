import { useCallback } from 'react'
import baseAPI from '../../../../../axios/axiosConfig'

// Define the type for your patch project hook
type UsePatchProjectHook = (
	onSuccess: () => void,
	onError: (error: any) => void
) => (projectId: string, data: any) => Promise<void>

// Centralized error handler for better error management
const handleError = (error: any) => {
	// Here you could add logging or error tracking (like Sentry)
	console.error('Error in patchProject:', error)
}

// Use generic parameter for better type safety
export const usePatchProject: UsePatchProjectHook = (onSuccess, onError) => {
	const patchProject = useCallback(
		async (projectId: string, data: any) => {
			try {
				await baseAPI.patch(`projects/${projectId}`, data)
				onSuccess()
			} catch (error: any) {
				handleError(error) // Centralized error handling
				onError(error)
			}
		},
		[onSuccess, onError]
	)

	return patchProject
}
