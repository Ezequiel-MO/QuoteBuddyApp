import {
	createContext,
	useContext,
	FC,
	ReactElement,
	useReducer,
	useState
} from 'react'
import { IFreelancer } from '../../../../../../interfaces/freelancer'

interface State {
	open: boolean
	transfers: any[]
	services: any[]
}

interface Action {
	type: 'ADD_TRANSFER' | 'ADD_SERVICE' | 'TOGGLE_OPEN'
	payload?: any
}

const initialState: State = {
	open: false,
	transfers: [],
	services: []
}

function reducer(state: State, action: Action) {
	switch (action.type) {
		case 'TOGGLE_OPEN':
			if (action.payload === true) return { ...state, open: true }
			if (action.payload === false) return { ...state, open: false }
			if (action.payload === undefined) return { ...state, open: !state.open }

			throw new Error(`Unknown payload: ${action.payload}`)
		case 'ADD_TRANSFER':
			return {
				...state,
				transfers: [...state.transfers, action.payload]
			}
		case 'ADD_SERVICE':
			return {
				...state,
				services: [...state.services, action.payload]
			}
		default:
			throw new Error(`Unknown action: ${action.type}`)
	}
}

const TransfersContext = createContext<
	| {
			state: State
			dispatch: React.Dispatch<Action>
			city: string
			setCity: React.Dispatch<React.SetStateAction<string>>
			company: string
			setCompany: React.Dispatch<React.SetStateAction<string>>
			vehicleCapacity: string
			setVehicleCapacity: React.Dispatch<React.SetStateAction<string>>
			freelancer: IFreelancer | null
			setFreelancer: React.Dispatch<React.SetStateAction<IFreelancer | null>>
			service: string
			setService: React.Dispatch<React.SetStateAction<string>>
			typeOfAssistance: 'meetGreet' | 'hostessOnBoard' | 'guideOnBoard'
			setTypeOfAssistance: React.Dispatch<
				React.SetStateAction<'meetGreet' | 'hostessOnBoard' | 'guideOnBoard'>
			>
			selectedSection: 'transfer' | 'service' | null
			setSelectedSection: React.Dispatch<
				React.SetStateAction<'transfer' | 'service' | null>
			>
	  }
	| undefined
>(undefined)

interface TransfersProviderProps {
	children: React.ReactNode
}

export const TransfersProvider: FC<TransfersProviderProps> = ({
	children
}): ReactElement => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const [city, setCity] = useState('none')
	const [company, setCompany] = useState('none')
	const [vehicleCapacity, setVehicleCapacity] = useState('')
	const [service, setService] = useState('none')
	const [freelancer, setFreelancer] = useState<IFreelancer | null>(null)
	const [typeOfAssistance, setTypeOfAssistance] = useState<
		'meetGreet' | 'hostessOnBoard' | 'guideOnBoard'
	>('meetGreet')
	const [selectedSection, setSelectedSection] = useState<
		'transfer' | 'service' | null
	>(null)

	return (
		<TransfersContext.Provider
			value={{
				state,
				dispatch,
				city,
				setCity,
				company,
				setCompany,
				freelancer,
				setFreelancer,
				vehicleCapacity,
				setVehicleCapacity,
				service,
				setService,
				typeOfAssistance,
				setTypeOfAssistance,
				selectedSection,
				setSelectedSection
			}}
		>
			{children}
		</TransfersContext.Provider>
	)
}

export function useTransfers() {
	const context = useContext(TransfersContext)
	if (context === undefined) {
		throw new Error('useTransfers must be used within a TransfersProvider')
	}
	return context
}
