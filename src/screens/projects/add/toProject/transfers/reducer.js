export const transferLinesReducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_VARIABLE':
			return [...state, action.variable]
		case 'REMOVE_VARIABLE':
			return state.filter((variable) => variable !== action.variable)
		default:
			return state
	}
}
