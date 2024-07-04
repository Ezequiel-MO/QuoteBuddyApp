import * as Yup from 'yup'

export const freelancerValidationSchema = Yup.object().shape({
	_id: Yup.string().notRequired(),
	firstName: Yup.string()
		.required('First name is required')
		.min(3, 'First name must be at least 3 characters long'),
	familyName: Yup.string()
		.required('Family name is required')
		.min(3, 'Family name must be at least 3 characters long'),
	email: Yup.string().email('Must be a valid email').notRequired(),
	phone: Yup.string().notRequired(),
	halfDayRate: Yup.number().notRequired(),
	fullDayRate: Yup.number().notRequired(),
	weekendHDRate: Yup.number().notRequired(),
	weekendFDRate: Yup.number().notRequired(),
	type: Yup.string().required('Type is required'),
	city: Yup.string().required('City is required')
})
