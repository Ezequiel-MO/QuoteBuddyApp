import { useState, useEffect } from 'react'
import baseAPI from 'src/axios/axiosConfig'

export const usePasswordReset = () => {
	const [email, setEmail] = useState<string | null>(null)

	useEffect(() => {
		const userEmail = localStorage.getItem('user_email')
		if (userEmail) {
			setEmail(userEmail)
		}
	}, [])

	const handlePasswordReset = async () => {
		if (!email) {
			alert('Please check out and login again with your email')
			return
		}

		try {
			const response = await baseAPI.post('/users/change_password', {
				email
			})

			alert(response.data.message)

			// Mocking API response
			/* const mockData = {
				exists: true // Change this to false to test the "email does not exist" scenario
			}

			if (mockData.exists) {
				alert(
					'We have sent an email to your inbox to assist with changing the password.'
				)
			} else {
				alert('This email does not exist in our database.')
			} */
		} catch (error: any) {
			alert(error.message)
		}
	}
	return { handlePasswordReset }
}
