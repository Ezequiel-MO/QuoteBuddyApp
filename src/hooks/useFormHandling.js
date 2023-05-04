import { useState } from 'react'

export const useFormHandling = (initialData, validationSchema) => {
	const [data, setData] = useState(initialData)
	const [errors, setErrors] = useState({})

	const handleChange = (event) => {
		const { name, value } = event.target
		setData({
			...data,
			[name]: value
		})
		if (errors[name]) {
			setErrors((prevErrors) => ({
				...prevErrors,
				[name]: undefined
			}))
		}
	}

	const handleBlur = async (event) => {
		const { name, value } = event.target

		if (value !== '') {
			setErrors((prevErrors) => ({
				...prevErrors,
				[name]: undefined
			}))
		} else {
			try {
				await validationSchema.validateAt(name, value)
				setErrors((prevErrors) => ({
					...prevErrors,
					[name]: undefined
				}))
			} catch (err) {
				setErrors((prevErrors) => ({
					...prevErrors,
					[name]: err.message
				}))
			}
		}
	}

	const validate = async () => {
		try {
			await validationSchema.validate(data, { abortEarly: false })
			return true
		} catch (err) {
			const newErrors = {}
			err.inner.forEach((el) => {
				newErrors[el.path] = el.message
			})
			setErrors(newErrors)
			return false
		}
	}

	return {
		data,
		setData,
		errors,
		handleChange,
		handleBlur,
		validate
	}
}
