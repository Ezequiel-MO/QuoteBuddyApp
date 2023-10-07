import * as Yup from 'yup'

export const getValidationSchema = () => {
	return Yup.object({
		name: Yup.string().required('Required'),
		city: Yup.string().required('Required'),
		longitude: Yup.number().required('Required'),
		latitude: Yup.number().required('Required'),
		price: Yup.number().typeError('Required').min(1, 'Required')
		// isVenue: Yup.boolean()
	})
}
