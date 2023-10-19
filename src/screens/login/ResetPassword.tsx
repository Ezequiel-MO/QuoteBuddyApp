import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import baseAPI from 'src/axios/axiosConfig'

interface Params {
	[key: string]: string | undefined
	token: string
}

export const ResetPassword: React.FC = () => {
	const navigate = useNavigate()
	const { token } = useParams<Params>()
	const [newPassword, setNewPassword] = useState<string>('')
	const [confirmPassword, setConfirmPassword] = useState<string>('')
	const [isValidToken, setIsValidToken] = useState<boolean | null>(null)

	useEffect(() => {
		const verifyToken = async () => {
			console.log('token', token)
			try {
				await baseAPI.post('/users/verify-reset-token', { token })
				setIsValidToken(true)
			} catch (error) {
				setIsValidToken(false)
			}
		}

		verifyToken()
	}, [token])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (newPassword !== confirmPassword) {
			alert('Passwords dont match')
			return
		}

		try {
			const response = await baseAPI.post('/users/reset-password', {
				token,
				newPassword
			})

			alert(response.data.message)
			navigate('/app')
		} catch (error) {
			alert('Error resetting password')
		}
	}

	if (isValidToken === null) {
		return <div>Verifying...</div>
	}

	if (!isValidToken) {
		return <div>Invalid or expired token.</div>
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="password"
				placeholder="New Password"
				value={newPassword}
				onChange={(e) => setNewPassword(e.target.value)}
				className="p-4 text-black-50 m-4"
			/>
			<input
				type="password"
				placeholder="Confirm New Password"
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
				className="p-4 text-black-50 m-4"
			/>
			<button className="p-4 bg-white-50 text-black-50 m-4" type="submit">
				Reset Password
			</button>
		</form>
	)
}
