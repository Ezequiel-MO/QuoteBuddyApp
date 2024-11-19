import * as Yup from 'yup'

export const generalExpenseValidationSchema = Yup.object().shape({
	_id: Yup.string().notRequired(),
	name: Yup.string()
		.required('Hotel name is required')
		.min(3, 'Hotel name must be at least 3 characters long'),
	description: Yup.object().notRequired(),
	suppliers: Yup.array().notRequired()
})
