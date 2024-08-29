// src/redux/features/currentProject/CurrentProjectSelectors.ts
import { createSelector } from 'reselect'
import { IProject } from '@interfaces/project' // Update with the correct path to your project interface
import { RootState } from 'src/redux/store'

// Input selector to get the current project state slice
const selectProjectState = (state: RootState) => state.currentProject

// Memoized selector for current project
export const selectCurrentProject = createSelector(
	[selectProjectState],
	(projectState): IProject => projectState.project
)

// Memoized selector for errors
export const selectErrors = createSelector(
	[selectProjectState],
	(projectState) => projectState.errors
)
