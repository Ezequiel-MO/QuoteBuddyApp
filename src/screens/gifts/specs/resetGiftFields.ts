import { Dispatch } from 'react'
import { resetEntityFilters } from 'src/helper/forms/resetEntityFilters'
import { GiftAction } from '../context/contextinterfaces'
import { IGift } from '@interfaces/gift'

export const resetGiftFilters = (
	dispatch: Dispatch<GiftAction>,
	fields: Partial<Record<keyof IGift, any>>
) => {
	resetEntityFilters<IGift>(dispatch as Dispatch<any>, 'gift', fields)
}
