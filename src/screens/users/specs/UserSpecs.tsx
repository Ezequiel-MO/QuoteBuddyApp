import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import baseAPI from '../../../axios/axiosConfig'
import { errorToastOptions, toastOptions } from '../../../helper/toast'
import UserMasterForm from './UserMasterForm'
import { IUser } from '@interfaces/user'

function validate(input: Partial<IUser>) {
	const errors: Partial<Record<keyof IUser, string>> = {}
	if (!input.name) {
		errors.name = 'required name'
	}
	if (!input.email) {
		errors.email = 'required email'
	}
	if (!input.password) {
		errors.password = 'required password'
	}
	return errors
}

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
	const [errors, setErrors] = useState<Partial<Record<keyof IUser, string>>>({})

	const toastError = 'Error Creating/Updating User, complete the form'

	const submitForm = async (event: React.FormEvent) => {
		event.preventDefault()
		try {
			if (Object.values(data).includes('')) {
				return toast.error(toastError, errorToastOptions)
			}
			if (!update) {
				await baseAPI.post('users/signup', data)
				toast.success('User Created', toastOptions)
			} else {
				await baseAPI.patch(`users/${user._id}`, data)
				toast.success('User Updated', toastOptions)
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

	return (
		<>
			<UserMasterForm
				user={user}
				data={data}
				setData={setData}
				handleSubmit={submitForm}
				validate={validate}
				errors={errors}
				setErrors={setErrors}
			/>
		</>
	)
}

export default UserSpecs
