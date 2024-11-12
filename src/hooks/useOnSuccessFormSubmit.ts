import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { toastOptions } from '../helper/toast'

export const useOnSuccessFormSubmit = (
	title: string,
	slug: string,
	update: boolean
) => {
	const navigate = useNavigate()

	const onSuccess = useCallback(() => {
		toast.success(
			`${`${title} ${update ? 'Updated' : 'Created'}`}`,
			toastOptions
		)
		setTimeout(() => {
			if (slug) {
				navigate(`/app/${slug}`)
			} else {
				navigate(-1)
			}
		}, 2000)
	}, [navigate, title, slug, update])

	return { onSuccess }
}
