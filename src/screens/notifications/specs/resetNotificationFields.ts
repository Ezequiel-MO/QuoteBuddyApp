import { Dispatch } from 'react'
import { resetEntityFilters } from 'src/helper/forms/resetEntityFilters'
import { IRestaurant } from '@interfaces/restaurant'
import { NotificationAction } from '../context/contextinterfaces'
import { INotification } from '@interfaces/notification'

export const resetNotificationFilters = (
	dispatch: Dispatch<NotificationAction>,
	fields: Partial<Record<keyof IRestaurant, any>>
) => {
	resetEntityFilters<INotification>(
		dispatch as Dispatch<any>,
		'notification',
		fields
	)
}
