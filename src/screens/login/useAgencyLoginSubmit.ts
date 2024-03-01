import { FormEvent, useState } from 'react'
import baseAPI from '../../axios/axiosConfig'
import { IAlert } from './Login'

interface Props {
	email: string
	password: string
	setAlert: (alert: IAlert) => void
	onAgencySuccess: (data: any) => void
	onError: (error: any) => void
}

export const useAgencyLoginSubmit = ({
	email,
	password,
	setAlert,
	onAgencySuccess,
	onError
}: Props) => {
	const [loading, setLoading] = useState<boolean>(false)

	const handleAgencySubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)

		if ([email, password].includes('')) {
			setAlert({
				error: true,
				msg: 'Please fill in all fields'
			})
			setLoading(false)
			return
		}

		try {
			const { data } = await baseAPI.post(`users/login`, {
				email,
				password
			})

			setAlert({
				error: false,
				msg: 'Access granted'
			})
			onAgencySuccess && onAgencySuccess(data)
		} catch (error) {
			onError && onError(error)
			setLoading(false)
		}
	}

	return { handleAgencySubmit, loading }
}
