import { IProject } from '@interfaces/project'
import { starterSchedule } from 'src/constants/starterObjects'

export const defaultProject: IProject = {
	code: '',
	accountManager: [],
	groupName: '',
	groupLocation: '',
	arrivalDay: '',
	departureDay: '',
	nrPax: 0,
	projectIntro: [],
	suplementaryText: false,
	hotels: [],
	status: 'Received',
	hideDates: false,
	estimate: 0,
	budget: 'budget',
	imageContentUrl: [],
	hasSideMenu: true,
	hasExternalCorporateImage: false,
	clientAccManager: [],
	clientCompany: [],
	schedule: starterSchedule,
	gifts: [],
	multiDestination: false,
	languageVendorDescriptions: '',
	invoices: [],
	requiresCashFlowVerification: true,
	collectionsFromClient: []
}
