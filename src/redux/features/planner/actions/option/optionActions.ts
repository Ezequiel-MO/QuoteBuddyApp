import { useAppDispatch } from '@hooks/redux/redux'
import { IPlanningOption } from '@interfaces/planner'
import { ADD_PLANNING_OPTION, DELETE_PLANNING_OPTION } from '../../plannerSlice'

export const usePlanningOptionActions = () => {
	const dispatch = useAppDispatch()

	const addPlanningOption = (
		planningItemId: string,
		option: IPlanningOption
	) => {
		dispatch(ADD_PLANNING_OPTION({ planningItemId, option }))
	}

	const deletePlanningOption = (planningItemId: string, optionId: string) => {
		dispatch(DELETE_PLANNING_OPTION({ planningItemId, optionId }))
	}

	return { addPlanningOption, deletePlanningOption }
}
