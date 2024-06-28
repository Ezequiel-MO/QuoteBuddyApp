import * as Yup from 'yup'

export const entertainmentValidationSchema = Yup.object().shape({
	_id: Yup.string().required('_id is required'),
	vendor: Yup.string().required('Vendor is required'),
	city: Yup.string().required('City is required'),
	name: Yup.string().required('Name is required'),
	contact: Yup.string().required('Contact is required'),
	email: Yup.string()
		.email('Must be a valid email')
		.required('Email is required'),
	category: Yup.mixed()
		.oneOf(['MOC', 'Dance', 'Music', 'Magician', 'DJ', 'PhotoBooth', 'Other'])
		.required('Category is required'),
	duration: Yup.string().required('Duration is required'),
	nrArtists: Yup.string().notRequired(),
	textContent: Yup.string().notRequired(),
	price: Yup.object()
		.shape({
			artistsFee: Yup.number().required('Artists fee is required'),
			aavv: Yup.number().required('AAVV is required'),
			lighting: Yup.number().notRequired(),
			travelAllowance: Yup.number().required('Travel allowance is required'),
			mealAllowance: Yup.number().required('Meal allowance is required'),
			other: Yup.number().notRequired()
		})
		.notRequired(),
	imageContentUrl: Yup.array()
		.of(Yup.string().url('Must be a valid URL'))
		.notRequired(),
	descriptions: Yup.array()
		.of(
			Yup.object().shape({
				language: Yup.string().required('Language is required'),
				description: Yup.string().required('Description is required')
			})
		)
		.required('Descriptions are required'),
	availableLanguages: Yup.array()
		.of(Yup.string().required('Language is required'))
		.required('Available languages are required'),
	updatedAt: Yup.string().notRequired()
})
