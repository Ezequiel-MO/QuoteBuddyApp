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

	// Prepare the payload for the backend
	const payload = {
		...itemData,
		// Set createdBy to the authenticated user's ID
		createdBy: userId
	}

	const response = await baseAPI.post(`planner/${projectId}/items`, payload)
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
	const response = await baseAPI.delete(`planner/items/${itemId}`)
	return response.data
}
