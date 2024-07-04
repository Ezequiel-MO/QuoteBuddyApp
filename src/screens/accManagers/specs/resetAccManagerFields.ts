import { Dispatch } from 'react'
import { resetEntityFilters } from 'src/helper/forms/resetEntityFilters'
import { AccManagerAction } from '../context/contextinterfaces'
import { IAccManager } from '@interfaces/accManager'

export const resetAccManagerFilters = (
	dispatch: Dispatch<AccManagerAction>,
	fields: Partial<Record<keyof IAccManager, any>>
) => {
	resetEntityFilters<IAccManager>(
		dispatch as Dispatch<any>,
		'accManager',
		fields
	)
}
