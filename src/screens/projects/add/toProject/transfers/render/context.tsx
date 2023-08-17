import React, {
	createContext,
	useContext,
	FC,
	ReactElement,
	useReducer,
	useState
} from 'react'
import {
	UPDATE_TRANSFER_IN,
	ADD_TRANSFER_IN,
	REMOVE_TRANSFER_IN,
	ADD_SERVICE_IN,
	REMOVE_SERVICE_IN,
	UPDATE_TRANSFER_OUT,
	ADD_TRANSFER_OUT,
	REMOVE_TRANSFER_OUT,
	ADD_SERVICE_OUT,
	REMOVE_SERVICE_OUT
} from './actionTypes'
import { IFreelancer } from '../../../../../../interfaces/freelancer'
import { ITransfer } from '../../../../../../interfaces'

type TService = { freelancer: IFreelancer; typeOfAssistance: string }

interface State {
	transfersIn: ITransfer[]
	transfersOut: ITransfer[]
	servicesIn: TService[]
	servicesOut: TService[]
}

interface Action {
	type:
	    | typeof UPDATE_TRANSFER_IN
		| typeof ADD_TRANSFER_IN
		| typeof REMOVE_TRANSFER_IN
		| typeof ADD_SERVICE_IN
		| typeof REMOVE_SERVICE_IN
		| typeof UPDATE_TRANSFER_OUT
		| typeof ADD_TRANSFER_OUT
		| typeof REMOVE_TRANSFER_OUT
		| typeof ADD_SERVICE_OUT
		| typeof REMOVE_SERVICE_OUT
	payload?: any
}

const initialState: State = {
	transfersIn: [],
	servicesIn: [],
	transfersOut: [],
	servicesOut: []
}

function reducer(state: State, action: Action) {
	const { transferObject } = action.payload || {}
	switch (action.type) {
		case UPDATE_TRANSFER_IN :
			return{
				...state,
				transfersIn: [  ...transferObject]
			}
		case ADD_TRANSFER_IN:
			return {
				...state,
				transfersIn: [...state.transfersIn, ...transferObject]
			}
		case REMOVE_TRANSFER_IN:
			return {
				...state,
				transfersIn: state.transfersIn.filter(
					(_, index) => index !== action.payload
				)
			}

		case ADD_SERVICE_IN:
			return {
				...state,
				servicesIn: [...state.servicesIn, action.payload]
			}
		case REMOVE_SERVICE_IN:
			return {
				...state,
				servicesIn: state.servicesIn.filter(
					(_, index) => index !== action.payload
				)
			}
		//CASE TRASFER OUT
		case UPDATE_TRANSFER_OUT:
			return{
				...state,
				transfersOut: [...transferObject]
			}
		case ADD_TRANSFER_OUT:
			return {
				...state,
				transfersOut: [...state.transfersOut, ...transferObject]
			}
		case REMOVE_TRANSFER_OUT:
			return {
				...state,
				transfersOut: state.transfersOut.filter(
					(_, index) => index !== action.payload
				)
			}

		case ADD_SERVICE_OUT:
			return {
				...state,
				servicesOut: [...state.servicesOut, action.payload]
			}
		case REMOVE_SERVICE_OUT:
			return {
				...state,
				servicesOut: state.servicesOut.filter(
					(_, index) => index !== action.payload
				)
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
			typeTransfer: 'in' | 'out'
			setTypeTransfer: React.Dispatch<React.SetStateAction<'in' | 'out'>>
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
	const [typeTransfer, setTypeTransfer] = useState<'in' | 'out'>('in')

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
				setSelectedSection,
				typeTransfer,
				setTypeTransfer
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
