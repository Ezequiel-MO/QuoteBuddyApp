import {
	selectCurrentPlanner,
	selectPlanningItems
} from '@redux/features/planner/PlannerSelectors'
import { useAppSelector } from './redux'
import usePlanningItemActions from '@redux/features/planner/actions/item/itemActions'
import { useEffect } from 'react'

export const useCurrentPlanner = () => {
	const currentPlanner = useAppSelector(selectCurrentPlanner)
	const planningItems = useAppSelector(selectPlanningItems)
	const planningItemsActions = usePlanningItemActions()

	useEffect(() => {
		console.log(
			'useCurrentPlanner: planningItems from Redux:',
			planningItems.length
		)
	}, [planningItems])

	return {
		currentPlanner,
		planningItems,
		...planningItemsActions
	}
}
