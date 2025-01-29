// src/hooks/useApiPost.ts
import { useState } from 'react'
import baseAPI from 'src/axios/axiosConfig'
import { toast } from 'react-toastify'

interface UseApiPostReturn<T> {
	post: (data: any) => Promise<T | null>
	isLoading: boolean
	error: string | null
}

export function useApiPost<T>(url: string): UseApiPostReturn<T> {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const post = async (data: any): Promise<T | null> => {
		setIsLoading(true)
		setError(null)
		try {
			const response = await baseAPI.post<T>(url, data)
			return response.data
		} catch (err: any) {
			console.error('Error in useApiPost:', err)
			setError(
				err?.response?.data?.message || 'An error occurred while posting data.'
			)
			toast.error(err?.response?.data?.message || 'Failed to send message.', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined
			})
			return null
		} finally {
			setIsLoading(false)
		}
	}

	return { post, isLoading, error }
}
