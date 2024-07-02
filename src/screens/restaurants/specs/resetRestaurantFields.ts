import { Dispatch } from 'react'
import { resetEntityFilters } from 'src/helper/forms/resetEntityFilters'
import { RestaurantAction } from '../context/contextinterfaces'
import { IRestaurant } from '@interfaces/restaurant'

export const resetRestaurantFilters = (
	dispatch: Dispatch<RestaurantAction>,
	fields: Partial<Record<keyof IRestaurant, any>>
) => {
	resetEntityFilters<IRestaurant>(
		dispatch as Dispatch<any>,
		'restaurant',
		fields
	)
}
