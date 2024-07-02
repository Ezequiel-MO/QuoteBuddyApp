// src/helper/forms/resetHotelFields.ts
import { Dispatch } from 'react'
import { resetEntityFilters } from 'src/helper/forms/resetEntityFilters'
import { ActivityAction } from '../context/contextinterfaces'
import { IActivity } from '@interfaces/project'

export const resetActivityFilters = (
	dispatch: Dispatch<ActivityAction>,
	fields: Partial<Record<keyof IActivity, any>>
) => {
	resetEntityFilters<IActivity>(dispatch as Dispatch<any>, 'activity', fields)
}
