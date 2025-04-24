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
 * Gets all planning items for a project with their full details (options, documents, comments)
 * @param projectId The project ID
 * @returns Array of planning items with nested options, documents, and comments
 */
export async function getPlanningItemsWithDetails(
	projectId: string
): Promise<IPlanningItem[]> {
	try {
		console.log('Getting basic planning items...')
		// First, get the basic planning items
		const basicItemsResponse = await baseAPI.get(`planner/${projectId}/items`)
		const basicItems = basicItemsResponse.data.data

		if (!Array.isArray(basicItems) || basicItems.length === 0) {
			console.log('No basic items found')
			return []
		}

		console.log(`Fetching details for ${basicItems.length} planning items...`)

		// For each basic item, fetch its options, documents, and comments
		const itemsWithDetails = await Promise.all(
			basicItems.map(async (item) => {
				try {
					// First, fetch all options for this item
					console.log(`Fetching options for item ${item._id}...`)
					const optionsResponse = await baseAPI.get(
						`planner/items/${item._id}/options`
					)
					const options = optionsResponse.data.data || []
					console.log(`Found ${options.length} options for item ${item._id}`)

					// For each option, fetch documents and comments
					const optionsWithDetails = await Promise.all(
						options.map(async (option: IPlanningOption) => {
							try {
								// Fetch documents for this option
								console.log(`Fetching documents for option ${option._id}...`)
								const documentsResponse = await baseAPI.get(
									`planner/options/${option._id}/documents`
								)
								const documents = documentsResponse.data.data || []
								console.log(
									`Found ${documents.length} documents for option ${option._id}`
								)

								// Initialize with empty comments
								let comments: any[] = []

								// Try multiple approaches to get comments
								try {
									// Approach 1: Query by planningOptionId
									console.log(
										`Trying to fetch comments via query param for option ${option._id}...`
									)
									const commentsResponse = await baseAPI.get(
										`planner/comments?planningOptionId=${option._id}`
									)
									comments = commentsResponse.data.data || []
									console.log(
										`Found ${comments.length} comments via query param for option ${option._id}`
									)
								} catch (err1) {
									console.log(
										`Query param approach failed, trying direct endpoint...`
									)

									try {
										// Approach 2: Direct nested endpoint
										const commentsResponse = await baseAPI.get(
											`planner/options/${option._id}/comments`
										)
										comments = commentsResponse.data.data || []
										console.log(
											`Found ${comments.length} comments via direct endpoint for option ${option._id}`
										)
									} catch (err2) {
										// Check if comments are already in the option
										if (
											option.comments &&
											Array.isArray(option.comments) &&
											option.comments.length > 0
										) {
											comments = option.comments
											console.log(
												`Using ${comments.length} embedded comments from option ${option._id}`
											)
										} else {
											console.error(
												`Failed to fetch comments for option ${option._id}`
											)
										}
									}
								}

								// Return option with all its details
								return {
									...option,
									documents,
									comments
								}
							} catch (optionError) {
								console.error(
									`Error fetching details for option ${option._id}:`,
									optionError
								)
								return option // Return option without documents/comments if fetch fails
							}
						})
					)

					// Fetch documents for the item itself
					console.log(`Fetching documents for item ${item._id}...`)
					const documentsResponse = await baseAPI.get(
						`planner/items/${item._id}/documents`
					)
					const documents = documentsResponse.data.data || []
					console.log(
						`Found ${documents.length} documents for item ${item._id}`
					)

					// Fetch comments for the item itself
					console.log(`Fetching comments for item ${item._id}...`)
					let itemComments: any[] = []

					try {
						// Try the direct item comments endpoint
						const commentsResponse = await baseAPI.get(
							`planner/items/${item._id}/comments`
						)
						itemComments = commentsResponse.data.data || []
						console.log(
							`Found ${itemComments.length} comments for item ${item._id}`
						)
					} catch (commentError) {
						console.log(
							`Failed to fetch comments for item ${item._id}:`,
							commentError
						)

						// Try alternative endpoint
						try {
							const commentsResponse = await baseAPI.get(
								`planner/comments?planningItemId=${item._id}`
							)
							itemComments = commentsResponse.data.data || []
							console.log(
								`Found ${itemComments.length} comments via query for item ${item._id}`
							)
						} catch (err) {
							console.error(
								`All attempts to fetch comments for item ${item._id} failed`
							)
							// If the item already has comments embedded, use those
							if (item.comments && Array.isArray(item.comments)) {
								itemComments = item.comments
								console.log(
									`Using ${itemComments.length} embedded comments from item ${item._id}`
								)
							}
						}
					}

					// Return item with all its details
					return {
						...item,
						options: optionsWithDetails,
						documents,
						comments: itemComments
					}
				} catch (itemError) {
					console.error(
						`Error fetching details for item ${item._id}:`,
						itemError
					)
					return item // Return basic item if we can't fetch details
				}
			})
		)

		// Add statistics for debugging
		let optionsCount = 0
		let documentsCount = 0
		let commentsCount = 0
		let itemsWithCommentsCount = 0

		itemsWithDetails.forEach((item) => {
			if (item.options && Array.isArray(item.options)) {
				optionsCount += item.options.length

				item.options.forEach((option: IPlanningOption) => {
					if (option.documents && Array.isArray(option.documents)) {
						documentsCount += option.documents.length
					}
					if (option.comments && Array.isArray(option.comments)) {
						commentsCount += option.comments.length
					}
				})
			}

			if (item.documents && Array.isArray(item.documents)) {
				documentsCount += item.documents.length
			}

			if (item.comments && Array.isArray(item.comments)) {
				commentsCount += item.comments.length
				if (item.comments.length > 0) {
					itemsWithCommentsCount++
				}
			}
		})

		console.log(
			`Successfully fetched details for ${itemsWithDetails.length} items:`
		)
		console.log(`- ${optionsCount} options`)
		console.log(`- ${documentsCount} documents`)
		console.log(
			`- ${commentsCount} comments (${itemsWithCommentsCount} items have comments)`
		)

		return itemsWithDetails
	} catch (error) {
		console.error('Error in getPlanningItemsWithDetails:', error)
		throw error
	}
}

/**
 * Gets detailed information for a single planning item
 * @param itemId The planning item ID
 * @returns The planning item with all its options, documents, and comments
 */
export async function getPlanningItemDetails(
	itemId: string
): Promise<IPlanningItem> {
	const response = await baseAPI.get(`planner/items/${itemId}`)
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
	// Validate that we have a planningOptionId
	if (!comment.planningOptionId) {
		throw new Error('Comment must be associated with a planning option')
	}

	// Use the item-level comments endpoint
	// The backend expects both planningItemId and planningOptionId in the payload
	const endpoint = `planner/items/${planningItemId}/comments`

	console.log(`Creating comment using endpoint: ${endpoint}`, comment)

	const response = await baseAPI.post(endpoint, comment)
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

/**
 * Deletes a planning document from the database
 * @param documentId The ID of the document to delete
 * @returns Success message
 */
export async function deletePlanningDocument(documentId: string): Promise<any> {
	const response = await baseAPI.delete(`planner/documents/${documentId}`)
	return response.data
}
