// src/redux/features/currentProject/CurrentProjectSelectors.ts
import { IProject } from '@interfaces/index'
import { createSelector } from 'reselect'
import { RootState } from 'src/redux/store'

// Input selector to get the current project state slice
const selectProjectState = (state: RootState) => state.currentProject

// Memoized selector for current project
export const selectCurrentProject = createSelector(
	[selectProjectState],
	(projectState): IProject => projectState.project
)

export const selectBudget = createSelector(
	[selectProjectState],
	(projectState) => projectState.budget
)

// Memoized selector for errors
export const selectErrors = createSelector(
	[selectProjectState],
	(projectState) => projectState.errors
)

export const selectIsModalOpen = createSelector(
	[selectProjectState],
	(projectState) => projectState.modalIsOpen
)
