import { useState } from 'react'
import baseAPI from '../../axios/axiosConfig'

export const useLoginSubmit = ({ email, password, setAlert, onSuccess }) => {
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e) => {
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
