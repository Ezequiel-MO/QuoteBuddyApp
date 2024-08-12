import * as typescript from './contextinterfaces'

const quotationReducer = (
	state: typescript.QuotationState,
	action: typescript.QuotationAction
): typescript.QuotationState => {
	switch (action.type) {
		case 'SET_QUOTATION':
			return { ...state, currentQuotation: action.payload }
		case 'UPDATE_QUOTATION_FIELD':
			if (!state.currentQuotation) return state
			return {
				...state,
				currentQuotation: {
					...state.currentQuotation,
					[action.payload.name]: action.payload.value
				}
			}
		case 'TOGGLE_BUDGET_VISUALIZER':
			return { ...state, isBudgetVisualizerOpen: !state.isBudgetVisualizerOpen }
		case 'TOGGLE_DRAWER_SECTION': {
			const { day, index } = action
			const daySections = state.openDrawerSections[day] || {}
			const newDaySections = { ...daySections }

			// If the day itself is being clicked, only toggle the first section
			if (index === -1) {
				newDaySections[0] = !daySections[0]
				newDaySections[1] = !daySections[0]
				newDaySections[2] = !daySections[0]
				newDaySections[3] = !daySections[0]
			} else {
				// Toggle the specific section
				newDaySections[index] = !daySections[index]
			}

			return {
				...state,
				openDrawerSections: {
					...state.openDrawerSections,
					[day]: newDaySections
				}
			}
		}
		default:
			return state
	}
}

export default quotationReducer
