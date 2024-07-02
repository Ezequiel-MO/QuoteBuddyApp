import { Dispatch } from 'react'
import { resetEntityFilters } from 'src/helper/forms/resetEntityFilters'
import { EntertainmentAction } from '../context/contextinterfaces'
import { IEntertainment } from '@interfaces/entertainment'

export const resetEntertainmentFilters = (
	dispatch: Dispatch<EntertainmentAction>,
	fields: Partial<Record<keyof IEntertainment, any>>
) => {
	resetEntityFilters<IEntertainment>(
		dispatch as Dispatch<any>,
		'entertainment',
		fields
	)
}
