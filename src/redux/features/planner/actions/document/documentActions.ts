// Action types
export const ADD_PLANNING_DOCUMENT_REQUEST = 'ADD_PLANNING_DOCUMENT_REQUEST'
export const ADD_PLANNING_DOCUMENT_SUCCESS = 'ADD_PLANNING_DOCUMENT_SUCCESS'
export const ADD_PLANNING_DOCUMENT_FAILURE = 'ADD_PLANNING_DOCUMENT_FAILURE'

// Action interfaces
interface AddPlanningDocumentRequestAction {
	type: typeof ADD_PLANNING_DOCUMENT_REQUEST
}

interface AddPlanningDocumentSuccessAction {
	type: typeof ADD_PLANNING_DOCUMENT_SUCCESS
	payload: any // Replace 'any' with proper planning document type
}

interface AddPlanningDocumentFailureAction {
	type: typeof ADD_PLANNING_DOCUMENT_FAILURE
	payload: string
}

// Union type for all planning document actions
export type PlanningDocumentActionTypes =
	| AddPlanningDocumentRequestAction
	| AddPlanningDocumentSuccessAction
	| AddPlanningDocumentFailureAction

// Action creators
export const addPlanningDocumentRequest =
	(): AddPlanningDocumentRequestAction => ({
		type: ADD_PLANNING_DOCUMENT_REQUEST
	})

export const addPlanningDocumentSuccess = (
	document: any
): AddPlanningDocumentSuccessAction => ({
	type: ADD_PLANNING_DOCUMENT_SUCCESS,
	payload: document
})

export const addPlanningDocumentFailure = (
	error: string
): AddPlanningDocumentFailureAction => ({
	type: ADD_PLANNING_DOCUMENT_FAILURE,
	payload: error
})
