import { useAppDispatch } from '@hooks/redux/redux'
import {
	ADD_PLANNING_COMMENT,
	DELETE_PLANNING_COMMENT
} from '../../plannerSlice'
import { IPlanningComment } from '@interfaces/planner'

export const usePlanningCommentActions = () => {
	const dispatch = useAppDispatch()

	const addPlanningComment = (
		planningItemId: string,
		planningOptionId: string | undefined = '',
		comment: IPlanningComment
	) => {
		dispatch(
			ADD_PLANNING_COMMENT({ planningItemId, planningOptionId, comment })
		)
	}

	const deletePlanningComment = (
		planningItemId: string,
		planningOptionId: string | undefined = '',
		planningCommentId: string
	) => {
		dispatch(
			DELETE_PLANNING_COMMENT({
				planningItemId,
				planningOptionId,
				planningCommentId
			})
		)
	}

	return { addPlanningComment, deletePlanningComment }
}
