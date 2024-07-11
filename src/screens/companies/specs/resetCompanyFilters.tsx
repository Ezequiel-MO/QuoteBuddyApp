import { Dispatch } from 'react'
import { resetEntityFilters } from 'src/helper/forms/resetEntityFilters'
import { CompanyAction } from '../context/contextinterfaces'
import { IClientCompany } from '@interfaces/clientCompany'

export const resetCompanyFilters = (
	dispatch: Dispatch<CompanyAction>,
	fields: Partial<Record<keyof IClientCompany, any>>
) => {
	resetEntityFilters<IClientCompany>(
		dispatch as Dispatch<any>,
		'company',
		fields
	)
}
