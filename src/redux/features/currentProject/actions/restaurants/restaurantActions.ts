import {
	AddOrEditVenuePayload,
	IAddEntertainment,
	IDeletedEntertainment,
	IEditEntertainment,
	IEditModalRestaurantPayload,
	UpdateDinnerRestaurantPayload,
	UpdateLunchRestaurantPayload,
	UpdateRestaurantEntertainmentPayload,
	UpdateRestaurantVenuePayload,
	UpdateTransferRestaurantPayload
} from '../../types'
import { useAppDispatch } from 'src/hooks/redux/redux'
import * as thunks from './thunks'

export const useRestaurantActions = () => {
	const dispatch = useAppDispatch()

	const editModalRestaurant = (eventModal: IEditModalRestaurantPayload) => {
		dispatch(thunks.editModalRestaurantThunk(eventModal))
	}

	const updateRestaurantEntertainment = (
		payload: UpdateRestaurantEntertainmentPayload
	) => {
		dispatch(thunks.updateRestaurantEntertainmentThunk(payload))
	}

	const addEntertainmentToRestaurant = (
		addEntertainment: IAddEntertainment
	) => {
		dispatch(thunks.addEntertainmentToRestaurantThunk(addEntertainment))
	}
	const deletedEntertainmetInRestaurant = (
		deletedEntertainmet: IDeletedEntertainment
	) => {
		dispatch(thunks.deleteEntertainmentInRestaurantThunk(deletedEntertainmet))
	}
	const editEntertainmentInRestaurant = (
		editEntainment: IEditEntertainment
	) => {
		dispatch(thunks.editEntertainmentInRestaurantThunk(editEntainment))
	}

	const updateLunchRestaurant = (payload: UpdateLunchRestaurantPayload) => {
		dispatch(thunks.updateLunchRestaurantThunk(payload))
	}

	const addOrEditVenue = (infoRestaurant: AddOrEditVenuePayload) => {
		dispatch(thunks.addOrEditVenueThunk(infoRestaurant))
	}

	const updateDinnerRestaurant = (payload: UpdateDinnerRestaurantPayload) => {
		dispatch(thunks.updateDinnerRestaurantThunk(payload))
	}

	const updateTransferRestaurant = (
		payload: UpdateTransferRestaurantPayload
	) => {
		dispatch(thunks.updateTransferRestaurantThunk(payload))
	}

	const updateRestaurantVenue = (payload: UpdateRestaurantVenuePayload) =>
		dispatch(thunks.updateRestaurantVenueThunk(payload))

	return {
		editModalRestaurant,
		updateRestaurantEntertainment,
		addEntertainmentToRestaurant,
		updateLunchRestaurant,
		deletedEntertainmetInRestaurant,
		editEntertainmentInRestaurant,
		addOrEditVenue,
		updateDinnerRestaurant,
		updateTransferRestaurant,
		updateRestaurantVenue
	}
}
