import * as Yup from 'yup'

export const notificationValidationSchema = Yup.object().shape({
	_id: Yup.string().notRequired(),
	title: Yup.string().required('Title is required'),
	textContent: Yup.string().required('Text content is required'),
	module: Yup.string().required('Module is required'),
	accManagers: Yup.array().notRequired()
})
