import * as Yup from 'yup'

export const restaurantValidationSchema = Yup.object().shape({
	_id: Yup.string().notRequired(),
	name: Yup.string()
		.required('A name for the restaurant is required')
		.min(3, 'A Restaurant name must be at least 3 characters long'),
	city: Yup.string().required('City is required'),
	textContent: Yup.string().required('Text content is required'),
	imageContentUrl: Yup.array()
		.of(Yup.string().url('Must be a valid URL'))
		.notRequired(),
	location: Yup.object().shape({
		type: Yup.string().required('Location type is required'),
		coordinates: Yup.array()
			.of(Yup.number().required('Coordinate is required'))
			.required('Coordinates are required')
	}),
	introduction: Yup.array().of(Yup.string()).notRequired(),
	price: Yup.number().notRequired(),
	deletedImage: Yup.array().of(Yup.string()).notRequired(),
	availableLanguages: Yup.array()
		.of(Yup.string().required('Language is required'))
		.required('Available languages are required'),
	maxCapacity: Yup.number().notRequired()
})
