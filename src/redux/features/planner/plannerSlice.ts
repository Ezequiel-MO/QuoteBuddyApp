import {
	IPlanningComment,
	IPlanningItem,
	IPlanningOption,
	IPlanningDocument
} from '@interfaces/planner'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PlannerState {
	planningItems: IPlanningItem[]
}

const initialState: PlannerState = {
	planningItems: []
}

export const plannerSlice = createSlice({
	name: 'planner',
	initialState,
	reducers: {
		SET_PLANNING_ITEMS: (state, action: PayloadAction<IPlanningItem[]>) => {
			console.log(
				'SET_PLANNING_ITEMS action received with',
				action.payload.length,
				'items'
			)

			// Process each item to organize documents and sort comments
			const itemsWithProcessedData = action.payload.map((item) => {
				const itemCopy = { ...item }

				// Sort comments at item level if they exist
				if ((itemCopy as any).comments) {
					;(itemCopy as any).comments = [...(itemCopy as any).comments].sort(
						(a, b) => {
							return new Date(b.date).getTime() - new Date(a.date).getTime()
						}
					)
				}

				// Count documents before processing for debugging
				let totalDocsBeforeProcessing = 0
				if (itemCopy.documents && Array.isArray(itemCopy.documents)) {
					totalDocsBeforeProcessing += itemCopy.documents.length
				}

				if (itemCopy.options && Array.isArray(itemCopy.options)) {
					itemCopy.options.forEach((option) => {
						if (option.documents && Array.isArray(option.documents)) {
							totalDocsBeforeProcessing += option.documents.length
						}
					})
				}

				console.log(
					`Item ${
						itemCopy.title || itemCopy._id
					} has ${totalDocsBeforeProcessing} total documents before processing`
				)

				// Process options if they exist
				if (itemCopy.options && Array.isArray(itemCopy.options)) {
					// Log options before processing for debugging
					console.log(
						'Options before processing:',
						itemCopy.options.map((opt) => ({
							optionId: opt._id,
							name: opt.name,
							docCount: opt.documents?.length || 0,
							hasDocumentsArray: !!opt.documents,
							isDocumentsArray: Array.isArray(opt.documents)
						}))
					)

					// First, collect all document IDs that belong to options
					// This will help us filter out these documents from the item level
					const optionDocumentIds = new Set<string>()

					// For each option, make sure documents have correct planningOptionId
					itemCopy.options = itemCopy.options.map((option) => {
						const optionCopy = { ...option }

						// Ensure option documents have correct parent references
						if (optionCopy.documents && Array.isArray(optionCopy.documents)) {
							console.log(
								`Option ${optionCopy.name || optionCopy._id} has ${
									optionCopy.documents.length
								} documents before processing`
							)

							// First filter to ensure document truly belongs to this option
							optionCopy.documents = optionCopy.documents.filter((doc) => {
								const belongsToThisOption =
									!doc.planningOptionId ||
									doc.planningOptionId === option._id ||
									doc.planningOptionId.toString() === option._id?.toString()

								// Add document ID to the set of option documents
								if (belongsToThisOption && doc._id) {
									optionDocumentIds.add(doc._id.toString())
								}

								return belongsToThisOption
							})

							// Then set the planningOptionId correctly
							optionCopy.documents = optionCopy.documents.map((doc) => {
								console.log(
									`Setting planningOptionId for document ${doc.fileName} to ${option._id}`
								)
								return {
									...doc,
									planningOptionId:
										option._id?.toString() || doc.planningOptionId
								}
							})

							console.log(
								`Option ${optionCopy.name || optionCopy._id} has ${
									optionCopy.documents.length
								} documents after processing`
							)
						} else {
							console.log(
								`Option ${
									optionCopy.name || optionCopy._id
								} has no documents or documents is not an array`
							)
							// Initialize documents array if it doesn't exist
							optionCopy.documents = []
						}

						return optionCopy
					})

					// Now, use optionDocumentIds to filter item-level documents
					if (itemCopy.documents && Array.isArray(itemCopy.documents)) {
						console.log(
							`Item ${itemCopy.title || itemCopy._id} has ${
								itemCopy.documents.length
							} documents at item level before filtering`
						)

						// Clone to avoid mutation during filtering
						const originalDocuments = [...itemCopy.documents]

						// Filter out any document that has a planningOptionId OR appears in an option's documents
						itemCopy.documents = itemCopy.documents.filter((doc) => {
							// We want to keep a document at the item level only if:
							// 1. It doesn't have a planningOptionId set
							// 2. AND it's not already included in any option's documents
							const hasNoOptionId = !doc.planningOptionId
							const notInOptions = doc._id
								? !optionDocumentIds.has(doc._id.toString())
								: true
							const keepAtItemLevel = hasNoOptionId && notInOptions

							if (!keepAtItemLevel) {
								console.log(
									`Filtering out document ${
										doc.fileName
									} from item level because ${
										!hasNoOptionId
											? 'it has an option ID'
											: 'it exists in an option'
									}`
								)
							}

							return keepAtItemLevel
						})

						console.log(
							`Item ${itemCopy.title || itemCopy._id} has ${
								itemCopy.documents.length
							} documents at item level after filtering (removed ${
								originalDocuments.length - itemCopy.documents.length
							})`
						)
					}
				}

				// Count documents after processing for debugging
				let totalDocsAfterProcessing = 0
				if (itemCopy.documents && Array.isArray(itemCopy.documents)) {
					totalDocsAfterProcessing += itemCopy.documents.length
				}

				if (itemCopy.options && Array.isArray(itemCopy.options)) {
					itemCopy.options.forEach((option) => {
						if (option.documents && Array.isArray(option.documents)) {
							totalDocsAfterProcessing += option.documents.length
						}
					})
				}

				console.log(
					`Item ${
						itemCopy.title || itemCopy._id
					} has ${totalDocsAfterProcessing} total documents after processing`
				)

				return itemCopy
			})

			state.planningItems = itemsWithProcessedData
		},
		ADD_PLANNING_ITEM: (state, action: PayloadAction<IPlanningItem>) => {
			state.planningItems = [action.payload, ...state.planningItems]
		},
		UPDATE_PLANNING_ITEM: (
			state,
			action: PayloadAction<{
				id: string | number
				data: Partial<IPlanningItem>
			}>
		) => {
			const { id, data } = action.payload
			const itemIndex = state.planningItems.findIndex(
				(item) =>
					(item as any).id === id ||
					(item as any)._id === id ||
					item.projectId === id
			)
			if (itemIndex !== -1) {
				state.planningItems[itemIndex] = {
					...state.planningItems[itemIndex],
					...data
				}
			}
		},
		DELETE_PLANNING_ITEM: (state, action: PayloadAction<string>) => {
			state.planningItems = state.planningItems.filter(
				(item) => item._id !== action.payload
			)
		},
		ADD_PLANNING_OPTION: (
			state,
			action: PayloadAction<{
				planningItemId: string
				option: IPlanningOption
			}>
		) => {
			const { planningItemId, option } = action.payload
			const itemIndex = state.planningItems.findIndex(
				(item) => item._id === planningItemId
			)
			if (itemIndex !== -1) {
				// Ensure the options array exists
				if (!state.planningItems[itemIndex].options) {
					state.planningItems[itemIndex].options = []
				}
				state.planningItems[itemIndex].options?.push(option)
			}
		},
		DELETE_PLANNING_OPTION: (
			state,
			action: PayloadAction<{ planningItemId: string; optionId: string }>
		) => {
			const planningItem = state.planningItems.find(
				(item) => item._id === action.payload.planningItemId
			)
			if (planningItem && planningItem.options) {
				planningItem.options = planningItem.options.filter(
					(option) => option._id !== action.payload.optionId
				)
			}
			return state
		},
		ADD_PLANNING_COMMENT: (
			state,
			action: PayloadAction<{
				planningItemId: string
				planningOptionId: string
				comment: IPlanningComment
			}>
		) => {
			const { planningItemId, planningOptionId, comment } = action.payload

			console.log('ADD_PLANNING_COMMENT action received:', {
				planningItemId,
				planningOptionId,
				comment
			})

			// Find the planning item
			const planningItem = state.planningItems.find(
				(item) => item._id === planningItemId
			)

			if (!planningItem) {
				console.error(`Planning item not found: ${planningItemId}`)
				return state
			}

			if (!planningOptionId) {
				console.error('No planningOptionId provided')
				return state
			}

			// Add or update the comments array at the item level
			if (!(planningItem as any).comments) {
				;(planningItem as any).comments = []
			}
			;(planningItem as any).comments = [
				comment,
				...((planningItem as any).comments || [])
			]
			console.log(
				`Comment added to item level. Item now has ${
					(planningItem as any).comments.length
				} comments`
			)

			// ALSO maintain the legacy implementation for compatibility:
			// Find the option to add the comment to
			if (planningItem.options) {
				const planningOption = planningItem.options.find(
					(option) => option._id === planningOptionId
				)

				if (planningOption) {
					// Initialize comments array if it doesn't exist
					if (!planningOption.comments) {
						console.log(
							`Initializing comments array for option ${planningOptionId}`
						)
						planningOption.comments = []
					}

					// Add comment to the option
					planningOption.comments = [
						comment,
						...(planningOption.comments || [])
					]

					console.log(
						`Comment ALSO added to option level. Option now has ${planningOption.comments.length} comments`
					)
				} else {
					console.error(
						`Planning option not found: ${planningOptionId} in item ${planningItemId}`
					)
					console.log(
						'Available options:',
						planningItem.options.map((o) => o._id)
					)
				}
			} else {
				console.error(`Planning item has no options array: ${planningItemId}`)
			}

			return state
		},
		DELETE_PLANNING_COMMENT: (
			state,
			action: PayloadAction<{
				planningItemId: string
				planningOptionId: string
				planningCommentId: string
			}>
		) => {
			const { planningItemId, planningOptionId, planningCommentId } =
				action.payload

			// Find the planning item
			const planningItem = state.planningItems.find(
				(item) => item._id === planningItemId
			)

			if (!planningItem) return state

			// Remove from the item-level comments array first
			if ((planningItem as any).comments) {
				console.log(
					`Removing comment ${planningCommentId} from item-level comments`
				)
				;(planningItem as any).comments = (planningItem as any).comments.filter(
					(comment: IPlanningComment) => comment._id !== planningCommentId
				)
			}

			// Also remove from option level for compatibility
			if (planningItem.options && planningOptionId) {
				// Find the option that contains the comment
				const option = planningItem.options.find(
					(opt) => opt._id === planningOptionId
				)

				// If option exists and has comments
				if (option && option.comments) {
					// Filter out the comment with the matching ID
					option.comments = option.comments.filter(
						(comment) => comment._id !== planningCommentId
					)
					console.log(`Also removed comment from option-level comments`)
				}
			}

			return state
		},
		ADD_DOCUMENTS_TO_PLANNING_OPTION: (
			state,
			action: PayloadAction<{
				planningItemId: string
				planningOptionId: string
				documents: IPlanningDocument[]
			}>
		) => {
			const { planningItemId, planningOptionId, documents } = action.payload
			const planningItem = state.planningItems.find(
				(item) => item._id === planningItemId
			)

			if (!planningItem) return state

			// If planningOptionId is empty, add documents directly to the planning item
			if (!planningOptionId) {
				planningItem.documents = [
					...(planningItem.documents || []),
					...documents
				]
				return state
			}

			// Otherwise add to the specific option
			if (planningItem.options) {
				const planningOption = planningItem.options.find(
					(option) => option._id === planningOptionId
				)

				if (planningOption) {
					planningOption.documents = [
						...(planningOption.documents || []),
						...documents
					]
				}
			}
			return state
		},
		DELETE_PLANNING_DOCUMENT: (
			state,
			action: PayloadAction<{
				documentId: string
				planningItemId: string
				planningOptionId?: string
			}>
		) => {
			const { documentId, planningItemId, planningOptionId } = action.payload

			// Find the planning item
			const planningItem = state.planningItems.find(
				(item) => item._id === planningItemId
			)

			if (!planningItem) return state

			// If planningOptionId is provided, delete from the option's documents
			if (planningOptionId && planningItem.options) {
				const option = planningItem.options.find(
					(opt) => opt._id === planningOptionId
				)

				if (option && option.documents) {
					option.documents = option.documents.filter(
						(doc) => doc._id !== documentId
					)
				}
			}
			// Otherwise delete from the planning item's documents
			else if (planningItem.documents) {
				planningItem.documents = planningItem.documents.filter(
					(doc) => doc._id !== documentId
				)
			}

			return state
		}
	}
})

export const {
	SET_PLANNING_ITEMS,
	ADD_PLANNING_ITEM,
	UPDATE_PLANNING_ITEM,
	DELETE_PLANNING_ITEM,
	ADD_PLANNING_OPTION,
	DELETE_PLANNING_OPTION,
	ADD_PLANNING_COMMENT,
	DELETE_PLANNING_COMMENT,
	DELETE_PLANNING_DOCUMENT,
	ADD_DOCUMENTS_TO_PLANNING_OPTION
} = plannerSlice.actions

export default plannerSlice.reducer
