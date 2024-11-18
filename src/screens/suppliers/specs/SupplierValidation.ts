import * as Yup from 'yup'

export const supplierValidationSchema = Yup.object().shape({
	_id: Yup.string().notRequired(),
	legalName: Yup.string()
		.required('Legal name is required')
		.min(3, 'Legal name must be at least 3 characters long'),
	vendorId: Yup.string().notRequired(),
	VATNr: Yup.string().notRequired(),
	contactPerson: Yup.string().notRequired(),
	contactNumber: Yup.string().notRequired(),
	contactEmail: Yup.string().notRequired(),
	address: Yup.string().notRequired(),
	city: Yup.string().notRequired(),
	postalCode: Yup.string().notRequired(),
	IBAN: Yup.string().notRequired(),
	country: Yup.string().notRequired(),
	isDeleted: Yup.boolean().notRequired()
})
