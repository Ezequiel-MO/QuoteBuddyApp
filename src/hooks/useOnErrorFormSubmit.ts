import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { errorToastOptions } from '../helper/toast'

export const useOnErrorFormSubmit = (title: string) => {
	const onError = useCallback(
		(error: any) => {
			toast.error(
				`Error Creating/Updating ${title}, ${
					error?.response?.data?.message ?? error.message
				}`,
				errorToastOptions
			)
		},
		[title]
	)

	return { onError }
}
