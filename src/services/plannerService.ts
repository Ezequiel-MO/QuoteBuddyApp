import baseAPI from '../axios/axiosConfig'
import { IPlanningItem } from '@interfaces/planner/planningItem'

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
	console.log(
		'GET planning items response:',
		JSON.stringify(response.data.data, null, 2)
	)
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
