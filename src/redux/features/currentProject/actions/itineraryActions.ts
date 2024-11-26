import {
	IAddEventToItenerary,
	IAddIntro,
	IIntroEventItinerary,
	IRemoveEventToItinerary
} from '../types'
import {
	ADD_EVENT_TO_ITENERARY,
	ADD_INTRO_EVENT_TO_ITENERARY,
	ADD_INTRO_HOTEL_OVERNIGHT,
	REMOVE_EVENT_TO_ITENERARY
} from '../CurrentProjectSlice'
import { useAppDispatch } from 'src/hooks/redux/redux'

export const useItineraryActions = () => {
	const dispatch = useAppDispatch()

	const addIntroHotelOvernight = (introHotel: IAddIntro) => {
		dispatch(ADD_INTRO_HOTEL_OVERNIGHT(introHotel))
	}

	const addIntroEventItinerary = (introEvent: IIntroEventItinerary) => {
		dispatch(ADD_INTRO_EVENT_TO_ITENERARY(introEvent))
	}

	const addEventToItenerary = (addEvent: IAddEventToItenerary) => {
		dispatch(ADD_EVENT_TO_ITENERARY(addEvent))
	}

	const removeIteneraryEvent = (event: IRemoveEventToItinerary) => {
		dispatch(REMOVE_EVENT_TO_ITENERARY(event))
	}

	return {
		addIntroHotelOvernight,
		addIntroEventItinerary,
		addEventToItenerary,
		removeIteneraryEvent
	}
}
