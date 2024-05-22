import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import baseAPI from '../../../axios/axiosConfig'
import { errorToastOptions, toastOptions } from '../../../helper/toast'
import UserMasterForm from './UserMasterForm'
import { IUser } from '@interfaces/user'
import useUserValidation from './useUserValidation'

const UserSpecs: React.FC = () => {
	const navigate = useNavigate()
	const {
		state: { user }
	} = useLocation()
	const update = Object.keys(user).length > 0

	const [data, setData] = useState<Partial<IUser>>({
		name: user.name || '',
		email: user.email || '',
		password: user.password || ''
	})

	const { errors, validate, setErrors } = useUserValidation()

	const submitForm = async (event: React.FormEvent) => {
		event.preventDefault()
		const validationErrors = validate(data)
		if (Object.keys(validationErrors).length === 0) {
			try {
				if (update) {
					await baseAPI.patch(`users/${user._id}`, data)
					toast.success('User Updated', toastOptions)
				} else {
					await baseAPI.post('users/signup', data)
					toast.success('User Created', toastOptions)
				}
				setTimeout(() => {
					navigate('/app/user')
				}, 1000)
			} catch (err: any) {
				toast.error(
					`Error Creating/Updating User, ${err.response.data.msg}`,
					errorToastOptions
				)
			}
		}
	}

	return (
		<UserMasterForm
			user={user}
			data={data}
			setData={setData}
			handleSubmit={submitForm}
			validate={validate}
			errors={errors}
			setErrors={setErrors}
		/>
	)
}

export default UserSpecs
