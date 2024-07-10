import * as Yup from 'yup'

export const clientValidationSchema = Yup.object().shape({
	_id: Yup.string().notRequired(),
	firstName: Yup.string()
		.required('First name is required')
		.min(3, 'First name must be at least 3 characters long'),
	familyName: Yup.string()
		.required('Family name is required')
		.min(3, 'Family name must be at least 3 characters long'),
	email: Yup.string().email('Must be a valid email').notRequired(),
	phone: Yup.string().notRequired(),
	country: Yup.string().required('Country is required'),
	quoteLanguage: Yup.string().required('Quote language is required'),
	clientCompany: Yup.string().notRequired(),
	origin: Yup.object().shape({
		method: Yup.string().notRequired()
	}),
	qualification: Yup.object().shape({
		status: Yup.string().notRequired()
	})
})
