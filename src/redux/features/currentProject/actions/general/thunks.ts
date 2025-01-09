import { AppThunk } from 'src/redux/store'
import { IAddIntro } from '../../types'
import { IDay } from '@interfaces/project'
import { eventMappings } from '../../helpers/eventMappings'
import { UPDATE_PROJECT_SCHEDULE } from '../../CurrentProjectSlice'

export const addIntroThunk = (introEvent: IAddIntro): AppThunk => {
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

		let eventGroup = dayToUpdate[mapping.key]

		if (typeof eventGroup !== 'object' || eventGroup === null) {
			console.error(
				`Invalid structure for ${mapping.key}. Expected an object with 'intro' key.`,
				eventGroup
			)
			return
		}

		if (!('intro' in eventGroup)) {
			eventGroup = { ...eventGroup, intro: '' }
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
