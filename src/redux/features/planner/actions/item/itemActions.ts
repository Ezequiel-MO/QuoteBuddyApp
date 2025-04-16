import { useAppDispatch } from '@hooks/redux/redux'
import { IPlanningItem } from '@interfaces/planner/planningItem'
import {
	ADD_PLANNING_ITEM,
	DELETE_PLANNING_ITEM,
	SET_PLANNING_ITEMS
} from '../../plannerSlice'

export const usePlanningItemActions = () => {
	const dispatch = useAppDispatch()

	const setPlanningItems = (items: IPlanningItem[]) => {
		dispatch(SET_PLANNING_ITEMS(items))
	}

	const addPlanningItem = (item: IPlanningItem) => {
		dispatch(ADD_PLANNING_ITEM(item))
	}

	const deletePlanningItem = (itemId: string) => {
		dispatch(DELETE_PLANNING_ITEM(itemId))
	}

	return {
		setPlanningItems,
		addPlanningItem,
		deletePlanningItem
	}
}

export default usePlanningItemActions
