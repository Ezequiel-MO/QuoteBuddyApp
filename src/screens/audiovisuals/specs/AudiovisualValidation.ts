import * as Yup from 'yup'

export const audiovisualValidationSchema = Yup.object().shape({
	_id: Yup.string().notRequired(),
	name: Yup.string()
		.required('A name for Audiovisuals is required')
		.min(3, 'Audiovisuals name must be at least 3 characters long'),
	city: Yup.string().required('City is required'),
	textContent: Yup.string().notRequired(),
	imageContentUrl: Yup.array()
		.of(Yup.string().url('Must be a valid URL'))
		.notRequired(),
	location: Yup.object().notRequired()
})
