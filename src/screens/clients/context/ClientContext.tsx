import {
	ChangeEvent,
	Dispatch,
	FocusEvent,
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState
} from 'react'
import * as Yup from 'yup'
import * as typescript from './contextinterfaces'
import initialState from './initialState'
import { itemsPerPage } from 'src/constants/pagination'
import { useApiFetch } from 'src/hooks/fetchData'
import { clientValidationSchema } from '../specs/ClientValidation'
import { IClient } from '@interfaces/client'
import createClientUrl from '../specs/createClientUrl'

const ClientContext = createContext<
	| {
			state: typescript.ClientState
			dispatch: Dispatch<typescript.ClientAction>
			handleChange: (
				e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
			) => void
			handleBlur: (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => void
			errors: Record<string, string>
	  }
	| undefined
>(undefined)

const clientReducer = (
	state: typescript.ClientState,
	action: typescript.ClientAction
): typescript.ClientState => {
	switch (action.type) {
		case 'SET_CLIENTS':
			if (!Array.isArray(action.payload)) {
				console.error('SET_CLIENTS payload is not an array:', action.payload)
				return state
			}
			return { ...state, clients: action.payload }
		case 'SET_CLIENT':
			return { ...state, currentClient: action.payload }
		case 'ADD_CLIENT':
			if (!Array.isArray(state.clients)) {
				console.error('Clients is not an array:', state.clients)
				return state
			}
			return {
				...state,
				clients: [action.payload, ...state.clients]
			}
		case 'UPDATE_CLIENT_FIELD':
			if (!state.currentClient) return state
			return {
				...state,
				currentClient: {
					...state.currentClient,
					[action.payload.name]: action.payload.value
				}
			}
		case 'TOGGLE_UPDATE': {
			return { ...state, update: action.payload }
		}
		case 'RENDER_ADD_COMPANY_IN_FORM':
			return { ...state, renderAddCompanyInForm: action.payload }
		case 'SET_TOTAL_PAGES':
			return { ...state, totalPages: action.payload }
		case 'SET_PAGE':
			return { ...state, page: action.payload }
		case 'SET_SEARCH_TERM':
			return { ...state, searchTerm: action.payload }

		default:
			return state
	}
}

export const ClientProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [state, dispatch] = useReducer(clientReducer, initialState)
	const [errors, setErrors] = useState<Record<string, string>>({})

	const queryParams = {
		page: state.page,
		limit: itemsPerPage,
		country: state.currentClient?.country,
		searchTerm: state.searchTerm
	}

	const endpoint = createClientUrl('clients', queryParams)

	const { data: clients, dataLength: clientsLength } = useApiFetch<IClient[]>(
		endpoint,
		0,
		true
	)

	useEffect(() => {
		if (clients) {
			dispatch({ type: 'SET_CLIENTS', payload: clients })
			const totalPages = Math.ceil(clientsLength / itemsPerPage)
			dispatch({ type: 'SET_TOTAL_PAGES', payload: totalPages })
		}
	}, [clients, clientsLength, dispatch])

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value, checked } = e.target as
			| HTMLInputElement
			| (HTMLSelectElement & { checked: boolean })
		const payloadValue = type === 'checkbox' ? checked : value
		dispatch({
			type: 'UPDATE_CLIENT_FIELD',
			payload: { name: name as keyof IClient, value: payloadValue }
		})
	}

	const handleBlur = async (
		e: FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value, checked } = e.target as
			| HTMLInputElement
			| (HTMLSelectElement & { checked: boolean })
		if (name === 'type' && value === '') {
			setErrors((prevErrors) => ({
				...prevErrors,
				[name]: 'Type of client is required'
			}))
			return
		}
		try {
			await clientValidationSchema.validateAt(name, {
				[name]: type === 'checkbox' ? checked : value
			})
			setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }))
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				setErrors((prevErrors) => ({
					...prevErrors,
					[name]: err.message
				}))
			}
		}
	}

	return (
		<ClientContext.Provider
			value={{
				state,
				dispatch,
				handleChange,
				handleBlur,
				errors
			}}
		>
			{children}
		</ClientContext.Provider>
	)
}

export const useClient = () => {
	const context = useContext(ClientContext)
	if (context === undefined) {
		throw new Error('useClient must be used within a ClientProvider')
	}
	return context
}
