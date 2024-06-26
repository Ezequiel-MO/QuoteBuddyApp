import * as Yup from 'yup'

// Coordinates schema
const coordinatesSchema = Yup.array()
	.of(Yup.number().required('Coordinate value is required'))
	.length(2, 'Coordinates must have exactly two values: [longitude, latitude]')

// Location schema
const locationSchema = Yup.object().shape({
	type: Yup.string()
		.oneOf(['Point'], 'Location type must be "Point"')
		.required('Location type is required'),
	coordinates: coordinatesSchema.required('Coordinates are required')
})

// Activity schema
export const activityValidationSchema = Yup.object().shape({
	name: Yup.string().required('Name is required'),
	city: Yup.string().required('City is required'),
	textContent: Yup.string().required('Text content is required'),
	imageContentUrl: Yup.array()
		.of(Yup.string().url('Must be a valid URL'))
		.required('Image content URLs are required'),
	location: locationSchema.required('Location is required'),
	pricePerPerson: Yup.boolean().required('Price per person flag is required'),
	price: Yup.number()
		.min(0, 'Price cannot be negative')
		.required('Price is required'),
	regular: Yup.boolean().required('Regular flag is required'),
	descriptions: Yup.array()
		.of(
			Yup.object().shape({
				languageCode: Yup.string().required('Language code is required'),
				value: Yup.string().required('Description value is required')
			})
		)
		.required('Descriptions are required')
})
