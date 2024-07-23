import * as Yup from 'yup'

export const locationValidationSchema = Yup.object().shape({
	_id: Yup.string().notRequired(),
	name: Yup.string()
		.required('A name for the location is required')
		.min(3, 'A Location name must be at least 3 characters long'),
	textContent: Yup.string().notRequired(),
	imageContentUrl: Yup.array()
		.of(Yup.string().url('Must be a valid URL'))
		.notRequired(),
	location: Yup.object().shape({
		type: Yup.string().required('Location type is required'),
		coordinates: Yup.array()
			.of(Yup.number().required('Coordinate is required'))
			.required('Coordinates are required')
	})
})
