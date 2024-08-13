import { Dispatch, createContext, useContext, useReducer } from 'react'

import * as typescript from './contextinterfaces'
import initialState from './initialState'

const ProjectContext = createContext<
	| {
			state: typescript.ProjectState
			dispatch: Dispatch<typescript.ProjectAction>
	  }
	| undefined
>(undefined)

const projectReducer = (
	state: typescript.ProjectState,
	action: typescript.ProjectAction
): typescript.ProjectState => {
	switch (action.type) {
		case 'TOGGLE_BUDGET_VISUALIZER':
			return { ...state, isBudgetVisualizerOpen: !state.isBudgetVisualizerOpen }
		case 'SET_SELECTED_TAB':
			return { ...state, selectedTab: action.payload }
		default:
			return state
	}
}

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [state, dispatch] = useReducer(projectReducer, initialState)

	return (
		<ProjectContext.Provider
			value={{
				state,
				dispatch
			}}
		>
			{children}
		</ProjectContext.Provider>
	)
}

export const useProject = () => {
	const context = useContext(ProjectContext)
	if (context === undefined) {
		throw new Error('useProject must be used within a ProjectProvider')
	}
	return context
}
