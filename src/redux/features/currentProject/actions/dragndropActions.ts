import { IEvent } from '@interfaces/event'
import { IHotel } from '@interfaces/hotel'
import { IRestaurant } from '@interfaces/restaurant'
import { useDispatch } from 'react-redux'
import {
	DRAG_AND_DROP_EVENT,
	DRAG_AND_DROP_HOTEL,
	DRAG_AND_DROP_HOTEL_OVERNIGHT,
	DRAG_AND_DROP_RESTAURANT
} from '../CurrentProjectSlice'
import { IDragAndDropHotelOvernight } from '../types'
import { useAppDispatch } from 'src/hooks/redux/redux'

export const useDragnDropActions = () => {
	const dispatch = useAppDispatch()

	const dragAndDropEvent = (event: IEvent) => {
		dispatch(DRAG_AND_DROP_EVENT(event))
	}

	const dragAndDropRestaurant = (restaurant: IRestaurant) => {
		dispatch(DRAG_AND_DROP_RESTAURANT(restaurant))
	}
	const dragAndDropHotel = (hotel: IHotel) => {
		dispatch(DRAG_AND_DROP_HOTEL(hotel))
	}
	const dragAndDropHotelOvernight = (
		newSchedule: IDragAndDropHotelOvernight
	) => {
		dispatch(DRAG_AND_DROP_HOTEL_OVERNIGHT(newSchedule))
	}

	return {
		dragAndDropEvent,
		dragAndDropRestaurant,
		dragAndDropHotel,
		dragAndDropHotelOvernight
	}
}
