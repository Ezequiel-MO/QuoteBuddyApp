import {
	createContext,
	useContext,
	FC,
	ReactElement,
	useReducer,
	useState
} from 'react'
import { IFreelancer } from '../../../../../../interfaces/freelancer'
import { ITransfer } from '../../../../../../interfaces'

type TService = { freelancer: IFreelancer; typeOfAssistance: string }

interface State {
	transfers: ITransfer[]
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
	const { transferObject } = action.payload || {}
	switch (action.type) {
		case 'ADD_TRANSFER':
			return {
				...state,
				transfers: [...state.transfers, ...transferObject]
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
