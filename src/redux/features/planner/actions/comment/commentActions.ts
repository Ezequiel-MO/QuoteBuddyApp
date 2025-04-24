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
		planningOptionId: string,
		comment: IPlanningComment
	) => {
		if (!planningOptionId) {
			console.error('Cannot add comment without planningOptionId')
			return
		}

		console.log('Dispatching ADD_PLANNING_COMMENT with:', {
			planningItemId,
			planningOptionId,
			comment
		})

		dispatch(
			ADD_PLANNING_COMMENT({ planningItemId, planningOptionId, comment })
		)
	}

	const deletePlanningComment = (
		planningItemId: string,
		planningOptionId: string,
		planningCommentId: string
	) => {
		if (!planningOptionId) {
			console.error('Cannot delete comment without planningOptionId')
			return
		}
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
