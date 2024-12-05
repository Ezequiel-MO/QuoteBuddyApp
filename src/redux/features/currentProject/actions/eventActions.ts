import { AppThunk } from 'src/redux/store'
import { UPDATE_PROJECT_SCHEDULE } from '../CurrentProjectSlice'
import {
	IAddIntro,
	AddEventAction,
	RemoveEventActionPayload,
	EditModalEventPayload
} from '../types'
import { useAppDispatch } from 'src/hooks/redux/redux'
import { IDay, IProject } from '@interfaces/project'
import { IEvent } from '@interfaces/event'
import { eventMappings } from '../helpers/eventMappings'
import { current } from '@reduxjs/toolkit'

export const useEventActions = () => {
	const dispatch = useAppDispatch()

	const addEventToSchedule = (payload: AddEventAction['payload']) => {
		dispatch(addEventToScheduleThunk(payload))
	}

	const removeEventFromSchedule = (payload: RemoveEventActionPayload) => {
		dispatch(removeEventFromScheduleThunk(payload))
	}

	const editModalEvent = (eventModal: EditModalEventPayload) => {
		dispatch(editModalEventThunk(eventModal))
	}

	const addIntroEvent = (introEvent: IAddIntro) => {
		dispatch(addIntroEventThunk(introEvent))
	}

	return {
		addEventToSchedule,
		removeEventFromSchedule,
		editModalEvent,
		addIntroEvent
	}
}

const addEventToScheduleThunk = (
	payload: AddEventAction['payload']
): AppThunk => {
	return (dispatch, getState) => {
		const state = getState()
		const currentProject: IProject = state.currentProject.project

		const { dayOfEvent, timeOfEvent, event } = payload

		const mapping = eventMappings[timeOfEvent]

		if (!mapping) {
			console.error(`Invalid timeOfEvent: ${timeOfEvent}`)
			return
		}

		const updatedSchedule = currentProject.schedule?.map((day, index) => {
			if (index === dayOfEvent) {
				return {
					...day,
					[mapping.key]: {
						...day[mapping.key],
						[mapping.subKey]: [...day[mapping.key][mapping.subKey], event]
					}
				}
			}
			return day
		})

		dispatch(
			UPDATE_PROJECT_SCHEDULE(updatedSchedule, 'Add Any Event To Schedule')
		)
	}
}

const addIntroEventThunk = (introEvent: IAddIntro): AppThunk => {
	return (dispatch, getState) => {
		const { dayIndex, typeEvent, textContent } = introEvent
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		const mapping = eventMappings[typeEvent]

		if (!mapping) {
			console.error(`Invalid typeEvent: ${typeEvent}`)
			return
		}

		if (dayIndex < 0 || dayIndex >= currentSchedule.length) {
			console.error(`Invalid dayIndex: ${dayIndex}`)
			return
		}

		const dayToUpdate: IDay = currentSchedule[dayIndex]

		const eventGroup: IEvent = dayToUpdate[mapping.key]

		if (
			!eventGroup ||
			typeof eventGroup !== 'object' ||
			!('intro' in eventGroup)
		) {
			console.error(
				`Invalid structure for ${mapping.key}. Expected an object with 'intro' key.`,
				eventGroup
			)
			return
		}

		const updatedEventGroup = {
			...eventGroup,
			intro: textContent
		}

		const updatedDay = {
			...dayToUpdate,
			[mapping.key]: updatedEventGroup
		}

		const updatedSchedule: IDay[] = currentSchedule.map((day, index) => {
			if (index === dayIndex) {
				return updatedDay
			}
			return day
		})

		dispatch(UPDATE_PROJECT_SCHEDULE(updatedSchedule, 'Add Intro Event'))
	}
}

const editModalEventThunk =
	(eventModal: EditModalEventPayload): AppThunk =>
	(dispatch, getState) => {
		const { id, dayIndex, typeOfEvent, data, imagesEvent, textContent } =
			eventModal
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		const mapping = eventMappings[typeOfEvent]

		if (!mapping) {
			console.error(`Invalid typeOfEvent: ${typeOfEvent}`)
			return
		}

		if (dayIndex < 0 || dayIndex >= currentSchedule.length) {
			console.error(`Invalid dayIndex: ${dayIndex}`)
			return
		}

		const dayToUpdate: IDay = currentSchedule[dayIndex]
		const eventGroup = dayToUpdate[mapping.key]

		if (!eventGroup || !Array.isArray(eventGroup[mapping.subKey])) {
			console.error(
				`Invalid structure for ${mapping.key}. Expected an object with '${mapping.subKey}' key.`,
				eventGroup
			)
			return
		}

		const eventIndex = eventGroup[mapping.subKey].findIndex(
			(event: any) => event._id === id
		)

		if (eventIndex === -1) {
			console.error(`Event with id ${id} not found in event group.`)
			return
		}

		const updatedEvent = {
			...eventGroup[mapping.subKey][eventIndex],
			price: data.price,
			pricePerPerson: data.pricePerPerson,
			textContent,
			imageContentUrl: imagesEvent || []
		}

		interface IUpdatedEventGroup {
			[mappingKey: string]: {
				[mappingSubKey: string]: IEvent[]
			}
		}

		const updatedEventGroup: IUpdatedEventGroup = {
			...eventGroup,
			[mapping.subKey]: eventGroup[mapping.subKey].map(
				(evt: IEvent, idx: number) => {
					if (idx === eventIndex) {
						return updatedEvent
					}
					return evt
				}
			)
		}

		const updatedDay = {
			...dayToUpdate,
			[mapping.key]: updatedEventGroup
		}

		const updatedSchedule = currentSchedule.map((day, index) => {
			if (index === dayIndex) {
				return updatedDay
			}
			return day
		})

		dispatch(UPDATE_PROJECT_SCHEDULE(updatedSchedule, 'Edit Modal Event'))
	}

const removeEventFromScheduleThunk = (
	payload: RemoveEventActionPayload
): AppThunk => {
	return (dispatch, getState) => {
		const { dayIndex, timeOfEvent, eventId } = payload
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		const mapping = eventMappings[timeOfEvent]

		if (!mapping) {
			console.error(`Invalid timeOfEvent: ${timeOfEvent}`)
			return
		}

		const updatedSchedule = currentSchedule?.map((day, index) => {
			if (index === dayIndex) {
				return {
					...day,
					[mapping.key]: {
						...day[mapping.key],
						[mapping.subKey]: day[mapping.key][mapping.subKey].filter(
							(item: any) => item._id !== eventId
						)
					}
				}
			}
			return day
		})
		dispatch(
			UPDATE_PROJECT_SCHEDULE(updatedSchedule, 'Remove Event From Schedule')
		)
	}
}
