import { FormEvent, useState } from 'react'
import { IAlert } from './Login'
import baseAPI from 'src/axios/axiosConfig'

interface Props {
	email: string
	password: string
	setAlert: (alert: IAlert) => void
	onClientSuccess: (data: any) => void
	onError: (error: Error) => void
}

export const useClientLoginSubmit = ({
	email,
	password,
	setAlert,
	onClientSuccess,
	onError
}: Props) => {
	const [loading, setLoading] = useState<boolean>(false)

	const handleClientSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if ([email, password].includes('')) {
			setAlert({
				error: true,
				msg: 'Please fill in all fields'
			})
			setLoading(false)
			throw new Error('Please fill all fields')
		}
		try {
			const {
				data: { token }
			} = await baseAPI.post('/users/client_login', {
				email,
				password
			})
			if (!token) {
				throw new Error('Invalid Email or Password')
			}
			await baseAPI.post(
				'/admin/clearCache',
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			)
			const response = await baseAPI.get(`/projects?code=${password}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			const receivedData = response.data.data.data.length !== 0

			if (!receivedData) {
				setLoading(false)
				throw new Error('Invalid Email or Password')
			}
			const clientEmail = response.data.data.data[0].clientAccManager[0].email
			if (email !== clientEmail) {
				setLoading(false)
				throw new Error('Invalid Email')
			}
			localStorage.setItem('token', token)
			onClientSuccess && onClientSuccess(response.data.data.data[0])
		} catch (error: any) {
			onError && onError(error)
		}
	}

	return { handleClientSubmit, loading }
}
