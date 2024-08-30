import * as Yup from 'yup'

export const projectValidationSchema = Yup.object().shape({
	_id: Yup.string().optional(),
	code: Yup.string().required('Project code is required').max(20),
	accountManager: Yup.array().of(Yup.object()).optional(),
	groupName: Yup.string().required('Group name is required').max(50),
	groupLocation: Yup.string().required('Group location is required').max(100),
	arrivalDay: Yup.string()
		.required('Arrival day is required')
		.matches(/\d{4}-\d{2}-\d{2}/, 'Must be a valid date'),
	departureDay: Yup.string()
		.required('Departure day is required')
		.matches(/\d{4}-\d{2}-\d{2}/, 'Must be a valid date'),
	nrPax: Yup.number()
		.required('Number of participants is required')
		.min(1, 'At least 1 participant is required'),
	projectIntro: Yup.array().of(Yup.string()).optional(),
	suplementaryText: Yup.boolean().optional(),
	hotels: Yup.array().of(Yup.object()).optional(),
	status: Yup.mixed()
		.oneOf(['Received', 'Sent', 'Confirmed', 'Cancelled', 'Invoiced'])
		.required('Status is required'),
	estimate: Yup.number().optional(),
	budget: Yup.mixed()
		.oneOf(['budget', 'noBudget', 'budgetAsPdf'])
		.required('Budget status is required'),
	imageContentUrl: Yup.array()
		.of(Yup.string().url('Must be a valid URL'))
		.optional(),
	hasSideMenu: Yup.boolean().optional(),
	multiDestination: Yup.boolean().optional(),
	hideDates: Yup.boolean().optional(),
	hasExternalCorporateImage: Yup.boolean().optional(),
	clientAccManager: Yup.array().of(Yup.object()).optional(),
	clientCompany: Yup.array().of(Yup.object()).optional(),
	schedule: Yup.array().optional(),
	gifts: Yup.array().of(Yup.object()).optional(),
	languageVendorDescriptions: Yup.string().optional(),
	invoices: Yup.array().of(Yup.object()).optional(),
	collectionsFromClient: Yup.array().of(Yup.object()).optional()
})
