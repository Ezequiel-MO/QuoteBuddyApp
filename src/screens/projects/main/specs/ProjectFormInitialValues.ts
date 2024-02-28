import { IProject } from 'src/interfaces'

export const getInitialValues = (project: IProject) => {
	const getAccManagerInitialValue = () => {
		if (project && project.accountManager && project.accountManager[0]?.email) {
			return `${project.accountManager[0]._id}`
		}
		return ''
	}
	const getClientCompanyInitialValue = () => {
		if (project && project.clientCompany && project.clientCompany[0]?._id) {
			return `${project.clientCompany[0]._id}`
		}
		return ''
	}

	const getClientAccManagerInitialValue = () => {
		if (
			project &&
			project.clientAccManager &&
			project.clientAccManager[0]?.email
		) {
			return `${project.clientAccManager[0]._id}`
		}
		return ''
	}

	return {
		code: project?.code ?? '',
		accountManager: getAccManagerInitialValue(),
		clientCompany: getClientCompanyInitialValue(),
		clientAccManager: getClientAccManagerInitialValue(),
		groupName: project?.groupName ?? '',
		groupLocation: project?.groupLocation ?? '',
		arrivalDay: project?.arrivalDay ?? '',
		departureDay: project?.departureDay ?? '',
		nrPax: project?.nrPax ?? '',
		status: project?.status ?? '',
		estimate: project?.estimate ?? '',
		suplementaryText: project?.suplementaryText ?? true,
		hasSideMenu: project?.hasSideMenu ?? true,
		multiDestination: project?.multiDestination ?? false,
		hideDates: project?.hideDates ?? false,
		hasExternalCorporateImage: project?.hasExternalCorporateImage ?? false,
		budget: project?.budget ?? '',
		languageVendorDescriptions: project.languageVendorDescriptions ?? ''
	}
}
