import * as yup from 'yup'

export const getValidationSchema = () =>
	yup.object().shape({
		vendor: yup.string() /* .required('Required') */,
		city: yup.string() /* .required('Required') */,
		name: yup.string().required('Required'),
		contact: yup.string(),
		email: yup.string(),
		category: yup.string(),
		duration: yup.number(),
		nrArtists: yup.number(),
		textContent: yup.string()
	})
