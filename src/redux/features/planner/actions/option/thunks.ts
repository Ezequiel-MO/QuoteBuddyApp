import { AppThunk } from 'src/redux/store'
import {
	addPlanningOptionRequest,
	addPlanningOptionSuccess,
	addPlanningOptionFailure
} from './optionActions'

// Thunk action to add a planning option
export const addPlanningOption =
	(planningItemId: string, optionData: any): AppThunk =>
	async (dispatch) => {
		try {
			dispatch(addPlanningOptionRequest())

			// Here you would typically make an API call to save the option
			// For example: const response = await api.post(`/planning-items/${planningItemId}/options`, optionData)

			// Simulate API response for now
			const newOption = {
				id: Date.now(),
				planningItemId,
				...optionData
			}

			// Update Redux store with the new option
			dispatch(addPlanningOptionSuccess(newOption))

			// Note: Here you might need to update plannerSlice state with the new option
			// This would require updating the planning item that this option belongs to

			return newOption
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : 'Failed to add planning option'
			dispatch(addPlanningOptionFailure(errorMessage))
			throw error
		}
	}
