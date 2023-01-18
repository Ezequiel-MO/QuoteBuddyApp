import * as Yup from 'yup'

export const useReturnFormValues = (category) => {
	if (category === 'accManagers')
		return {
			initialValues: {
				firstName: category?.firstName ?? '',
				familyName: category?.familyName ?? '',
				email: category?.email ?? ''
			},
			validationValues: {
				firstName: Yup.string().required('Required'),
				familyName: Yup.string().required('Required'),
				email: Yup.string().required('Required')
			}
		}

	return {}
}
