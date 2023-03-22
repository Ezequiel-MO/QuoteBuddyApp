import * as Yup from 'yup'

export const getValidationSchema = () => {
	return Yup.object({
		firstName: Yup.string().required('Required'),
		familyName: Yup.string().required('Required'),
		email: Yup.string().required('Required')
	})
}
