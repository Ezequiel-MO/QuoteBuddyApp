import { useDispatch, useSelector } from 'react-redux'
import {
	ADD_EVENT_TO_SCHEDULE,
	ADD_HOTEL_TO_PROJECT,
	ADD_HOTEL_OVERNIGHT_TO_SCHEDULE,
	ADD_ITENERARY_TRANSFER_TO_SCHEDULE,
	ADD_EVENT_TO_ITENERARY,
	CLEAR_PROJECT,
	EXPAND_TRANSFERS_TO_OPTIONS,
	REMOVE_EVENT_FROM_SCHEDULE,
	REMOVE_EVENT_TO_ITENERARY,
	REMOVE_HOTEL_FROM_PROJECT,
	REMOVE_HOTEL_OVERNIGHT_FROM_SCHEDULE,
	REMOVE_TRANSFER_FROM_SCHEDULE,
	selectCurrentProject,
	DRAG_AND_DROP_EVENT,
	DRAG_AND_DROP_RESTAURANT,
	DRAG_AND_DROP_HOTEL,
	DRAG_AND_DROP_HOTEL_OVERNIGHT,
	SET_CURRENT_PROJECT,
	EDIT_MODAL_HOTEL,
	EDIT_MODAL_HOTEL_OVERNIGHT,
	ADD_GIFT_TO_PROJECT,
	EDIT_GIFT,
	EDIT_MODAL_EVENT,
	EDIT_MODAL_RESTAURANT,
	EDIT_MODAL_MEETING,
	ADD_INTRO_RESTAURANT,
	ADD_INTRO_EVENT,
	ADD_INTRO_MEETING,
	ADD_INTRO_HOTEL_OVERNIGHT,
	ADD_INTRO_TRANSFER_TO_ITINERARY,
	ADD_INTRO_EVENT_TO_ITENERARY,
	ADD_TRANSFER_TO_SCHEDULE,
	ADD_TRANSFER_IN_OR_TRANSFER_OUT_TO_SCHEDULE,
	EDIT_TRANSFER_EVENT_OR_RESTAURANT,
	ADD_OR_EDIT_VENUE,
	ADD_ENTERTAINMENT_IN_RESTAURANT,
	DELETED_ENTERTAINMENT_IN_RESTAURANT,
	REMOVE_GIFT_FROM_PROJECT,
	EDIT_ENTERTAINMENT_IN_RESTAURANT,
	REMOVE_MEETINGS_BY_HOTEL_FROM_PROJECT,
	REMOVE_ITENERARY_TRANSFER_FROM_SCHEDULE
} from '../../redux/features/CurrentProjectSlice'

import {
	IEvent,
	IGift,
	IHotel,
	IProject,
	IRestaurant,
	ITransfer,
	IEntertainment,
	IEntertainmentPrice,
	IDay
} from '../../interfaces'

type TimeOfEvent = 'transfer_in' | 'transfer_out'

interface IAddEntertainment {
	typeMeal: string
	dayIndex: number
	idRestaurant: string
	entertainmentShow: IEntertainment
}

interface IDeletedEntertainment {
	typeMeal: string
	dayIndex: number
	idRestaurant: string
	idEntertainment: string
}

interface IEditEntertainment {
	typeMeal: string
	dayIndex: number
	idRestaurant: string
	idEntertainment: string
	editPrice: IEntertainmentPrice
}

interface IAddHotelOvernight {
	dayIndex: number
	hotel: IHotel
}

interface IDeletedHotelOvernight {
	dayIndex: number
	hotelId: string
}

interface IAddIntro {
	dayIndex: number
	typeEvent: string
	textContent: string
}

interface IAddIntroTransferItinerary {
	dayIndex: number
	textContent: string
}

interface IHotelModal {
	pricesEdit?: any
	textContentEdit?: string
	imageContentUrlEdit?: string[]
	meetingImageContentUrl?: string[]
	meetingDetails?: any
	dayIndex?: number
	id?: string
}

interface IDragAndDropHotelOvernight {
	newSchedule: IDay[]
}

