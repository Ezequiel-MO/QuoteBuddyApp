import React, {
	createContext,
	useContext,
	useReducer,
	ReactNode,
	Dispatch,
	ChangeEvent,
	useState,
	useEffect
} from 'react'
import { IInvoice } from '@interfaces/invoice'
import * as typescript from './contextInterfaces'
import { useApiFetch } from 'src/hooks/fetchData'
import { IProject } from '@interfaces/project'
import { itemsPerPage } from 'src/constants/pagination'
import { logger } from 'src/helper/debugging/logger'
import { createInvoiceUrl } from './createInvoiceUrl'

type UseApiFetchReturn<T> = {
	data: T
	setData: React.Dispatch<React.SetStateAction<T>>
	dataLength: number
	isLoading: boolean
}

const initialState: typescript.InvoiceState = {
	invoices: [],
	currentInvoice: null,
	totalPages: 1,
	page: 1,
	searchTerm: '',
	typeFilter:''
}

const InvoiceContext = createContext<
	| {
			state: typescript.InvoiceState
			dispatch: Dispatch<typescript.InvoiceAction>
			handleChange: (
				e: ChangeEvent<
					HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
				>
			) => void
			projects: IProject[] | []
			areProjectsLoading: boolean
			setForceRefresh: React.Dispatch<React.SetStateAction<number>>
			isLoading: boolean
			setInvoices: React.Dispatch<React.SetStateAction<IInvoice[]>>
	  }
	| undefined
>(undefined)

const invoiceReducer = (
	state: typescript.InvoiceState,
	action: typescript.InvoiceAction
): typescript.InvoiceState => {
	switch (action.type) {
		case 'SET_INVOICES':
			if (!Array.isArray(action.payload)) {
				console.error('SET_PROJECTS payload is not an array:', action.payload)
				return state
			}
			return { ...state, invoices: action.payload }
		case 'SET_INVOICE':
			return { ...state, currentInvoice: action.payload }
		case 'UPDATE_INVOICE_FIELD':
			return {
				...state,
				currentInvoice: {
					...state.currentInvoice,
					[action.payload.name]: action.payload.value
				}
			}
		case 'INCREMENT_INVOICE_NUMBER':
			const todaysYear = new Date().getFullYear().toString().slice(2)
			let maxInvoiceNumber = '000'
			if (action.payload && action.payload.length > 0) {
				const sortedInvoices = action.payload.sort((a, b) =>
					b.invoiceNumber.localeCompare(a.invoiceNumber)
				)
				const lastInvoiceNumber = sortedInvoices[0].invoiceNumber
				const lastYear = lastInvoiceNumber.slice(0, 2)
				const lastNumber = parseInt(lastInvoiceNumber.slice(2))

				if (lastYear === todaysYear) {
					maxInvoiceNumber = (lastNumber + 1).toString().padStart(3, '0')
				} else {
					maxInvoiceNumber = '001'
				}
			}
			return {
				...state,
				currentInvoice: {
					...state.currentInvoice,
					invoiceNumber: `${todaysYear}${maxInvoiceNumber}`
				}
			}
		case 'ADD_BREAKDOWN_LINE':
			if (state.currentInvoice) {
				const newBreakdownLines = [
					action.payload.newLine,
					...(state.currentInvoice.breakdownLines ?? [])
				]
				return {
					...state,
					currentInvoice: {
						...state.currentInvoice,
						breakdownLines: newBreakdownLines
					}
				}
			}
			return state
		case 'UPDATE_BREAKDOWN_LINE':
			if (state.currentInvoice) {
				const newBreakdownLines = state.currentInvoice.breakdownLines?.map(
					(line) =>
						line.id === action.payload.lineId ? action.payload.newLine : line
				)
				return {
					...state,
					currentInvoice: {
						...state.currentInvoice,
						breakdownLines: newBreakdownLines
					}
				}
			}
			return state
		case 'DELETE_BREAKDOWN_LINE':
			if (state.currentInvoice) {
				const newBreakdownLines = state.currentInvoice.breakdownLines?.filter(
					(line) => line.id !== action.payload.lineId
				)
				return {
					...state,
					currentInvoice: {
						...state.currentInvoice,
						breakdownLines: newBreakdownLines
					}
				}
			}
			return state
		case 'CLEAR_INVOICE':
			return { ...state, currentInvoice: null }
		case 'SET_PAGE':
			return { ...state, page: action.payload }
		case 'SET_TOTAL_PAGES':
			return { ...state, totalPages: action.payload }
		case 'SET_SEARCH_TERM':
			return { ...state, searchTerm: action.payload }
		case 'SET_FILTER':
			const { name, value } = action.payload
			return{
				...state,
				[name]:value
			}
		default:
			const _exhaustiveCheck: never = action
			throw new Error(`Unhandled action type: ${JSON.stringify(action)}`)
	}
}

export const InvoiceProvider: React.FC<{ children: ReactNode }> = ({
	children
}) => {
	const [state, dispatch] = useReducer(invoiceReducer, initialState)

	const [forceRefresh, setForceRefresh] = useState(0)
	const queryParams = {
		page: state.page,
		limit: itemsPerPage,
		searchTerm: state.searchTerm,
		type:state.typeFilter
	}
	const endpoint = createInvoiceUrl('invoices', queryParams)

	const {
		data: invoices,
		setData: setInvoices,
		dataLength: invoicesLength,
		isLoading
	} = useApiFetch(endpoint, forceRefresh) as UseApiFetchReturn<IInvoice[]>

	useEffect(() => {
		if (Array.isArray(invoices)) {
			dispatch({ type: 'SET_INVOICES', payload: invoices })
			const totalPages = Math.ceil(invoicesLength / itemsPerPage)
			dispatch({ type: 'SET_TOTAL_PAGES', payload: totalPages })
		} else if (projects !== undefined) {
			logger.error('Fetched inovoices is not an array:', invoices)
		}
	}, [invoices, invoicesLength, dispatch])

	useEffect(() => {
		dispatch({ type: 'SET_PAGE', payload: 1 })
		setForceRefresh((prev) => prev + 1)
	}, [state.searchTerm])

	const { data: projects, isLoading: areProjectsLoading } =
		useApiFetch<IProject[]>('projects')

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		let value: string | number | boolean
		const target = e.target as
			| HTMLInputElement
			| HTMLSelectElement
			| HTMLTextAreaElement
		if (target instanceof HTMLInputElement && target.type === 'checkbox') {
			value = target.checked
		} else {
			value = target.value
		}
		const name = target.name as keyof IInvoice
		dispatch({
			type: 'UPDATE_INVOICE_FIELD',
			payload: { name, value }
		})
	}

	return (
		<InvoiceContext.Provider
			value={{
				state,
				dispatch,
				handleChange,
				projects,
				areProjectsLoading,
				setForceRefresh,
				isLoading,
				setInvoices
			}}
		>
			{children}
		</InvoiceContext.Provider>
	)
}

export const useInvoice = () => {
	const context = useContext(InvoiceContext)
	if (context === undefined) {
		throw new Error('useInvoice must be used within a InvoiceProvider')
	}
	return context
}
