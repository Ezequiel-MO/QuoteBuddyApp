// Action types
export const ADD_PLANNING_OPTION_REQUEST = 'ADD_PLANNING_OPTION_REQUEST'
export const ADD_PLANNING_OPTION_SUCCESS = 'ADD_PLANNING_OPTION_SUCCESS'
export const ADD_PLANNING_OPTION_FAILURE = 'ADD_PLANNING_OPTION_FAILURE'

// Action interfaces
interface AddPlanningOptionRequestAction {
	type: typeof ADD_PLANNING_OPTION_REQUEST
}

interface AddPlanningOptionSuccessAction {
	type: typeof ADD_PLANNING_OPTION_SUCCESS
	payload: any // Replace 'any' with proper planning option type
}

interface AddPlanningOptionFailureAction {
	type: typeof ADD_PLANNING_OPTION_FAILURE
	payload: string
}

// Union type for all planning option actions
export type PlanningOptionActionTypes =
	| AddPlanningOptionRequestAction
	| AddPlanningOptionSuccessAction
	| AddPlanningOptionFailureAction

// Action creators
export const addPlanningOptionRequest = (): AddPlanningOptionRequestAction => ({
	type: ADD_PLANNING_OPTION_REQUEST
})

export const addPlanningOptionSuccess = (
	option: any
): AddPlanningOptionSuccessAction => ({
	type: ADD_PLANNING_OPTION_SUCCESS,
	payload: option
})

export const addPlanningOptionFailure = (
	error: string
): AddPlanningOptionFailureAction => ({
	type: ADD_PLANNING_OPTION_FAILURE,
	payload: error
})
