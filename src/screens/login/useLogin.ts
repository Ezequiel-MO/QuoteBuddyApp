import { FormEvent, useState } from 'react'
import baseAPI from '../../axios/axiosConfig'
import { IAlert } from './Login'

interface Props {
	email: string
	password: string
	setAlert: (alert: IAlert) => void
	onSuccess: (data: any) => void
}

export const useLoginSubmit = ({
	email,
	password,
	setAlert,
	onSuccess
}: Props) => {
	const [loading, setLoading] = useState<boolean>(false)

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
			onSuccess && onSuccess(data)
		} catch (error) {
			setAlert({
				error: true,
				msg: 'Invalid email or password'
			})

			setLoading(false)
		}
	}

	return { handleSubmit, loading }
}