interface IAddItenerayTransfer {
	dayIndex: number
	transfers: ITransfer[]
	starts: 'morning' | 'afternoon' | 'night'
	ends: 'morning' | 'afternoon' | 'night'
}

interface IRemoveIteneraryTransfer {
	dayIndex: number
	transferId: string
}

interface IAddEventToItenerary {
	dayIndex: number
	typeOfEvent:
		| 'morningActivity'
		| 'afternoonActivity'
		| 'nightActivity'
		| 'lunch'
		| 'dinner'
	event: IEvent | IRestaurant
}

interface IRemoveEventToItinerary {
	dayIndex: number
	typeOfEvent:
		| 'morningActivity'
		| 'afternoonActivity'
		| 'nightActivity'
		| 'lunch'
		| 'dinner'
	idEvent: string
}

interface IIntroEventItinerary {
	dayIndex: number
	typeOfEvent:
		| 'morningActivity'
		| 'afternoonActivity'
		| 'nightActivity'
		| 'lunch'
		| 'dinner'
	textContent: string
}

export const useCurrentProject = () => {
	const dispatch = useDispatch()
	const currentProject = useSelector(selectCurrentProject)

	const setCurrentProject = (project: IProject) => {
		dispatch(SET_CURRENT_PROJECT(project))
	}
	const addHotelToProject = (hotel: IHotel) => {
		dispatch(ADD_HOTEL_TO_PROJECT(hotel))
	}
	const addHotelOvernightToSchedule = (addHotel: IAddHotelOvernight) => {
		dispatch(ADD_HOTEL_OVERNIGHT_TO_SCHEDULE(addHotel))
	}
	const addEventToSchedule = (event: any) => {
		dispatch(ADD_EVENT_TO_SCHEDULE(event))
	}
	const addItenerayTransfer = (addTransfer: IAddItenerayTransfer) => {
		dispatch(ADD_ITENERARY_TRANSFER_TO_SCHEDULE(addTransfer))
	}
	const addEventToIteneray = (addEvent: IAddEventToItenerary) => {
		dispatch(ADD_EVENT_TO_ITENERARY(addEvent))
	}
	const removeHotelFromProject = (hotelId: string) => {
		dispatch(REMOVE_HOTEL_FROM_PROJECT(hotelId))
	}
	const removeHotelOvernightSchedule = (
		removeHotel: IDeletedHotelOvernight
	) => {
		dispatch(REMOVE_HOTEL_OVERNIGHT_FROM_SCHEDULE(removeHotel))
	}
	const removeTransferFromSchedule = (
		timeOfEvent: string,
		transferId: string
	) => {
		dispatch(REMOVE_TRANSFER_FROM_SCHEDULE({ timeOfEvent, transferId }))
	}
	const removeEventFromSchedule = ({
		dayOfEvent,
		timeOfEvent,
		eventId
	}: {
		dayOfEvent: string
		timeOfEvent: string
		eventId: string
	}) => {
		dispatch(REMOVE_EVENT_FROM_SCHEDULE({ dayOfEvent, timeOfEvent, eventId }))
	}
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
	const expandTransfersToOptions = () => {
		dispatch(EXPAND_TRANSFERS_TO_OPTIONS())
	}
	const editModalHotel = (hotelModal: IHotelModal) => {
		dispatch(EDIT_MODAL_HOTEL(hotelModal))
	}
	const editModalHotelOvernight = (hotelModal: IHotelModal) => {
		dispatch(EDIT_MODAL_HOTEL_OVERNIGHT(hotelModal))
	}
	const addGiftToProject = (gift: IGift) => {
		dispatch(ADD_GIFT_TO_PROJECT(gift))
	}
	const removeGiftFromProject = (giftId: string) => {
		dispatch(REMOVE_GIFT_FROM_PROJECT(giftId))
	}
	const editGift = (gift: IGift) => {
		dispatch(EDIT_GIFT(gift))
	}
	const editModalEvent = (eventModal: any) => {
		dispatch(EDIT_MODAL_EVENT(eventModal))
	}
	const editModalRestaurant = (eventModal: any) => {
		dispatch(EDIT_MODAL_RESTAURANT(eventModal))
	}
	const editModalMeeting = (meetingModal: any) => {
		dispatch(EDIT_MODAL_MEETING(meetingModal))
	}
	const addIntroRestaurant = (introRestaurant: IAddIntro) => {
		dispatch(ADD_INTRO_RESTAURANT(introRestaurant))
	}
	const addIntroEvent = (introEvent: IAddIntro) => {
		dispatch(ADD_INTRO_EVENT(introEvent))
	}
	const addIntroMeeting = (introMeeting: IAddIntro) => {
		dispatch(ADD_INTRO_MEETING(introMeeting))
	}
	const addIntroHotelOvernight = (introHotel: IAddIntro) => {
		dispatch(ADD_INTRO_HOTEL_OVERNIGHT(introHotel))
	}
	const addIntroTransferItinerary = (
		introTransfer: IAddIntroTransferItinerary
	) => {
		dispatch(ADD_INTRO_TRANSFER_TO_ITINERARY(introTransfer))
	}
	const addIntroEventItinerary = (introEvent: IIntroEventItinerary) => {
		dispatch(ADD_INTRO_EVENT_TO_ITENERARY(introEvent))
	}
	const addTransferToSchedule = (
		timeOfEvent: TimeOfEvent,
		transfers: ITransfer[]
	) => {
		dispatch(ADD_TRANSFER_TO_SCHEDULE({ timeOfEvent, transfers }))
	}
	const addTransferInOrTransferOutSchedule = (transfer: any) => {
		dispatch(ADD_TRANSFER_IN_OR_TRANSFER_OUT_TO_SCHEDULE(transfer))
	}
	const editTransferEventOrRestaurant = (eventEdit: any) => {
		dispatch(EDIT_TRANSFER_EVENT_OR_RESTAURANT(eventEdit))
	}
	const addOrEditVenue = (infoRestaurant: any) => {
		dispatch(ADD_OR_EDIT_VENUE(infoRestaurant))
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
	const removeMeetingsByHotel = (hotelId: string) => {
		dispatch(REMOVE_MEETINGS_BY_HOTEL_FROM_PROJECT(hotelId))
	}
	const removeIteneraryTransfer = (transfer: IRemoveIteneraryTransfer) => {
		dispatch(REMOVE_ITENERARY_TRANSFER_FROM_SCHEDULE(transfer))
	}
	//dispatch PARA ELEMINAR UN "EVENT" OR "RESTAURANT" AL "ITINERARY"
	const removeIteneraryEvent = (event: IRemoveEventToItinerary) => {
		dispatch(REMOVE_EVENT_TO_ITENERARY(event))
	}
	const clearProject = () => {
		dispatch(CLEAR_PROJECT())
	}

	return {
		currentProject,
		setCurrentProject,
		addHotelToProject,
		addHotelOvernightToSchedule,
		addEventToSchedule,
		addItenerayTransfer,
		addEventToIteneray,
		removeHotelFromProject,
		removeHotelOvernightSchedule,
		removeEventFromSchedule,
		removeTransferFromSchedule,
		expandTransfersToOptions,
		dragAndDropEvent,
		dragAndDropRestaurant,
		dragAndDropHotel,
		dragAndDropHotelOvernight,
		editModalHotel,
		editModalHotelOvernight,
		addGiftToProject,
		removeGiftFromProject,
		editGift,
		editModalEvent,
		editModalRestaurant,
		editModalMeeting,
		addIntroRestaurant,
		addIntroEvent,
		addIntroMeeting,
		addIntroHotelOvernight,
		addIntroTransferItinerary,
		addIntroEventItinerary,
		addTransferToSchedule,
		addTransferInOrTransferOutSchedule,
		editTransferEventOrRestaurant,
		addOrEditVenue,
		addEntertainmentInRestaurant,
		deletedEntertainmetInRestaurant,
		editEntertaienmentInRestaurant,
		removeMeetingsByHotel,
		removeIteneraryTransfer,
		removeIteneraryEvent,
		clearProject
	}
}
