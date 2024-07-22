import * as Yup from 'yup'

export const giftValidationSchema = Yup.object().shape({
	_id: Yup.string().notRequired(),
	name: Yup.string()
		.required('A name for the gift is required')
		.min(3, 'A Gift name must be at least 3 characters long'),
	qty: Yup.number().notRequired(),
	price: Yup.number()
		.required('A price is required')
		.min(0, 'Price must be greater than 0'),
	textContent: Yup.string().notRequired(),
	imageContentUrl: Yup.array()
		.of(Yup.string().url('Must be a valid URL'))
		.required('An image URL is required')
})
