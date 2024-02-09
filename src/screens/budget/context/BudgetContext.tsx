import {
	FC,
	createContext,
	useContext,
	useReducer,
	ReactNode,
	useEffect
} from 'react'
import { BudgetState, BudgetActions } from './interfaces'
import { SET_BUDGET, budgetReducer } from './budgetReducer'
import { useCurrentProject } from 'src/hooks'

interface BudgetContextType {
	state: BudgetState
	dispatch: React.Dispatch<BudgetActions>
}

export const BudgetContext = createContext<BudgetContextType | undefined>(
	undefined
)

export const useContextBudget = () => {
	const context = useContext(BudgetContext)
	if (!context) {
		throw new Error('useBudget must be used within a BudgetProvider')
	}
	return context
}

interface BudgetProviderProps {
	children: ReactNode
}

export const BudgetProvider: FC<BudgetProviderProps> = ({ children }) => {
	const { currentProject } = useCurrentProject()
	const initialState: BudgetState = {
		hotels: currentProject.hotels || [],
		selectedHotel: null,
		selectedHotelCost: 0,
		schedule: currentProject.schedule || [],
		activities: {},
		activitiesCost: 0,
		meals: {},
		mealsCost: 0,
		meetings: {},
		meetingsCost: 0,
		overnight: {},
		overnightCost: 0,
		shows: {},
		showsCost: 0,
		programTransfers: {},
		programTransfersCost: 0,
		transfersInCost: 0,
		transfersOutCost: 0,
		itineraryTransfers: {},
		itineraryTransfersCost: 0,
		nrPax: currentProject.nrPax || 0
	}
	const [state, dispatch] = useReducer(budgetReducer, initialState)

	useEffect(() => {
		const payload = {
			hotels: currentProject.hotels || [],
			schedule: currentProject.schedule || [],
			nrPax: currentProject.nrPax || 0
		}
		dispatch({ type: SET_BUDGET, payload })
	}, [currentProject])

	return (
		<BudgetContext.Provider value={{ state, dispatch }}>
			{children}
		</BudgetContext.Provider>
	)
}
