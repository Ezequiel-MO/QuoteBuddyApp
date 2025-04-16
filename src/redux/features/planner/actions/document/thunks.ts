import { AppThunk } from 'src/redux/store'
import {
	addPlanningDocumentRequest,
	addPlanningDocumentSuccess,
	addPlanningDocumentFailure
} from './documentActions'

// Thunk action to add a planning document
export const addPlanningDocument =
	(planningItemId: string, documentData: any): AppThunk =>
	async (dispatch) => {
		try {
			dispatch(addPlanningDocumentRequest())

			// Here you would typically make an API call to upload the document
			// For example: const response = await api.post(`/planning-items/${planningItemId}/documents`, formData)

			// Simulate API response for now
			const newDocument = {
				id: Date.now(),
				planningItemId,
				uploadedAt: new Date().toISOString(),
				...documentData
			}

			// Update Redux store with the new document
			dispatch(addPlanningDocumentSuccess(newDocument))

			// Note: Here you might need to update plannerSlice state with the new document
			// This would require updating the planning item that this document belongs to

			return newDocument
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : 'Failed to upload document'
			dispatch(addPlanningDocumentFailure(errorMessage))
			throw error
		}
	}
