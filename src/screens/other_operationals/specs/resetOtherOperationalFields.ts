import { Dispatch } from 'react'
import { resetEntityFilters } from 'src/helper/forms/resetEntityFilters'
import { OtherOperationalAction } from '../context/contextinterfaces'
import { IOtherOperational } from '@interfaces/otherOperational'

export const resetOtherOperationalFilters = (
	dispatch: Dispatch<OtherOperationalAction>,
	fields: Partial<Record<keyof IOtherOperational, any>>
) => {
	resetEntityFilters<IOtherOperational>(
		dispatch as Dispatch<any>,
		'otherOperational',
		fields
	)
}
