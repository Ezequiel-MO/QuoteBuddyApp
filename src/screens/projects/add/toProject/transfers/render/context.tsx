import {
	createContext,
	useContext,
	FC,
	ReactElement,
	useReducer,
	useState
} from 'react'
import { IFreelancer } from '../../../../../../interfaces/freelancer'

type TTransfer = { company: string; vehicleCapacity: string; service: string }
type TService = { freelancer: IFreelancer; typeOfAssistance: string }

interface State {
	transfers: TTransfer[]
	services: TService[]
}

interface Action {
	type: 'ADD_TRANSFER' | 'REMOVE_TRANSFER' | 'ADD_SERVICE' | 'REMOVE_SERVICE'
	payload?: any
}

const initialState: State = {
	transfers: [],
	services: []
}

function reducer(state: State, action: Action) {
	switch (action.type) {
		case 'ADD_TRANSFER':
			return {
				...state,
				transfers: [...state.transfers, action.payload]
			}
		case 'REMOVE_TRANSFER':
			return {
				...state,
				transfers: state.transfers.filter(
					(_, index) => index !== action.payload
				)
			}

		case 'ADD_SERVICE':
			return {
				...state,
				services: [...state.services, action.payload]
			}
		case 'REMOVE_SERVICE':
			return {
				...state,
				services: state.services.filter((_, index) => index !== action.payload)
			}
		default:
			throw new Error(`Unknown action: ${action.type}`)
	}
}

const TransfersContext = createContext<
	| {
			state: State
			dispatch: React.Dispatch<Action>
			open: boolean
			setOpen: React.Dispatch<React.SetStateAction<boolean>>
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
	const [open, setOpen] = useState(false)
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
				open,
				setOpen,
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
