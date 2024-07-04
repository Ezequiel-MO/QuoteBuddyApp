import * as Yup from 'yup'

export const accManagerValidationSchema = Yup.object().shape({
	_id: Yup.string().notRequired(),
	firstName: Yup.string().required('First name is required'),
	familyName: Yup.string().required('Family name is required'),
	email: Yup.string().email('Invalid email').required('Email is required'),
	imageContentUrl: Yup.array().notRequired(),
	deletedImage: Yup.mixed().notRequired()
})
