import {
	selectCurrentPlanner,
	selectPlanningItems
} from '@redux/features/planner/PlannerSelectors'
import { useAppSelector } from './redux'
import usePlanningItemActions from '@redux/features/planner/actions/item/itemActions'
import { usePlanningOptionActions } from '@redux/features/planner/actions/option/optionActions'

export const useCurrentPlanner = () => {
	const currentPlanner = useAppSelector(selectCurrentPlanner)
	const planningItems = useAppSelector(selectPlanningItems)
	const planningItemsActions = usePlanningItemActions()
	const planningOptionActions = usePlanningOptionActions()

	return {
		currentPlanner,
		planningItems,
		...planningItemsActions,
		...planningOptionActions
	}
}
