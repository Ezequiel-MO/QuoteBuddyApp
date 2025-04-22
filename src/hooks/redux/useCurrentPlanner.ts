import {
	selectCurrentPlanner,
	selectPlanningItems
} from '@redux/features/planner/PlannerSelectors'
import { useAppSelector } from './redux'
import usePlanningItemActions from '@redux/features/planner/actions/item/itemActions'
import { usePlanningOptionActions } from '@redux/features/planner/actions/option/optionActions'
import { usePlanningCommentActions } from '@redux/features/planner/actions/comment/commentActions'
import usePlanningDocumentActions from '@redux/features/planner/actions/document/documentActions'

export const useCurrentPlanner = () => {
	const currentPlanner = useAppSelector(selectCurrentPlanner)
	const planningItems = useAppSelector(selectPlanningItems)
	const planningItemsActions = usePlanningItemActions()
	const planningOptionActions = usePlanningOptionActions()
	const planningCommentActions = usePlanningCommentActions()
	const planningDocumentActions = usePlanningDocumentActions()

	return {
		currentPlanner,
		planningItems,
		...planningItemsActions,
		...planningOptionActions,
		...planningCommentActions,
		...planningDocumentActions
	}
}
