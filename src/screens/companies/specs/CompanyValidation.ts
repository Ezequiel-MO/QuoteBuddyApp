import * as Yup from 'yup'

export const companyValidationSchema = Yup.object().shape({
	_id: Yup.string().notRequired(),
	name: Yup.string()
		.required('Name is required')
		.min(3, 'Name must be at least 3 characters long'),
	address: Yup.string()
		.required('Address is required')
		.min(3, 'Address must be at least 3 characters long'),
	postCode: Yup.string().notRequired(),
	VATNr: Yup.string().notRequired(),
	colorPalette: Yup.array().of(Yup.string()).notRequired(),
	fonts: Yup.array().of(Yup.string()).notRequired(),
	employees: Yup.array().of(Yup.object()).notRequired(),
	country: Yup.string().required('Country is required')
})
