import { useState, useCallback } from 'react'
import { IUser } from '@interfaces/user'

const useUserValidation = () => {
	const [errors, setErrors] = useState<Partial<Record<keyof IUser, string>>>({})

	const validate = useCallback((input: Partial<IUser>) => {
		const newErrors: Partial<Record<keyof IUser, string>> = {}
		if (!input.name) {
			newErrors.name = 'required name'
		}
		if (!input.email) {
			newErrors.email = 'required email'
		}
		if (!input.password) {
			newErrors.password = 'required password'
		}
		setErrors(newErrors)
		return newErrors
	}, [])

	return { errors, validate, setErrors }
}

export default useUserValidation
