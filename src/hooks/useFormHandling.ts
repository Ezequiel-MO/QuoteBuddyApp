import { useState } from 'react'
import { IFreelancer } from 'src/interfaces'
import { IEntertainment } from 'src/interfaces/entertainment'
import * as yup from 'yup'

type FormData = IFreelancer | IEntertainment

type UseFormHandlingFunction = <T extends FormData>(
	initialData: T,
	validationSchema: yup.ObjectSchema<T>
) => FormHandlingReturn<T>

interface FormHandlingReturn<T> {
	data: T
	setData: React.Dispatch<React.SetStateAction<T>>
	errors: { [key: string]: string | undefined }
	handleChange: (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void
	handleBlur: (
		event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => void
	validate: () => Promise<boolean>
}

export const useFormHandling: UseFormHandlingFunction = (
	initialData,
	validationSchema
) => {
	const [data, setData] = useState(initialData)
	const [errors, setErrors] = useState<{ [key: string]: string | undefined }>(
		{}
	)

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
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

	const handleBlur = async (
		event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => {
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
				const ValidationError = err as yup.ValidationError
				setErrors((prevErrors) => ({
					...prevErrors,
					[name]: ValidationError.message
				}))
			}
		}
	}

	const validate = async () => {
		try {
			await validationSchema.validate(data, { abortEarly: false })
			return true
		} catch (err) {
			if (err instanceof yup.ValidationError) {
				const newErrors: { [key: string]: string } = {}
				err.inner.forEach((el) => {
					if (el.path) newErrors[el.path] = el.message
				})
				setErrors(newErrors)
			} else {
				console.log(err)
			}
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
