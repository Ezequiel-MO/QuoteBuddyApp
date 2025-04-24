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
			// Process each item to sort comments
			const itemsWithSortedComments = action.payload.map((item) => {
				const itemCopy = { ...item }

				// Sort comments at item level if they exist
				if ((itemCopy as any).comments) {
					;(itemCopy as any).comments = [...(itemCopy as any).comments].sort(
						(a, b) => {
							return new Date(b.date).getTime() - new Date(a.date).getTime()
						}
					)
				}

				return itemCopy
			})

			state.planningItems = itemsWithSortedComments
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

			if (planningItem && planningItem.options) {
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
