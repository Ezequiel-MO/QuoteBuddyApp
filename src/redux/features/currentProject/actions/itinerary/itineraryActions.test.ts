import store from 'src/redux/store'
import { currentProjectSlice } from '../../CurrentProjectSlice'
import * as thunks from './thunks'
import { IRestaurant } from '@interfaces/restaurant'
import { starterRestaurant } from 'src/constants/starterObjects'

describe('itineraryActions thunks', () => {
	const { actions } = currentProjectSlice

	const mockRestaurant: IRestaurant = { ...starterRestaurant }

	beforeEach(() => {
		vi.spyOn(console, 'error').mockImplementation(() => {})
		vi.spyOn(console, 'warn').mockImplementation(() => {})
		store.dispatch({ type: actions.CLEAR_PROJECT.type })
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	describe('addIntroToEventItineraryThunk', () => {
		it('should add an intro if dayIndex and itinerary are valid', () => {
			store.dispatch(
				thunks.addIntroToEventItineraryThunk({
					dayIndex: 0,
					typeOfEvent: 'morningActivity',
					textContent: 'Morning Activity Intro'
				})
			)
			const { project } = store.getState().currentProject
			expect(project.schedule[0].itinerary.morningActivity.intro).toBe(
				'Morning Activity Intro'
			)
			expect(console.error).not.toHaveBeenCalled()
		})

		it('should throw an error if dayIndex is out of range', () => {
			expect(() => {
				store.dispatch(
					thunks.addIntroToEventItineraryThunk({
						dayIndex: 999,
						typeOfEvent: 'morningActivity',
						textContent: 'Hello out of range'
					})
				)
			}).toThrow('Invalid day index: 999')
		})

		it('should throw an error if the itinerary is missing or empty', () => {
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: [{}]
				}
			})
			expect(() => {
				store.dispatch(
					thunks.addIntroToEventItineraryThunk({
						dayIndex: 0,
						typeOfEvent: 'morningActivity',
						textContent: '<p><br></p>'
					})
				)
			}).toThrow('ERROR! The Itinerary has no Transfer/s')
		})
	})

	describe('addEventToItineraryThunk', () => {
		it('should add a meal or activity event if dayIndex and itinerary are valid', () => {
			store.dispatch(
				thunks.addEventToItineraryThunk({
					dayIndex: 0,
					typeOfEvent: 'lunch',
					event: mockRestaurant
				})
			)
			const { project } = store.getState().currentProject
			const lunchRestaurants =
				project.schedule[0].itinerary.lunch.restaurants || []
			expect(lunchRestaurants.length).toBe(2)
			expect(lunchRestaurants[1]._id).toBe('rest-1')
		})
		it('should throw an error if dayIndex is invalid', () => {
			expect(() => {
				store.dispatch(
					thunks.addEventToItineraryThunk({
						dayIndex: 999,
						typeOfEvent: 'lunch',
						event: mockRestaurant
					})
				)
			}).toThrow('Invalid day index: 999')
		})
		it('should throw an error if itinerary is missing or empty', () => {
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: [
						{
							itinerary: { itinerary: [] }
						}
					]
				}
			})
			expect(() => {
				store.dispatch(
					thunks.addEventToItineraryThunk({
						dayIndex: 0,
						typeOfEvent: 'dinner',
						event: mockRestaurant
					})
				)
			}).toThrow('ERROR! The Itinerary has no Transfer/s')
		})

		it('should throw an error if the typeOfEvent is invalid', () => {
			expect(() => {
				store.dispatch(
					thunks.addEventToItineraryThunk({
						dayIndex: 0,
						typeOfEvent: 'invalidType' as any,
						event: mockRestaurant
					})
				)
			}).toThrow('Invalid type of event: invalidType')
		})
	})

	describe('removeEventFromItineraryThunk', () => {
		it('should remove a meal or activity from the itinerary', () => {
			store.dispatch(
				thunks.removeEventFromItineraryThunk({
					dayIndex: 0,
					typeOfEvent: 'dinner',
					idEvent: 'itinerary-dinner-restaurant-1'
				})
			)
			const { project } = store.getState().currentProject
			const dinnerRestaurants =
				project.schedule[0].itinerary.dinner.restaurants || []
			expect(dinnerRestaurants.length).toBe(0)
		})
		it('should throw an error if dayIndex is invalid', () => {
			expect(() => {
				store.dispatch(
					thunks.removeEventFromItineraryThunk({
						dayIndex: 999,
						typeOfEvent: 'nightActivity',
						idEvent: 'itinerary-night-event-1'
					})
				)
			}).toThrow('Invalid day index: 999')
		})
		it('should throw an error if itinerary is missing or empty', () => {
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: [{ itinerary: null }]
				}
			})
			expect(() => {
				store.dispatch(
					thunks.removeEventFromItineraryThunk({
						dayIndex: 0,
						typeOfEvent: 'lunch',
						idEvent: 'itinerary-lunch-restaurant-1'
					})
				)
			}).toThrow('ERROR! The Itinerary has no Transfer/s')
		})
		it('should throw an error if the typeOfEvent is invalid', () => {
			expect(() => {
				store.dispatch(
					thunks.removeEventFromItineraryThunk({
						dayIndex: 0,
						typeOfEvent: 'invalidType' as any,
						idEvent: '123'
					})
				)
			}).toThrow('Invalid type of event: invalidType')
		})
	})

	describe('updateAssistanceTransfersItineraryThunk', () => {
		it('should update the given key for all transfers in dayIndex itinerary', () => {
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: [
						{
							itinerary: {
								itinerary: [
									{ _id: 'trans1', assistance: 2 },
									{ _id: 'trans2', assistance: 3 }
								]
							}
						}
					]
				}
			})

			store.dispatch(
				thunks.updateAssistanceTransfersItineraryThunk({
					dayIndex: 0,
					key: 'assistance',
					value: 10
				})
			)
			const { project } = store.getState().currentProject

			expect(project.schedule[0].itinerary.itinerary[0].assistance).toBe(10)
			expect(project.schedule[0].itinerary.itinerary[1].assistance).toBe(10)
			expect(console.warn).not.toHaveBeenCalled()
		})
		it('should warn if no transfers found for that dayIndex', () => {
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: [{}]
				}
			})
			store.dispatch(
				thunks.updateAssistanceTransfersItineraryThunk({
					dayIndex: 0,
					key: 'assistance',
					value: 5
				})
			)
			expect(console.warn).toHaveBeenCalledWith(
				'No transfers found for dayIndex: 0'
			)
		})
	})

	describe('updateTransfersItineraryThunk', () => {
		it('should update service cost if typeUpdate=priceTransfer', () => {
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: [
						{
							itinerary: {
								itinerary: [
									{
										_id: 'trans1',
										selectedService: 'dispo_4h',
										dispo_4h: 100
									}
								]
							}
						}
					]
				}
			})
			store.dispatch(
				thunks.updateTransfersItineraryThunk({
					dayIndex: 0,
					idTransfer: 'trans1',
					typeUpdate: 'priceTransfer',
					serviceKey: 'dispo_4h',
					value: 200
				})
			)
			const { project } = store.getState().currentProject
			expect(project.schedule[0].itinerary.itinerary[0].dispo_4h).toBe(200)
			expect(console.warn).not.toHaveBeenCalled()
		})
		it('should replicate transfer if typeUpdate=transfer, using "value" as count', () => {
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: [
						{
							itinerary: {
								itinerary: [
									{
										_id: 'trans1',
										selectedService: 'dispo_4h',
										dispo_4h: 100
									}
								]
							}
						}
					]
				}
			})

			store.dispatch(
				thunks.updateTransfersItineraryThunk({
					dayIndex: 0,
					idTransfer: 'trans1',
					typeUpdate: 'transfer',
					serviceKey: 'dispo_4h',
					value: 3
				})
			)

			const result =
				store.getState().currentProject.project.schedule[0].itinerary.itinerary

			expect(result.length).toBe(3)
			expect(result[0]._id).toBe('trans1')
			expect(result[1]._id).toBe('trans1')
			expect(result[2]._id).toBe('trans1')
			expect(console.warn).not.toHaveBeenCalled()
		})

		it('should warn if no transfers itinerary found for dayIndex', () => {
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: [{}]
				}
			})

			store.dispatch(
				thunks.updateTransfersItineraryThunk({
					dayIndex: 0,
					idTransfer: 'xxx',
					typeUpdate: 'priceTransfer',
					serviceKey: 'dispo_4h',
					value: 200
				})
			)
			expect(console.warn).toHaveBeenCalledWith(
				'No transfers itinerary found for dayIndex: 0'
			)
		})
		it('should warn if transfer not found for id/serviceKey, in typeUpdate=transfer', () => {
			store.dispatch(
				thunks.updateTransfersItineraryThunk({
					dayIndex: 0,
					idTransfer: 'missing',
					typeUpdate: 'transfer',
					serviceKey: 'dispo_4h',
					value: 2
				})
			)
			expect(console.warn).toHaveBeenCalledWith(
				'Transfer not found for id: missing and serviceKey: dispo_4h'
			)
		})
		it('should warn if typeUpdate is invalid', () => {
			store.dispatch(
				thunks.updateTransfersItineraryThunk({
					dayIndex: 0,
					idTransfer: 'trans1',
					typeUpdate: 'invalidType' as any,
					serviceKey: 'dispo_4h',
					value: 10
				})
			)
			expect(console.warn).toHaveBeenCalledWith(
				'Invalid typeUpdate: invalidType'
			)
		})
	})

	describe('updateMorningActivityItineraryThunk', () => {
		it('should update the morning activity if found', () => {
			store.dispatch(
				thunks.updateMorningActivityItineraryThunk({
					dayIndex: 0,
					id: 'itinerary-morning-event-1',
					key: 'price',
					value: 200
				})
			)
			const { project } = store.getState().currentProject
			expect(
				project.schedule[0].itinerary.morningActivity.events[0].price
			).toBe(200)
		})
		it('should warn if dayIndex is invalid', () => {
			store.dispatch(
				thunks.updateMorningActivityItineraryThunk({
					dayIndex: 999,
					id: 'actX',
					key: 'price',
					value: 150
				})
			)
			expect(console.warn).toHaveBeenCalledWith('Invalid dayIndex: 999')
		})
		it('should warn if no morning activities found', () => {
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: [{ itinerary: {} }]
				}
			})
			store.dispatch(
				thunks.updateMorningActivityItineraryThunk({
					dayIndex: 0,
					id: 'act1',
					key: 'price',
					value: 150
				})
			)
			expect(console.warn).toHaveBeenCalledWith(
				'No morning activities found for dayIndex: 0'
			)
		})
		it('should warn if activity is not found', () => {
			store.dispatch(
				thunks.updateMorningActivityItineraryThunk({
					dayIndex: 0,
					id: 'actX',
					key: 'price',
					value: 200
				})
			)
			expect(console.warn).toHaveBeenCalledWith(
				'Activity with id: actX not found in morning activities'
			)
		})
		it('should warn if key is invalid for the activity', () => {
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: [
						{
							itinerary: {
								itinerary: [{ _id: 'transfer-1' }],
								morningActivity: {
									intro: '',
									events: [{ _id: 'act1', price: 100 }]
								}
							}
						}
					]
				}
			})

			store.dispatch(
				thunks.updateMorningActivityItineraryThunk({
					dayIndex: 0,
					id: 'act1',
					key: 'unknownKey' as any,
					value: 'someValue'
				})
			)

			expect(console.warn).toHaveBeenCalledWith(
				'Invalid key: unknownKey for activity with id: act1'
			)
		})
	})

	describe('updateAfternoonActivityItineraryThunk', () => {
		it('should update the afternoon activity if found', () => {
			store.dispatch(
				thunks.updateAfternoonActivityItineraryThunk({
					dayIndex: 0,
					id: 'itinerary-afternoon-event-1',
					key: 'price',
					value: 200
				})
			)
			const { project } = store.getState().currentProject
			expect(
				project.schedule[0].itinerary.afternoonActivity.events[0].price
			).toBe(200)
		})
		it('should warn if dayIndex is invalid', () => {
			store.dispatch(
				thunks.updateAfternoonActivityItineraryThunk({
					dayIndex: 999,
					id: 'actX',
					key: 'price',
					value: 150
				})
			)
			expect(console.warn).toHaveBeenCalledWith('Invalid dayIndex: 999')
		})
		it('should warn if no morning activities found', () => {
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: [{ itinerary: {} }]
				}
			})
			store.dispatch(
				thunks.updateAfternoonActivityItineraryThunk({
					dayIndex: 0,
					id: 'act1',
					key: 'price',
					value: 150
				})
			)
			expect(console.warn).toHaveBeenCalledWith(
				'No afternoon activities found for dayIndex: 0'
			)
		})
		it('should warn if activity is not found', () => {
			store.dispatch(
				thunks.updateAfternoonActivityItineraryThunk({
					dayIndex: 0,
					id: 'actX',
					key: 'price',
					value: 200
				})
			)
			expect(console.warn).toHaveBeenCalledWith(
				'Activity with id: actX not found in afternoon activities'
			)
		})
		it('should warn if key is invalid for the activity', () => {
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: [
						{
							itinerary: {
								itinerary: [{ _id: 'transfer-1' }],
								afternoonActivity: {
									intro: '',
									events: [{ _id: 'act1', price: 100 }]
								}
							}
						}
					]
				}
			})

			store.dispatch(
				thunks.updateAfternoonActivityItineraryThunk({
					dayIndex: 0,
					id: 'act1',
					key: 'unknownKey' as any,
					value: 'someValue'
				})
			)

			expect(console.warn).toHaveBeenCalledWith(
				'Invalid key: unknownKey for activity with id: act1'
			)
		})
	})

	describe('updateLunchRestaurantItinearyThunk', () => {
		it('should update the given lunch restaurant if found', () => {
			store.dispatch(
				thunks.updateLunchRestaurantItinearyThunk({
					dayIndex: 0,
					id: 'itinerary-lunch-restaurant-1',
					key: 'price', // from `'price' | 'participants'`
					value: 99
				})
			)

			const { project } = store.getState().currentProject
			expect(project.schedule[0].itinerary.lunch.restaurants[0].price).toBe(99)
		})
		it('should warn if dayIndex is invalid', () => {
			store.dispatch(
				thunks.updateLunchRestaurantItinearyThunk({
					dayIndex: 999,
					id: 'itinerary-lunch-restaurant-1',
					key: 'price',
					value: 99
				})
			)
			expect(console.warn).toHaveBeenCalledWith('Invalid dayIndex: 999')
		})
		it('should warn if no lunch restaurants array found', () => {
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: [{ itinerary: {} }]
				}
			})

			store.dispatch(
				thunks.updateLunchRestaurantItinearyThunk({
					dayIndex: 0,
					id: 'rest1',
					key: 'price',
					value: 20
				})
			)
			expect(console.warn).toHaveBeenCalledWith(
				'No lunch restaurants found for dayIndex: 0'
			)
		})
	})

	describe('updateDinnerRestaurantItineraryThunk', () => {
		it('should update the given dinner restaurant if found', () => {
			store.dispatch(
				thunks.updateDinnerRestaurantItineraryThunk({
					dayIndex: 0,
					id: 'itinerary-dinner-restaurant-1',
					key: 'price',
					value: 150
				})
			)

			const { project } = store.getState().currentProject
			expect(project.schedule[0].itinerary.dinner.restaurants[0].price).toBe(
				150
			)
		})
		it('should warn if dayIndex is invalid', () => {
			store.dispatch(
				thunks.updateDinnerRestaurantItineraryThunk({
					dayIndex: 999,
					id: 'itinerary-dinner-restaurant-1',
					key: 'price',
					value: 300
				})
			)
			expect(console.warn).toHaveBeenCalledWith('Invalid dayIndex: 999')
		})
		it('should warn if no dinner restaurants array found', () => {
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: [{ itinerary: {} }]
				}
			})

			store.dispatch(
				thunks.updateDinnerRestaurantItineraryThunk({
					dayIndex: 0,
					id: 'itinerary-dinner-restaurant-1',
					key: 'price',
					value: 300
				})
			)
			expect(console.warn).toHaveBeenCalledWith(
				'No dinner restaurants found for dayIndex: 0'
			)
		})
		it('should warn if that restaurant is not found', () => {
			store.dispatch(
				thunks.updateDinnerRestaurantItineraryThunk({
					dayIndex: 0,
					id: 'not-there',
					key: 'price',
					value: 300
				})
			)
			expect(console.warn).toHaveBeenCalledWith(
				'Restaurant with id: not-there not found in dinner restaurants'
			)
		})
		it('should warn if key is invalid for that restaurant', () => {
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: [
						{
							itinerary: {
								dinner: {
									intro: '',
									restaurants: [{ _id: 'restD', price: 70 }]
								}
							}
						}
					]
				}
			})
			store.dispatch(
				thunks.updateDinnerRestaurantItineraryThunk({
					dayIndex: 0,
					id: 'restD',
					key: 'unknownKey' as any,
					value: 999
				})
			)
			expect(console.warn).toHaveBeenCalledWith(
				'Invalid key: unknownKey for restaurant with id: restD'
			)
		})
	})
})
