import { createSelector } from 'reselect'
import { RootState } from '../../../store'
import { IProject } from '@interfaces/project'

// Input selector to get the project slice
const selectProjectState = (state: RootState) => state.project

// Selector to get the current project
export const selectCurrentProject = createSelector(
	[selectProjectState],
	(projectState): IProject => projectState.project
)

// Selector to get validation errors
export const selectErrors = createSelector(
	[selectProjectState],
	(projectState) => projectState.errors
)

// Selector to get the modal open state
export const selectIsModalOpen = createSelector(
	[selectProjectState],
	(projectState) => projectState.modalIsOpen
)
