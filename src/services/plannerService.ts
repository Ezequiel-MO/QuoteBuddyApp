import { IPlanningComment } from '@interfaces/planner'
import baseAPI from '../axios/axiosConfig'
import { IPlanningItem } from '@interfaces/planner/planningItem'
import { IPlanningOption } from '@interfaces/planner/planningOption'

/**
 * Creates a new planning item
 * @param planningItem The planning item data to create
 * @param userId The ID of the user creating the item
 * @returns The created planning item
 */
export async function createPlanningItem(
	planningItem: IPlanningItem,
	userId: string
): Promise<IPlanningItem> {
	const { projectId, _id, ...itemData } = planningItem

	// Ensure description and date are explicitly set in the payload
	const payload = {
		projectId, // Include projectId directly in payload (not just in URL)
		...itemData,
		// Set createdBy to the authenticated user's ID
		createdBy: userId,
		// Explicitly include description as a string (even if empty)
		description: itemData.description || '',
		// For date, send as ISO string - MongoDB will convert it to Date object
		date: itemData.date || new Date().toISOString()
	}

	console.log('Planning item payload being sent to backend:', payload)

	// Send POST request to the API endpoint
	const response = await baseAPI.post(`planner/${projectId}/items`, payload)

	// Log the response for debugging
	console.log(
		'POST planning item response:',
		JSON.stringify(response.data, null, 2)
	)

	return response.data.data
}

/**
 * Gets all planning items for a project
 * @param projectId The project ID
 * @returns Array of planning items
 */
export async function getPlanningItems(
	projectId: string
): Promise<IPlanningItem[]> {
	const response = await baseAPI.get(`planner/${projectId}/items`)

	return response.data.data
}

/**
 * Updates a planning item
 * @param itemId The planning item ID
 * @param itemData The updated planning item data
 * @returns The updated planning item
 */
export async function updatePlanningItem(
	itemId: string,
	itemData: Partial<IPlanningItem>
): Promise<IPlanningItem> {
	const response = await baseAPI.put(`planner/items/${itemId}`, itemData)
	return response.data.data
}

/**
 * Deletes a planning item
 * @param itemId The planning item ID
 * @returns Success message
 */
export async function deletePlanningItem(itemId: string): Promise<any> {
	// With the server-first approach, all IDs in the frontend should be valid MongoDB IDs
	const response = await baseAPI.delete(`planner/items/${itemId}`)
	return response.data
}

/**
 * Creates a new planning option
 * @param planningOption The planning option data to create
 * @param accManagerId The ID of the account manager creating the option
 * @returns The created planning option
 */
export async function createPlanningOption(
	planningOption: Partial<IPlanningOption>,
	accManagerId: string
): Promise<IPlanningOption> {
	const { planningItemId, ...optionData } = planningOption

	// Prepare the payload with the account manager ID
	const payload = {
		...optionData,
		planningItemId,
		createdBy: accManagerId // Set the account manager ID as the creator
	}

	// Handle empty vendorId to avoid type casting errors
	if (payload.vendorId === '') {
		delete payload.vendorId // Remove empty vendorId completely to avoid MongoDB casting errors
	}

	// Send POST request to the API endpoint
	const response = await baseAPI.post(
		`planner/items/${planningItemId}/options`,
		payload
	)

	return response.data.data
}

/**
 * Deletes a planning option
 * @param optionId The ID of the planning option to delete
 * @returns Success message
 */
export async function deletePlanningOption(optionId: string): Promise<any> {
	const response = await baseAPI.delete(`planner/options/${optionId}`)
	return response.data
}

/**
 * Creates a new planning comment
 * @param planningItemId The planning item ID
 * @param comment The comment data to create
 * @returns The created comment with MongoDB-generated ID
 */
export async function createComment(
	planningItemId: string,
	comment: Partial<IPlanningComment>
): Promise<IPlanningComment> {
	const response = await baseAPI.post(
		`planner/items/${planningItemId}/comments`,
		comment
	)
	return response.data.data
}

/**
 * Deletes a planning comment
 * @param commentId The ID of the comment to delete
 * @returns Success message
 */
export async function deleteComment(commentId: string): Promise<any> {
	const response = await baseAPI.delete(`planner/comments/${commentId}`)
	return response.data
}

/**
 * Uploads documents for a planning item
 * @param planningItemId The ID of the planning item
 * @param files Array of files to upload
 * @param planningOptionId Optional ID of a planning option
 * @returns Array of created document objects
 */
export async function createPlanningDocument(
	planningItemId: string,
	files: File[],
	planningOptionId?: string
): Promise<any> {
	// Create FormData object to send files
	const formData = new FormData()

	// Add the planning option ID if provided
	if (planningOptionId) {
		formData.append('planningOptionId', planningOptionId)
	}

	// Add all files to the form data with the field name "documents"
	files.forEach((file) => {
		formData.append('documents', file)
		// Also add file size for reference
		formData.append('fileSizes', file.size.toString())
	})

	// Set special headers for multipart/form-data
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	}

	// Send POST request to the API endpoint
	const response = await baseAPI.post(
		`planner/items/${planningItemId}/documents`,
		formData,
		config
	)

	return response.data.data
}
