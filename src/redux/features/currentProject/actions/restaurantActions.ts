import { useDispatch } from 'react-redux'
import {
	IAddEntertainment,
	IAddIntro,
	IDeletedEntertainment,
	IEditEntertainment
} from '../types'
import {
	ADD_ENTERTAINMENT_IN_RESTAURANT,
	ADD_INTRO_RESTAURANT,
	ADD_OR_EDIT_VENUE,
	DELETED_ENTERTAINMENT_IN_RESTAURANT,
	EDIT_ENTERTAINMENT_IN_RESTAURANT,
	EDIT_MODAL_RESTAURANT
} from '../CurrentProjectSlice'
import { useAppDispatch } from 'src/hooks/redux/redux'

export const useRestaurantActions = () => {
	const dispatch = useAppDispatch()

	const addIntroRestaurant = (introRestaurant: IAddIntro) => {
		dispatch(ADD_INTRO_RESTAURANT(introRestaurant))
	}

	const editModalRestaurant = (eventModal: any) => {
		dispatch(EDIT_MODAL_RESTAURANT(eventModal))
	}

	const addEntertainmentInRestaurant = (
		addEntertainment: IAddEntertainment
	) => {
		dispatch(ADD_ENTERTAINMENT_IN_RESTAURANT(addEntertainment))
	}
	const deletedEntertainmetInRestaurant = (
		deletedEntertainmet: IDeletedEntertainment
	) => {
		dispatch(DELETED_ENTERTAINMENT_IN_RESTAURANT(deletedEntertainmet))
	}
	const editEntertaienmentInRestaurant = (
		editEntertaienment: IEditEntertainment
	) => {
		dispatch(EDIT_ENTERTAINMENT_IN_RESTAURANT(editEntertaienment))
	}

	const addOrEditVenue = (infoRestaurant: any) => {
		dispatch(ADD_OR_EDIT_VENUE(infoRestaurant))
	}

	return {
		addIntroRestaurant,
		editModalRestaurant,
		addEntertainmentInRestaurant,
		deletedEntertainmetInRestaurant,
		editEntertaienmentInRestaurant,
		addOrEditVenue
	}
}
