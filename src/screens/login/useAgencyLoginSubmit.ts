import { FormEvent, useState } from 'react'
import baseAPI from '../../axios/axiosConfig'
import { IAlert } from './Login'
import { useFetchAccManagers } from 'src/hooks/fetchData/useFetchAccManagers'
import { IAccManager } from '@interfaces/accManager'


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
			const res = await baseAPI.get(`accManagers?email=${data.email}`,
				{
					headers: {
						Authorization: `Bearer ${data.token}`
					}
				}
			)
			const accManager: IAccManager = res.data.data.data[0]
			localStorage.setItem('accManager', JSON.stringify(accManager))
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
