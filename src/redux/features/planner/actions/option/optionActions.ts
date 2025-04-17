import { useAppDispatch } from '@hooks/redux/redux'
import { DELETE_PLANNING_OPTION } from '../../plannerSlice'

export const usePlanningOptionActions = () => {
	const dispatch = useAppDispatch()

	const deletePlanningOption = (planningItemId: string, optionId: string) => {
		dispatch(DELETE_PLANNING_OPTION({ planningItemId, optionId }))
	}

	return { deletePlanningOption }
}
