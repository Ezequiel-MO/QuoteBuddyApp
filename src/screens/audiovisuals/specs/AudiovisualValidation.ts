import * as Yup from 'yup'

export const audiovisualValidationSchema = Yup.object().shape({
	_id: Yup.string().notRequired(),
	name: Yup.string()
		.required('A name for Audiovisuals is required')
		.min(3, 'Audiovisuals name must be at least 3 characters long'),
	city: Yup.string().required('Required Location'),
	textContent: Yup.string().notRequired(),
	imageContentUrl: Yup.array()
		.of(Yup.string().url('Must be a valid URL'))
		.notRequired(),
	longitude: Yup.number().required('Required longitude').typeError('Required longitude'),
	latitude: Yup.number().required('Required latitude').typeError('Required latitude'),
})
