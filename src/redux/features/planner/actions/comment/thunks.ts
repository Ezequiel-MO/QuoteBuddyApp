import { AppThunk } from 'src/redux/store'
import {
	addPlanningCommentRequest,
	addPlanningCommentSuccess,
	addPlanningCommentFailure
} from './commentActions'

// Thunk action to add a planning comment
export const addPlanningComment =
	(optionId: string, commentData: any): AppThunk =>
	async (dispatch) => {
		try {
			dispatch(addPlanningCommentRequest())

			// Here you would typically make an API call to save the comment
			// For example: const response = await api.post(`/planning-options/${optionId}/comments`, commentData)

			// Simulate API response for now
			const newComment = {
				id: Date.now(),
				optionId,
				createdAt: new Date().toISOString(),
				...commentData
			}

			// Update Redux store with the new comment
			dispatch(addPlanningCommentSuccess(newComment))

			// Note: Here you might need to update plannerSlice state with the new comment
			// This would require updating the planning option that this comment belongs to

			return newComment
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : 'Failed to add comment'
			dispatch(addPlanningCommentFailure(errorMessage))
			throw error
		}
	}
