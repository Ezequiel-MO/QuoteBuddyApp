import { IPlanningItem } from '@interfaces/planner/planningItem'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PlanningOption {
	id: string | number
	planningItemId: string | number
	title: string
	description: string
	[key: string]: any
}

interface PlanningComment {
	id: string | number
	optionId: string | number
	author: string
	role: string
	text: string
	date: string
	[key: string]: any
}

interface PlanningDocument {
	id: string | number
	planningItemId: string | number
	name: string
	size: string
	url?: string
	[key: string]: any
}

interface PlannerState {
	planningItems: IPlanningItem[]
	planningOptions: PlanningOption[]
	planningComments: PlanningComment[]
	planningDocuments: PlanningDocument[]
	loading: boolean
	error: string | null
}

const initialState: PlannerState = {
	planningItems: [],
	planningOptions: [],
	planningComments: [],
	planningDocuments: [],
	loading: false,
	error: null
}

export const plannerSlice = createSlice({
	name: 'planner',
	initialState,
	reducers: {
		// Planning Item reducers
		ADD_PLANNING_ITEM: (state, action: PayloadAction<IPlanningItem[]>) => {
			state.planningItems = action.payload
		},
		SET_PLANNING_ITEMS: (state, action: PayloadAction<IPlanningItem[]>) => {
			state.planningItems = action.payload
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
		DELETE_PLANNING_ITEM: (state, action: PayloadAction<string | number>) => {
			state.planningItems = state.planningItems.filter(
				(item) =>
					(item as any).id !== action.payload &&
					(item as any)._id !== action.payload &&
					item.projectId !== action.payload
			)
		},

		// Planning Option reducers
		ADD_PLANNING_OPTION: (state, action: PayloadAction<PlanningOption>) => {
			state.planningOptions.push(action.payload)
		},
		SET_PLANNING_OPTIONS: (state, action: PayloadAction<PlanningOption[]>) => {
			state.planningOptions = action.payload
		},
		UPDATE_PLANNING_OPTION: (
			state,
			action: PayloadAction<{
				id: string | number
				data: Partial<PlanningOption>
			}>
		) => {
			const { id, data } = action.payload
			const optionIndex = state.planningOptions.findIndex(
				(option) => option.id === id
			)
			if (optionIndex !== -1) {
				state.planningOptions[optionIndex] = {
					...state.planningOptions[optionIndex],
					...data
				}
			}
		},
		DELETE_PLANNING_OPTION: (state, action: PayloadAction<string | number>) => {
			state.planningOptions = state.planningOptions.filter(
				(option) => option.id !== action.payload
			)
		},

		// Planning Comment reducers
		ADD_PLANNING_COMMENT: (state, action: PayloadAction<PlanningComment>) => {
			state.planningComments.push(action.payload)
		},
		SET_PLANNING_COMMENTS: (
			state,
			action: PayloadAction<PlanningComment[]>
		) => {
			state.planningComments = action.payload
		},
		UPDATE_PLANNING_COMMENT: (
			state,
			action: PayloadAction<{
				id: string | number
				data: Partial<PlanningComment>
			}>
		) => {
			const { id, data } = action.payload
			const commentIndex = state.planningComments.findIndex(
				(comment) => comment.id === id
			)
			if (commentIndex !== -1) {
				state.planningComments[commentIndex] = {
					...state.planningComments[commentIndex],
					...data
				}
			}
		},
		DELETE_PLANNING_COMMENT: (
			state,
			action: PayloadAction<string | number>
		) => {
			state.planningComments = state.planningComments.filter(
				(comment) => comment.id !== action.payload
			)
		},

		// Planning Document reducers
		ADD_PLANNING_DOCUMENT: (state, action: PayloadAction<PlanningDocument>) => {
			state.planningDocuments.push(action.payload)
		},
		SET_PLANNING_DOCUMENTS: (
			state,
			action: PayloadAction<PlanningDocument[]>
		) => {
			state.planningDocuments = action.payload
		},
		DELETE_PLANNING_DOCUMENT: (
			state,
			action: PayloadAction<string | number>
		) => {
			state.planningDocuments = state.planningDocuments.filter(
				(document) => document.id !== action.payload
			)
		},

		// Status reducers
		SET_LOADING: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload
		},
		SET_ERROR: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload
		}
	}
})

export const {
	ADD_PLANNING_ITEM,
	SET_PLANNING_ITEMS,
	UPDATE_PLANNING_ITEM,
	DELETE_PLANNING_ITEM,

	ADD_PLANNING_OPTION,
	SET_PLANNING_OPTIONS,
	UPDATE_PLANNING_OPTION,
	DELETE_PLANNING_OPTION,

	ADD_PLANNING_COMMENT,
	SET_PLANNING_COMMENTS,
	UPDATE_PLANNING_COMMENT,
	DELETE_PLANNING_COMMENT,

	ADD_PLANNING_DOCUMENT,
	SET_PLANNING_DOCUMENTS,
	DELETE_PLANNING_DOCUMENT,

	SET_LOADING,
	SET_ERROR
} = plannerSlice.actions

export default plannerSlice.reducer
