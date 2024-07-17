import { Dispatch } from 'react'
import { resetEntityFilters } from 'src/helper/forms/resetEntityFilters'
import { CountryAction } from '../context/contextinterfaces'
import { ICountry } from '@interfaces/country'

export const resetCountryFilters = (
	dispatch: Dispatch<CountryAction>,
	fields: Partial<Record<keyof ICountry, any>>
) => {
	resetEntityFilters<ICountry>(dispatch as Dispatch<any>, 'country', fields)
}
