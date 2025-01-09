import {
	IAddEventToItenerary,
	IIntroEventItinerary,
	IRemoveEventToItinerary,
	UpdateAfternoonActivityItineraryPayload,
	UpdateAssistanceTransfersItineraryPayload,
	UpdateDinnerRestaurantItineraryPayload,
	UpdateLunchRestaurantItineraryPayload,
	UpdateMorningActivityItineraryPayload,
	UpdateTransfersItineraryPayload
} from '../../types'
import { useAppDispatch } from 'src/hooks/redux/redux'
import * as thunks from './thunks'

export const useItineraryActions = () => {
	const dispatch = useAppDispatch()

	const addIntroToEventItinerary = (introEvent: IIntroEventItinerary) => {
		dispatch(thunks.addIntroToEventItineraryThunk(introEvent))
	}

	const addEventToItinerary = (addEvent: IAddEventToItenerary) => {
		dispatch(thunks.addEventToItineraryThunk(addEvent))
	}

	const removeEventFromItinerary = (event: IRemoveEventToItinerary) => {
		dispatch(thunks.removeEventFromItineraryThunk(event))
	}

	const updateAssistanceTransfersItinerary = (
		payload: UpdateAssistanceTransfersItineraryPayload
	) => {
		dispatch(thunks.updateAssistanceTransfersItineraryThunk(payload))

		return {
			addIntroToEventItinerary,
			addEventToItinerary,
			removeEventFromItinerary,
			updateAssistanceTransfersItinerary
		}
	}

	const updateTransfersItinerary = (
		payload: UpdateTransfersItineraryPayload
	) => {
		dispatch(thunks.updateTransfersItineraryThunk(payload))
	}

	const updateMorningActivityItinerary = (
		payload: UpdateMorningActivityItineraryPayload
	) => {
		dispatch(thunks.updateMorningActivityItineraryThunk(payload))
	}

	const updateAfternoonActivityItinerary = (
		payload: UpdateAfternoonActivityItineraryPayload
	) => {
		dispatch(thunks.updateAfternoonActivityItineraryThunk(payload))
	}

	const updateLunchRestaurantItinerary = (
		payload: UpdateLunchRestaurantItineraryPayload
	) => dispatch(thunks.updateLunchRestaurantItinearyThunk(payload))

	const updateDinnerRestaurantItinerary = (
		payload: UpdateDinnerRestaurantItineraryPayload
	) => {
		dispatch(thunks.updateDinnerRestaurantItineraryThunk(payload))
	}

	return {
		addIntroToEventItinerary,
		addEventToItinerary,
		removeEventFromItinerary,
		updateAssistanceTransfersItinerary,
		updateTransfersItinerary,
		updateMorningActivityItinerary,
		updateAfternoonActivityItinerary,
		updateLunchRestaurantItinerary,
		updateDinnerRestaurantItinerary
	}
}
