import { useAppDispatch } from '@hooks/redux/redux'
import { IPlanningItem } from '@interfaces/planner/planningItem'
import * as thunks from './thunks'

export const usePlanningItemActions = () => {
	const dispatch = useAppDispatch()

	const addPlanningItem = (item: IPlanningItem) => {
		dispatch(thunks.addPlanningItemThunk(item))
	}

	return {
		addPlanningItem
	}
}

export default usePlanningItemActions
