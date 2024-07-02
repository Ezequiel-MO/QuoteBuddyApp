// src/helper/forms/resetHotelFields.ts
import { Dispatch } from 'react'
import { IHotel } from '@interfaces/hotel'

import { HotelAction } from '../context/contextinterfaces'
import { resetEntityFilters } from 'src/helper/forms/resetEntityFilters'

export const resetHotelFilters = (
	dispatch: Dispatch<HotelAction>,
	fields: Partial<Record<keyof IHotel, any>>
) => {
	resetEntityFilters<IHotel>(dispatch as Dispatch<any>, 'hotel', fields)
}
