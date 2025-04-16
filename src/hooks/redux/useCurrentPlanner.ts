import {
	selectCurrentPlanner,
	selectPlanningItems
} from '@redux/features/planner/PlannerSelectors'
import { useAppSelector } from './redux'
import usePlanningItemActions from '@redux/features/planner/actions/item/itemActions'

export const useCurrentPlanner = () => {
	const currentPlanner = useAppSelector(selectCurrentPlanner)
	const planningItems = useAppSelector(selectPlanningItems)
	const planningItemsActions = usePlanningItemActions()

	return {
		currentPlanner,
		planningItems,
		...planningItemsActions
	}
}
