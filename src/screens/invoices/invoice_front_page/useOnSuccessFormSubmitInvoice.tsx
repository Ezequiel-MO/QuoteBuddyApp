import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { toastOptions } from 'src/helper/toast'

export const useOnSuccessFormSubmitInvoice = (title: string, update: boolean) => {
	const navigate = useNavigate()

	const onSuccess = useCallback(() => {
		toast.success(
			`${`${title} ${update ? 'Updated' : 'Created'}`}`,
			toastOptions
		)
		setTimeout(() => {
			navigate(-1)
		}, 2000)
	}, [navigate, title, update])

	return { onSuccess }
}
