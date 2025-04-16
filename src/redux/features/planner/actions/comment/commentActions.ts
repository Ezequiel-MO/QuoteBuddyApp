// Action types
export const ADD_PLANNING_COMMENT_REQUEST = 'ADD_PLANNING_COMMENT_REQUEST'
export const ADD_PLANNING_COMMENT_SUCCESS = 'ADD_PLANNING_COMMENT_SUCCESS'
export const ADD_PLANNING_COMMENT_FAILURE = 'ADD_PLANNING_COMMENT_FAILURE'

// Action interfaces
interface AddPlanningCommentRequestAction {
	type: typeof ADD_PLANNING_COMMENT_REQUEST
}

interface AddPlanningCommentSuccessAction {
	type: typeof ADD_PLANNING_COMMENT_SUCCESS
	payload: any // Replace 'any' with proper planning comment type
}

interface AddPlanningCommentFailureAction {
	type: typeof ADD_PLANNING_COMMENT_FAILURE
	payload: string
}

// Union type for all planning comment actions
export type PlanningCommentActionTypes =
	| AddPlanningCommentRequestAction
	| AddPlanningCommentSuccessAction
	| AddPlanningCommentFailureAction

// Action creators
export const addPlanningCommentRequest =
	(): AddPlanningCommentRequestAction => ({
		type: ADD_PLANNING_COMMENT_REQUEST
	})

export const addPlanningCommentSuccess = (
	comment: any
): AddPlanningCommentSuccessAction => ({
	type: ADD_PLANNING_COMMENT_SUCCESS,
	payload: comment
})

export const addPlanningCommentFailure = (
	error: string
): AddPlanningCommentFailureAction => ({
	type: ADD_PLANNING_COMMENT_FAILURE,
	payload: error
})
