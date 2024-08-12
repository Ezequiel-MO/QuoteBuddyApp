import * as Yup from 'yup'

export const quotationValidationSchema = Yup.object().shape({
	_id: Yup.string().notRequired(),
	code: Yup.string()
		.required('A code is required')
		.min(3, 'A code  name must be at least 3 characters long')
})
