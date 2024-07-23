import { Dispatch } from 'react'
import { resetEntityFilters } from 'src/helper/forms/resetEntityFilters'
import { LocationAction } from '../context/contextinterfaces'
import { ILocation } from '@interfaces/location'

export const resetLocationFilters = (
	dispatch: Dispatch<LocationAction>,
	fields: Partial<Record<keyof ILocation, any>>
) => {
	resetEntityFilters<ILocation>(dispatch as Dispatch<any>, 'location', fields)
}
