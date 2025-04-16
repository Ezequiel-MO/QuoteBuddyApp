import { IPlanningItem } from '@interfaces/planner/planningItem'
import { AppThunk } from '@redux/store'
import { ADD_PLANNING_ITEM } from '../../plannerSlice'

export const addPlanningItemThunk =
	(item: IPlanningItem): AppThunk =>
	(dispatch, getState) => {
		const state = getState()
		const newPlanningItems = [item, ...state.planner.planningItems]
		dispatch(ADD_PLANNING_ITEM(newPlanningItems))
	}
