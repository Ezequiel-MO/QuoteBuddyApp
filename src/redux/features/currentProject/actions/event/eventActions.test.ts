import { IEvent } from '@interfaces/event'
import { starterEvent } from 'src/constants/starterObjects'
import { currentProjectSlice } from '../../CurrentProjectSlice'
import store from 'src/redux/store'
import * as thunks from './thunks'

const mockEvent: IEvent = { ...starterEvent }

describe('eventActions thunks', () => {
	const { actions } = currentProjectSlice

	beforeEach(() => {
		vi.spyOn(console, 'log').mockImplementation(() => {})
		vi.spyOn(console, 'error').mockImplementation(() => {})
		vi.spyOn(console, 'warn').mockImplementation(() => {})

		store.dispatch({ type: actions.CLEAR_PROJECT.type })
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	describe('addEventToScheduleThunk', () => {
		it('should add an event to the schedule if timeOfEvent is valid', () => {
			store.dispatch(
				thunks.addEventToScheduleThunk({
					dayOfEvent: 0,
					timeOfEvent: 'morningEvents',
					event: mockEvent
				})
			)
			const { project } = store.getState().currentProject
			expect(project.schedule[0].morningEvents.events).toContainEqual(mockEvent)
			expect(console.error).not.toHaveBeenCalled()
		})
		it('should log an error if timeOfEvent is invalid', () => {
			store.dispatch(
				thunks.addEventToScheduleThunk({
					dayOfEvent: 0,
					timeOfEvent: 'unknownTimeOfEvent' as any,
					event: mockEvent
				})
			)
			expect(console.error).toHaveBeenCalledWith(
				'Invalid timeOfEvent: unknownTimeOfEvent'
			)
		})
	})

	describe('updateMorningActivityThunk', () => {
		it('should update the morning event fields if the dayIndex and event ID is valid', () => {
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: [
						{
							morningEvents: {
								intro: '',
								events: [mockEvent]
							},
							afternoonEvents: { intro: '', events: [] }
						}
					]
				}
			})

			store.dispatch(
				thunks.updateMorningActivityThunk({
					dayIndex: 0,
					id: 'event-1',
					key: 'price',
					value: 200
				})
			)

			const state = store.getState().currentProject
			const updatedEvents = state.project.schedule[0].morningEvents.events
			const updated = updatedEvents.find((e) => e._id === 'event-1')
			expect(updated?.price).toBe(200)
		})
	})

	describe('updateAfternoonActivityThunk', () => {
		it('should update the afternoon event fields if the dayIndex and event ID is valid', () => {
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: [
						{
							morningEvents: { intro: '', events: [] },
							afternoonEvents: {
								intro: '',
								events: [mockEvent]
							}
						}
					]
				}
			})

			store.dispatch(
				thunks.updateAfternoonActivityThunk({
					dayIndex: 0,
					id: 'event-1',
					key: 'pricePerPerson',
					value: 50
				})
			)

			const state = store.getState().currentProject
			const updatedEvents = state.project.schedule[0].afternoonEvents.events
			const updated = updatedEvents.find((e) => e._id === 'event-1')
			expect(updated?.pricePerPerson).toBe(50)
		})
	})

	describe('editModalEventThunk', () => {
		it('should edit an existing event for the specified dayIndex & typeOfEvent', () => {
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: [
						{
							morningEvents: { intro: '', events: [mockEvent] },
							afternoonEvents: { intro: '', events: [] }
						}
					]
				}
			})

			store.dispatch(
				thunks.editModalEventThunk({
					id: 'event-1',
					dayIndex: 0,
					typeOfEvent: 'morningEvents',
					data: {
						price: 500,
						pricePerPerson: false
					},
					imagesEvent: ['newImage.jpg'],
					textContent: 'Updated text content'
				})
			)

			const { project } = store.getState().currentProject
			const updated = project.schedule[0].morningEvents.events.find(
				(evt) => evt._id === 'event-1'
			)
			expect(updated?.price).toBe(500)
			expect(updated?.pricePerPerson).toBe(false)
			expect(updated?.textContent).toBe('Updated text content')
			expect(updated?.imageContentUrl).toEqual(['newImage.jpg'])
			expect(console.error).not.toHaveBeenCalled()
		})

		it('should log an error if typeOfEvent is invalid', () => {
			store.dispatch(
				thunks.editModalEventThunk({
					id: 'event-1',
					dayIndex: 0,
					typeOfEvent: 'invalidEventType' as any,
					data: {
						price: 100,
						pricePerPerson: true
					},
					imagesEvent: [],
					textContent: ''
				})
			)
			expect(console.error).toHaveBeenCalledWith(
				'Invalid typeOfEvent: invalidEventType'
			)
		})

		it('should log an error if dayIndex is out of range', () => {
			store.dispatch(
				thunks.editModalEventThunk({
					id: 'event-1',
					dayIndex: 999,
					typeOfEvent: 'morningEvents',
					data: {
						price: 100,
						pricePerPerson: true
					},
					imagesEvent: [],
					textContent: ''
				})
			)
			expect(console.error).toHaveBeenCalledWith('Invalid dayIndex: 999')
		})

		it('should log an error if event not found in that group', () => {
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: [
						{
							morningEvents: { intro: '', events: [] },
							afternoonEvents: { intro: '', events: [] }
						}
					]
				}
			})

			store.dispatch(
				thunks.editModalEventThunk({
					id: 'non-existent-event',
					dayIndex: 0,
					typeOfEvent: 'morningEvents',
					data: {
						price: 100,
						pricePerPerson: true
					},
					imagesEvent: [],
					textContent: ''
				})
			)
			expect(console.error).toHaveBeenCalledWith(
				'Event with id non-existent-event not found in event group.'
			)
		})
	})

	describe('removeEventFromScheduleThunk', () => {
		it('should remove the specified event from the schedule if timeOfEvent is valid', () => {
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: [
						{
							morningEvents: { intro: '', events: [mockEvent] },
							afternoonEvents: { intro: '', events: [] }
						}
					]
				}
			})

			store.dispatch(
				thunks.removeEventFromScheduleThunk({
					dayIndex: 0,
					timeOfEvent: 'morningEvents',
					eventId: 'event-1'
				})
			)

			const state = store.getState().currentProject
			const finalEvents = state.project.schedule[0].morningEvents.events
			expect(finalEvents.length).toBe(0)
			expect(console.error).not.toHaveBeenCalled()
		})

		it('should log an error if timeOfEvent is invalid', () => {
			store.dispatch(
				thunks.removeEventFromScheduleThunk({
					dayIndex: 0,
					timeOfEvent: 'invalidTime' as any,
					eventId: 'event-1'
				})
			)
			expect(console.error).toHaveBeenCalledWith(
				'Invalid timeOfEvent: invalidTime'
			)
		})
	})
})
