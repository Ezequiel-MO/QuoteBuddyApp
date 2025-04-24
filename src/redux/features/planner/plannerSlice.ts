import {
	IPlanningComment,
	IPlanningItem,
	IPlanningOption,
	IPlanningDocument
} from '@interfaces/planner'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { defaultPlanningItems } from './defaultPlanningItem'

interface PlannerState {
	planningItems: IPlanningItem[]
}

const initialState: PlannerState = {
	planningItems: defaultPlanningItems
}

export const plannerSlice = createSlice({
	name: 'planner',
	initialState,
	reducers: {
		SET_PLANNING_ITEMS: (state, action: PayloadAction<IPlanningItem[]>) => {
			state.planningItems = action.payload
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
			const planningItem = state.planningItems.find(
				(item) => item._id === planningItemId
			)
			if (planningItem && planningItem.options) {
				const planningOption = planningItem.options.find(
					(option) => option._id === planningOptionId
				)
				if (planningOption) {
					planningOption.comments = [
						comment,
						...(planningOption.comments || [])
					]
				}
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
			// Find the planning item that contains the comment
			const planningItem = state.planningItems.find(
				(item) => item._id === action.payload.planningItemId
			)

			// If planning item exists and has options
			if (planningItem && planningItem.options) {
				// Find the option that contains the comment
				const option = planningItem.options.find(
					(opt) => opt._id === action.payload.planningOptionId
				)

				// If option exists and has comments
				if (option && option.comments) {
					// Filter out the comment with the matching ID
					option.comments = option.comments.filter(
						(comment) => comment._id !== action.payload.planningCommentId
					)
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
