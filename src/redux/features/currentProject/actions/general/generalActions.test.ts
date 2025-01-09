import store from 'src/redux/store'
import { currentProjectSlice } from '../../CurrentProjectSlice'
import { IAddIntro } from '../../types'
import * as thunks from './thunks'

describe('generalActions thunks', () => {
	const { actions } = currentProjectSlice

	beforeEach(() => {
		vi.spyOn(console, 'error').mockImplementation(() => {})
		vi.spyOn(console, 'warn').mockImplementation(() => {})

		store.dispatch({ type: actions.CLEAR_PROJECT.type })
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	describe('addIntroThunk', () => {
		it('should add intro if dayIndex and typeEvent are valid', () => {
			const payload: IAddIntro = {
				dayIndex: 0,
				typeEvent: 'morningMeetings',
				textContent: 'Welcome to this morning meeting'
			}
			store.dispatch(thunks.addIntroThunk(payload))
			const { project } = store.getState().currentProject
			expect(project.schedule[0].morningMeetings.intro).toBe(
				'Welcome to this morning meeting'
			)
			expect(console.error).not.toHaveBeenCalled()
		})

		it('should log error if typeEvent is invalid', () => {
			const payload: IAddIntro = {
				dayIndex: 0,
				typeEvent: 'invalidTypeEvent' as any,
				textContent: 'Welcome to this morning meeting'
			}
			store.dispatch(thunks.addIntroThunk(payload))
			expect(console.error).toHaveBeenCalled()
		})

		it('should log error if dayIndex is out of range', () => {
			const payload: IAddIntro = {
				dayIndex: -1,
				typeEvent: 'morningMeetings',
				textContent: 'Welcome to this morning meeting'
			}
			store.dispatch(thunks.addIntroThunk(payload))
			expect(console.error).toHaveBeenCalledWith('Invalid dayIndex: -1')
		})

		it('should create an "intro" field if missing, then set text', () => {
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: [
						{
							morningMeetings: {
								meetings: []
							}
						}
					]
				}
			})
			const payload: IAddIntro = {
				dayIndex: 0,
				typeEvent: 'morningMeetings',
				textContent: 'Intro created on the fly'
			}
			store.dispatch(thunks.addIntroThunk(payload))

			const { project } = store.getState().currentProject
			expect(project.schedule[0].morningMeetings.intro).toBe(
				'Intro created on the fly'
			)
			expect(console.error).not.toHaveBeenCalled()
		})

		it('should log error if the structure is not an object with `intro` key', () => {
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: [
						{
							morningMeetings: 'invalid-structure'
						}
					]
				}
			})

			const payload: IAddIntro = {
				dayIndex: 0,
				typeEvent: 'morningMeetings',
				textContent: 'Should fail'
			}
			store.dispatch(thunks.addIntroThunk(payload))

			expect(console.error).toHaveBeenCalledWith(
				`Invalid structure for morningMeetings. Expected an object with 'intro' key.`,
				'invalid-structure'
			)
		})
	})
})
