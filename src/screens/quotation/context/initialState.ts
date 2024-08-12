import * as fakeData from '../constants/fakeData'
import * as typescript from './contextinterfaces'

const initializeSections = (
	days: string[]
): { [key: string]: { [key: number]: boolean } } => {
	const sections: { [key: string]: { [key: number]: boolean } } = {}
	days.forEach((day) => {
		sections[day] = {
			0: false,
			1: false,
			2: false,
			3: false
		}
	})
	return sections
}

const initialState: typescript.QuotationState = {
	quotations: [],
	currentQuotation: null,
	update: false,
	isBudgetVisualizerOpen: true,
	openDrawerSections: initializeSections(fakeData.DAYS)
}

export default initialState
