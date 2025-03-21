import baseAPI from '@axios/axiosConfig'

// src/client/services/demoRequest.ts
interface DemoRequestData {
	email: string
	explanation: string
}

/**
 * Submits a demo request to the API
 * @param data - Object containing email and explanation
 * @returns Promise that resolves when request completes successfully
 * @throws Error when request fails
 */
export const submitDemoRequest = async (
	data: DemoRequestData
): Promise<void> => {
	try {
		const response = await baseAPI.post('demo-requests', data)
		return response.data
	} catch (error) {
		console.error('Demo request error:', error)
		throw error // Re-throw to let the component handle the error
	}
}
