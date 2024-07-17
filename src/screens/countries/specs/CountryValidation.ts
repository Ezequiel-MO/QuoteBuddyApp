import { access } from 'fs'
import { quoteLanguage } from 'src/constants'
import * as Yup from 'yup'

export const countryValidationSchema = Yup.object().shape({
	_id: Yup.string().notRequired(),
	name: Yup.string().required('Country name is required'),
	accessCode: Yup.string().required('Access code is required'),
	quoteLanguage: Yup.string()
		.oneOf(quoteLanguage)
		.required('Quote language is required')
		.default('EN')
})
