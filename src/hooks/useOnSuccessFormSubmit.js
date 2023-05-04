import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { toastOptions } from '../helper/toast'

export const useOnSuccessFormSubmit = (title, endpoint, update) => {
	const navigate = useNavigate()

	const onSuccess = useCallback(() => {
		toast.success(
			`${`${title} ${update ? 'Updated' : 'Created'}`}`,
			toastOptions
		)
		setTimeout(() => {
			navigate(`/app/${endpoint}`)
		}, 1000)
	}, [navigate, title, endpoint, update])

	return { onSuccess }
}
