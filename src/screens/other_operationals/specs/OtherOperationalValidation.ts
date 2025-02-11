import * as Yup from 'yup'

export const otherOperationalValidationSchema = Yup.object().shape({
	_id: Yup.string().notRequired(),
	name: Yup.string()
		.required('A name for an operational invoice is required')
		.min(3, 'An Operational Invoice name must be at least 3 characters long')
})
