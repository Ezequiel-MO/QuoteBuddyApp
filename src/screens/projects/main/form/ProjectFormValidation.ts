import * as Yup from 'yup'

export const getValidationSchema = () => {
	return Yup.object({
		code: Yup.string().required('Required'),
		accountManager: Yup.string().required('Required'),
		clientAccManager: Yup.string().required('Required'),
		groupName: Yup.string().required('Required'),
		groupLocation: Yup.string().required('Required'),
		arrivalDay: Yup.string().required('Required'),
		departureDay: Yup.string().required('Required'),
		nrPax: Yup.number().required('Required'),
		status: Yup.string().required('Required'),
		estimate: Yup.number(),
		clientCompany: Yup.string(),
		budget: Yup.string()
	})
}
