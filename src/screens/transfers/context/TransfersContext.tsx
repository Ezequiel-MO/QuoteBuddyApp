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
import { ITransfer } from '@interfaces/transfer'
import { transferValidationSchema } from '../specs/TransferValidation'
import createTransferUrl from '../specs/createTransferUrl'
import { vehiclesTypes } from 'src/constants/vehicleTypes'

const TransferContext = createContext<
	| {
			state: typescript.TransferState
			dispatch: Dispatch<typescript.TransferAction>
			handleChange: (
				e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
			) => void
			handleBlur: (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => void
			errors: Record<string, string>
	  }
	| undefined
>(undefined)

const transferReducer = (
	state: typescript.TransferState,
	action: typescript.TransferAction
): typescript.TransferState => {
	switch (action.type) {
		case 'SET_TRANSFERS':
			return { ...state, transfers: action.payload }
		case 'SET_TRANSFER':
			return { ...state, currentTransfer: action.payload }
		case 'UPDATE_TRANSFER_FIELD':
			if (!state.currentTransfer) return state
			return {
				...state,
				currentTransfer: {
					...state.currentTransfer,
					[action.payload.name]: action.payload.value
				}
			}
		case 'TOGGLE_UPDATE': {
			return { ...state, update: action.payload }
		}
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

export const TransferProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [state, dispatch] = useReducer(transferReducer, initialState)
	const [errors, setErrors] = useState<Record<string, string>>({})

	const queryParams = {
		page: state.page,
		limit: itemsPerPage,
		city: state.currentTransfer?.city,
		company: state.currentTransfer?.company,
		vehicleCapacity:
			state.currentTransfer?.vehicleCapacity === 0
				? undefined
				: state.currentTransfer?.vehicleCapacity,
		searchTerm: state.searchTerm
	}

	const endpoint = createTransferUrl('transfers', queryParams)

	const { data: transfers, dataLength: transfersLength } = useApiFetch<
		ITransfer[]
	>(endpoint, 0, true)

	useEffect(() => {
		if (transfers) {
			dispatch({ type: 'SET_TRANSFERS', payload: transfers })
			const totalPages = Math.ceil(transfersLength / itemsPerPage)
			dispatch({ type: 'SET_TOTAL_PAGES', payload: totalPages })
		}
	}, [transfers, transfersLength, dispatch])

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value, checked } = e.target as
			| HTMLInputElement
			| (HTMLSelectElement & { checked: boolean })
		const payloadValue = type === 'checkbox' ? checked : value
		dispatch({
			type: 'UPDATE_TRANSFER_FIELD',
			payload: { name: name as keyof ITransfer, value: payloadValue }
		})
	}

	const handleBlur = async (
		e: FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value, checked } = e.target as
			| HTMLInputElement
			| (HTMLSelectElement & { checked: boolean })
		try {
			await transferValidationSchema.validateAt(name, {
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
		<TransferContext.Provider
			value={{
				state,
				dispatch,
				handleChange,
				handleBlur,
				errors
			}}
		>
			{children}
		</TransferContext.Provider>
	)
}

export const useTransfer = () => {
	const context = useContext(TransferContext)
	if (context === undefined) {
		throw new Error('useTransfer must be used within a TransferProvider')
	}
	return context
}
