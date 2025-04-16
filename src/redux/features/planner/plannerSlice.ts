import {
	IPlanningComment,
	IPlanningDocument,
	IPlanningItem,
	IPlanningOption
} from '@interfaces/planner'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PlannerState {
	planningItems: IPlanningItem[]
	planningOptions: IPlanningOption[]
	planningComments: IPlanningComment[]
	planningDocuments: IPlanningDocument[]
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
		}
	}
})

export const {
	SET_PLANNING_ITEMS,
	ADD_PLANNING_ITEM,
	UPDATE_PLANNING_ITEM,
	DELETE_PLANNING_ITEM
} = plannerSlice.actions

export default plannerSlice.reducer
