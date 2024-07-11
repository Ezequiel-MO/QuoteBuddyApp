import React, { useState, ChangeEvent, FocusEvent } from 'react'
import * as Yup from 'yup'
import { generateFormValues } from '../../../helper'
import { VALIDATIONS, formsValues } from '../../../constants'
import { SubmitInput, TextInput } from '@components/atoms'
import { ICountry } from '@interfaces/country'

interface CountryMasterFormProps {
	submitForm: (
		values: ICountry,
		files: File[],
		endpoint: string,
		update: boolean
	) => void
	country: ICountry
}

const CountryMasterForm: React.FC<CountryMasterFormProps> = ({
	submitForm,
	country
}) => {
	const update = Object.keys(country).length > 0
	const files: File[] = []

	const [formValues, setFormValues] = useState<ICountry>(
		generateFormValues(formsValues.country, country)
	)
	const [errors, setErrors] = useState<{ [key: string]: string }>({})

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormValues({
			...formValues,
			[e.target.name]: e.target.value
		})
	}

	const handleBlur = async (e: FocusEvent<HTMLInputElement>) => {
		try {
			await Yup.reach(VALIDATIONS.country, e.target.name).validate(
				e.target.value
			)
			setErrors({
				...errors,
				[e.target.name]: ''
			})
		} catch (err: any) {
			setErrors({
				...errors,
				[e.target.name]: err.message
			})
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			await VALIDATIONS.country.validate(formValues, { abortEarly: false })
			submitForm(formValues, files, 'countries', update)
		} catch (err: any) {
			const validationErrors: { [key: string]: string } = {}
			if (err.inner) {
				err.inner.forEach((error: any) => {
					validationErrors[error.path] = error.message
				})
			}
			setErrors(validationErrors)
		}
	}

	return (
		<div className="block p-6 rounded-lg shadow-lg bg-white w-full">
			<form onSubmit={handleSubmit}>
				<fieldset className="max-w-3xl mx-auto p-8 bg-slate-800 shadow-md rounded-lg">
					<legend>
						<h1 className="text-3xl font-semibold text-gray-700 mb-6">
							Country Details
						</h1>
					</legend>
					<div className="form-group mb-6">
						<TextInput
							label="Country Name"
							name="name"
							value={formValues.name}
							handleChange={handleChange}
							handleBlur={handleBlur}
							placeholder="ex : Sweden ..."
							errors={errors.name}
						/>

						<TextInput
							label="Web country code"
							name="accessCode"
							value={formValues.accessCode}
							handleChange={handleChange}
							handleBlur={handleBlur}
							placeholder="ex : CZ, ES ..."
							errors={errors.accessCode}
						/>

						<TextInput
							label="Quoted in ..."
							name="quoteLanguage"
							value={formValues.quoteLanguage}
							handleChange={handleChange}
							handleBlur={handleBlur}
							placeholder="ex : EN, ES ..."
							errors={errors.quoteLanguage}
						/>
						<SubmitInput update={update} title="Country" />
					</div>
				</fieldset>
			</form>
		</div>
	)
}

export default CountryMasterForm
