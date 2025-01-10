import store from 'src/redux/store'
import { currentProjectSlice } from '../../CurrentProjectSlice'
import { IDay } from '@interfaces/project'
import {
	starterEntertainment,
	starterRestaurant,
	starterSchedule
} from 'src/constants/starterObjects'
import { IRestaurant } from '@interfaces/restaurant'
import { IEntertainment } from '@interfaces/entertainment'
import * as thunks from './thunks'

describe('restaurantActions thunks', () => {
	const { actions } = currentProjectSlice

	beforeEach(() => {
		vi.spyOn(console, 'error').mockImplementation(() => {})
		vi.spyOn(console, 'warn').mockImplementation(() => {})
		store.dispatch({ type: actions.CLEAR_PROJECT.type })
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	const mockSchedule: IDay[] = starterSchedule
	const mockRestaurant: IRestaurant = { ...starterRestaurant }
	const mockEntertainment: IEntertainment = { ...starterEntertainment }

	// ─────────────────────────────────────────────────────────
	// 1) addEntertainmentToRestaurantThunk
	// ─────────────────────────────────────────────────────────

	describe('addEntertainmentToRestaurantThunk', () => {
		it('should add entertainment to an existing restaurant', () => {
			const scheduleWithLunch = [
				{
					...mockSchedule[0],
					lunch: {
						intro: '',
						included: true,
						restaurants: [{ ...mockRestaurant, _id: 'rest-lunch' }]
					}
				}
			]
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: scheduleWithLunch
				}
			})

			store.dispatch(
				thunks.addEntertainmentToRestaurantThunk({
					typeMeal: 'lunch',
					dayIndex: 0,
					idRestaurant: 'rest-lunch',
					entertainmentShow: { ...mockEntertainment, _id: 'ent-abc' }
				})
			)
			const finalSchedule = store.getState().currentProject.project.schedule
			const entArr = finalSchedule[0].lunch.restaurants[0].entertainment || []
			expect(entArr.length).toBe(1)
			expect(entArr[0]._id).toBe('ent-abc')
		})

		it('should throw an error if dayIndex is out of range', () => {
			expect(() => {
				store.dispatch(
					thunks.addEntertainmentToRestaurantThunk({
						typeMeal: 'dinner',
						dayIndex: 999,
						idRestaurant: 'rest-lunch',
						entertainmentShow: mockEntertainment
					})
				)
			}).toThrow('Invalid day index.')
		})
	})

	// ─────────────────────────────────────────────────────────
	// 2) updateRestaurantEntertainmentThunk
	// ─────────────────────────────────────────────────────────

	describe('updateRestaurantEntertainmentThunk', () => {
		it('should update an existing entertainment price field', () => {
			const scheduleWithDinner: IDay[] = [
				{
					...mockSchedule[0],
					dinner: {
						intro: '',
						included: true,
						restaurants: [
							{
								...mockRestaurant,
								_id: 'rest-din',
								entertainment: [
									{
										...mockEntertainment,
										_id: 'ent-9',
										price: {
											artistsFee: 100,
											aavv: 50,
											travelAllowance: 20,
											mealAllowance: 10
										}
									}
								]
							}
						]
					}
				}
			]
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: scheduleWithDinner
				}
			})
			store.dispatch(
				thunks.updateRestaurantEntertainmentThunk({
					dayIndex: 0,
					typeMeal: 'dinner',
					idRestaurant: 'rest-din',
					idEntertainment: 'ent-9',
					keyEntertainmentPrice: 'artistsFee',
					value: 999
				})
			)
			const final = store.getState().currentProject.project.schedule
			const ent =
				final[0].dinner.restaurants[0].entertainment?.[0].price?.artistsFee
			expect(ent).toBe(999)
		})

		it('should do nothing if dayIndex is invalid or restaurant not found', () => {
			// if it doesn't find the correct day or restaurant, the code returns
			// no error thrown
			store.dispatch(
				thunks.updateRestaurantEntertainmentThunk({
					dayIndex: 999,
					typeMeal: 'lunch',
					idRestaurant: 'x',
					idEntertainment: 'y',
					keyEntertainmentPrice: 'artistsFee',
					value: 123
				})
			)
		})
	})

	// ─────────────────────────────────────────────────────────
	// 3) updateLunchRestaurantThunk
	// ─────────────────────────────────────────────────────────

	describe('updateLunchRestaurantThunk', () => {
		it('should update a key on a lunch restaurant', () => {
			const scheduleWithLunch = [
				{
					...mockSchedule[0],
					lunch: {
						intro: '',
						included: true,
						restaurants: [{ ...mockRestaurant, _id: 'rest-lunch2', price: 111 }]
					}
				}
			]
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: scheduleWithLunch
				}
			})
			store.dispatch(
				thunks.updateLunchRestaurantThunk({
					value: 555,
					dayIndex: 0,
					id: 'rest-lunch2',
					key: 'price'
				})
			)
			const final = store.getState().currentProject.project.schedule
			expect(final[0].lunch.restaurants[0].price).toBe(555)
		})
	})

	// ─────────────────────────────────────────────────────────
	// 4) addOrEditVenueThunk
	// ─────────────────────────────────────────────────────────

	describe('addOrEditVenueThunk', () => {
		it('should set or update venue_price for the given restaurant', () => {
			const scheduleWithLunch: IDay[] = [
				{
					...mockSchedule[0],
					lunch: {
						intro: '',
						included: true,
						restaurants: [
							{
								...mockRestaurant,
								_id: 'rest-venue',
								venue_price: {}
							}
						]
					}
				}
			]
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: scheduleWithLunch
				}
			})
			store.dispatch(
				thunks.addOrEditVenueThunk({
					typeMeal: 'lunch',
					dayIndex: 0,
					idRestaurant: 'rest-venue',
					venueEdit: {
						rental: 1000,
						cocktail_units: 2
					}
				})
			)
			const final = store.getState().currentProject.project.schedule
			const ven = final[0].lunch.restaurants[0].venue_price
			expect(ven?.rental).toBe(1000)
			expect(ven?.cocktail_units).toBe(2)
		})

		it('should throw if the restaurant is not found', () => {
			expect(() => {
				store.dispatch(
					thunks.addOrEditVenueThunk({
						typeMeal: 'dinner',
						dayIndex: 0,
						idRestaurant: 'not-here',
						venueEdit: { rental: 300 }
					})
				)
			}).toThrow('Restaurant not found.')
		})
	})

	// ─────────────────────────────────────────────────────────
	// 5) editModalRestaurantThunk
	// ─────────────────────────────────────────────────────────

	describe('editModalRestaurantThunk', () => {
		it('should edit the restaurant (price, isVenue, etc.)', () => {
			const scheduleWithDinner = [
				{
					...mockSchedule[0],
					dinner: {
						intro: '',
						included: true,
						restaurants: [{ ...mockRestaurant, _id: 'rest-modal', price: 88 }]
					}
				}
			]
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: scheduleWithDinner
				}
			})

			store.dispatch(
				thunks.editModalRestaurantThunk({
					id: 'rest-modal',
					dayIndex: 0,
					typeOfEvent: 'dinner',
					data: {
						price: 999,
						isVenue: true
					},
					imagesEvent: ['img1', 'img2'],
					textContent: 'New text content'
				})
			)

			const final = store.getState().currentProject.project.schedule
			const edited = final[0].dinner.restaurants[0]
			expect(edited.price).toBe(999)
			expect(edited.isVenue).toBe(true)
			expect(edited.imageContentUrl).toEqual(['img1', 'img2'])
			expect(edited.textContent).toBe('New text content')
		})

		it('should throw if dayIndex is invalid', () => {
			expect(() => {
				store.dispatch(
					thunks.editModalRestaurantThunk({
						id: 'rX',
						dayIndex: 999,
						typeOfEvent: 'lunch',
						data: { price: 100, isVenue: false },
						imagesEvent: [],
						textContent: ''
					})
				)
			}).toThrow('Invalid day index.')
		})
	})

	// ─────────────────────────────────────────────────────────
	// 6) editEntertainmentInRestaurantThunk
	// ─────────────────────────────────────────────────────────

	describe('editEntertainmentInRestaurantThunk', () => {
		it('should update the entertainment price in an existing restaurant', () => {
			const scheduleWithLunch = [
				{
					...mockSchedule[0],
					lunch: {
						intro: '',
						included: true,
						restaurants: [
							{
								...mockRestaurant,
								_id: 'rest-editEnt',
								entertainment: [
									{
										...mockEntertainment,
										_id: 'ent-xyz',
										price: {
											artistsFee: 100,
											aavv: 10,
											travelAllowance: 5,
											mealAllowance: 0
										}
									}
								]
							}
						]
					}
				}
			]

			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: scheduleWithLunch
				}
			})

			store.dispatch(
				thunks.editEntertainmentInRestaurantThunk({
					typeMeal: 'lunch',
					dayIndex: 0,
					idRestaurant: 'rest-editEnt',
					idEntertainment: 'ent-xyz',
					editPrice: {
						artistsFee: 999,
						aavv: 50,
						travelAllowance: 20,
						mealAllowance: 15
					}
				})
			)

			const final = store.getState().currentProject.project.schedule
			const entPrice = final[0].lunch.restaurants[0].entertainment?.[0].price
			expect(entPrice?.artistsFee).toBe(999)
			expect(entPrice?.aavv).toBe(50)
			expect(entPrice?.travelAllowance).toBe(20)
			expect(entPrice?.mealAllowance).toBe(15)
		})

		it('should throw if entertainment is missing or not found', () => {
			expect(() => {
				store.dispatch(
					thunks.editEntertainmentInRestaurantThunk({
						typeMeal: 'lunch',
						dayIndex: 0,
						idRestaurant: 'rest-111',
						idEntertainment: 'ent-999',
						editPrice: {
							artistsFee: 100,
							aavv: 0,
							travelAllowance: 0,
							mealAllowance: 0
						}
					})
				)
			}).toThrow('Restaurant not found.')
		})
	})

	// ─────────────────────────────────────────────────────────
	// 7) deleteEntertainmentInRestaurantThunk
	// ─────────────────────────────────────────────────────────

	describe('deleteEntertainmentInRestaurantThunk', () => {
		it('should remove the specified entertainment from the restaurant', () => {
			const scheduleWithDinner = [
				{
					...mockSchedule[0],
					dinner: {
						intro: '',
						included: true,
						restaurants: [
							{
								...mockRestaurant,
								_id: 'rest-delEnt',
								entertainment: [
									{ ...mockEntertainment, _id: 'ent-delete1' },
									{ ...mockEntertainment, _id: 'ent-delete2' }
								]
							}
						]
					}
				}
			]
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: scheduleWithDinner
				}
			})

			store.dispatch(
				thunks.deleteEntertainmentInRestaurantThunk({
					typeMeal: 'dinner',
					dayIndex: 0,
					idRestaurant: 'rest-delEnt',
					idEntertainment: 'ent-delete1'
				})
			)

			const final = store.getState().currentProject.project.schedule
			const ent = final[0].dinner.restaurants[0].entertainment
			expect(ent?.length).toBe(1)
			expect(ent?.[0]._id).toBe('ent-delete2')
		})

		it('should throw if restaurant or entertainment is not found', () => {
			expect(() => {
				store.dispatch(
					thunks.deleteEntertainmentInRestaurantThunk({
						typeMeal: 'lunch',
						dayIndex: 999,
						idRestaurant: 'rest-something',
						idEntertainment: 'ent-x'
					})
				)
			}).toThrow('Invalid day index.')
		})
	})

	// ─────────────────────────────────────────────────────────
	// 8) updateDinnerRestaurantThunk
	// ─────────────────────────────────────────────────────────

	describe('updateDinnerRestaurantThunk', () => {
		it('should update a key on a dinner restaurant', () => {
			const scheduleWithDinner = [
				{
					...mockSchedule[0],
					dinner: {
						intro: '',
						included: true,
						restaurants: [
							{ ...mockRestaurant, _id: 'rest-dinnerKey', price: 123 }
						]
					}
				}
			]
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: scheduleWithDinner
				}
			})

			store.dispatch(
				thunks.updateDinnerRestaurantThunk({
					value: 999,
					dayIndex: 0,
					id: 'rest-dinnerKey',
					key: 'price'
				})
			)

			const final = store.getState().currentProject.project.schedule
			expect(final[0].dinner.restaurants[0].price).toBe(999)
		})
	})

	// ─────────────────────────────────────────────────────────
	// 9) updateTransferRestaurantThunk
	// ─────────────────────────────────────────────────────────
	describe('updateTransferRestaurantThunk', () => {
		it('should update the cost of a transfer if typeUpdate=priceTransfer', () => {
			// day 0 => lunch => [ { ...restaurant, transfer:[ { _id:'trans-1' } ] } ]
			const scheduleWithLunch = [
				{
					...mockSchedule[0],
					lunch: {
						intro: '',
						included: true,
						restaurants: [
							{
								...mockRestaurant,
								_id: 'rest-transfer1',
								transfer: [
									{ _id: 'trans-1', selectedService: 'dispo_4h', dispo_4h: 50 }
								]
							}
						]
					}
				}
			]

			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: scheduleWithLunch
				}
			})

			// Update from 50 => 200
			store.dispatch(
				thunks.updateTransferRestaurantThunk({
					value: 200,
					dayIndex: 0,
					typeEvent: 'lunch',
					idRestaurant: 'rest-transfer1',
					typeUpdate: 'priceTransfer',
					idTransfer: 'trans-1',
					serviceKey: 'dispo_4h'
				})
			)

			const final = store.getState().currentProject.project.schedule
			const newCost = final[0].lunch.restaurants[0].transfer?.[0].dispo_4h
			expect(newCost).toBe(200)
		})

		it('should replicate the transfer if typeUpdate=transfer', () => {
			// replicate the same transfer multiple times
			const scheduleWithDinner = [
				{
					...mockSchedule[0],
					dinner: {
						intro: '',
						included: true,
						restaurants: [
							{
								...mockRestaurant,
								_id: 'rest-transferX',
								transfer: [
									{ _id: 'tX', selectedService: 'dispo_4h', dispo_4h: 100 }
								]
							}
						]
					}
				}
			]
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: scheduleWithDinner
				}
			})

			store.dispatch(
				thunks.updateTransferRestaurantThunk({
					value: 3,
					dayIndex: 0,
					typeEvent: 'dinner',
					idRestaurant: 'rest-transferX',
					typeUpdate: 'transfer',
					idTransfer: 'tX',
					serviceKey: 'dispo_4h'
				})
			)

			const final = store.getState().currentProject.project.schedule
			const finalTransfers = final[0].dinner.restaurants[0].transfer
			expect(finalTransfers?.length).toBe(3)
			expect(finalTransfers?.[0]._id).toBe('tX')
			expect(finalTransfers?.[1]._id).toBe('tX')
			expect(finalTransfers?.[2]._id).toBe('tX')
		})
	})

	// ─────────────────────────────────────────────────────────
	// 10) updateRestaurantVenueThunk
	// ─────────────────────────────────────────────────────────
	describe('updateRestaurantVenueThunk', () => {
		it('should update a single field in the restaurant.venue_price object', () => {
			// day 0 => dinner => [ { _id:'rest-ven123', venue_price: { rental=1000 } } ]
			const scheduleWithDinner = [
				{
					...mockSchedule[0],
					dinner: {
						intro: '',
						included: true,
						restaurants: [
							{
								...mockRestaurant,
								_id: 'rest-ven123',
								venue_price: {
									rental: 1000
									// Add any fields as needed
								}
							}
						]
					}
				}
			]
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: scheduleWithDinner
				}
			})

			store.dispatch(
				thunks.updateRestaurantVenueThunk({
					value: 777,
					dayIndex: 0,
					typeMeal: 'dinner',
					restaurantId: 'rest-ven123',
					keyVenue: 'staff_units'
				})
			)

			const final = store.getState().currentProject.project.schedule
			const updatedVenue = final[0].dinner.restaurants[0].venue_price
			expect(updatedVenue?.rental).toBe(1000) // unchanged
			expect(updatedVenue?.staff_units).toBe(777) // newly set
		})

		it('should throw if the restaurant is not found', () => {
			expect(() => {
				store.dispatch(
					thunks.updateRestaurantVenueThunk({
						value: 500,
						dayIndex: 0,
						typeMeal: 'lunch',
						restaurantId: 'not-found',
						keyVenue: 'rental'
					})
				)
			}).toThrow('Restaurant not found.')
		})
	})
})
