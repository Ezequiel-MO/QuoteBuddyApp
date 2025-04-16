import { RootState } from '@redux/store'
import { createSelector } from 'reselect'

const selectPlannerState = (state: RootState) => state.planner

export const selectCurrentPlanner = createSelector(
	[selectPlannerState],
	(plannerState) => plannerState
)

export const selectPlanningItems = createSelector(
	[selectPlannerState],
	(plannerState) => plannerState.planningItems
)
