import * as Yup from 'yup'

export const getValidationSchema = () => {
	return Yup.object({
		name: Yup.string().required('Required'),
		city: Yup.string().required('Required'),
		longitude: Yup.number().required('Required'),
		latitude: Yup.number().required('Required'),
		pricePerPerson: Yup.boolean(),
		price: Yup.number().required('Required')
	})
}
