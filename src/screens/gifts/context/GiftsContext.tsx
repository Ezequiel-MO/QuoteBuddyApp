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
import { giftValidationSchema } from '../specs/GiftValidation'
import { itemsPerPage } from 'src/constants/pagination'
import { useApiFetch } from 'src/hooks/fetchData'
import createGiftUrl from '../specs/createGiftUrl'
import { IGift } from '@interfaces/gift'
import { logger } from 'src/helper/debugging/logger'

const GiftContext = createContext<
	| {
			state: typescript.GiftState
			dispatch: Dispatch<typescript.GiftAction>
			handleChange: (
				e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
			) => void
			handleBlur: (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => void
			errors: Record<string, string>
	  }
	| undefined
>(undefined)

const giftReducer = (
	state: typescript.GiftState,
	action: typescript.GiftAction
): typescript.GiftState => {
	switch (action.type) {
		case 'SET_GIFTS':
			if (!Array.isArray(action.payload)) {
				console.error('SET_GIFTS payload is not an array:', action.payload)
				return state
			}
			return { ...state, gifts: action.payload }
		case 'SET_GIFT':
			return { ...state, currentGift: action.payload }
		case 'ADD_GIFT':
			if (!Array.isArray(state.gifts)) {
				console.error('Gifts is not an array:', state.gifts)
				return state
			}
			return {
				...state,
				gifts: [action.payload, ...state.gifts]
			}
		case 'UPDATE_GIFT_FIELD':
			if (!state.currentGift) return state
			return {
				...state,
				currentGift: {
					...state.currentGift,
					[action.payload.name]: action.payload.value
				}
			}
		case 'UPDATE_GIFT_TEXTCONTENT': {
			if (!state.currentGift) return state
			const updatedGift = {
				...state.currentGift,
				textContent: action.payload
			}
			return { ...state, currentGift: updatedGift }
		}
		case 'TOGGLE_UPDATE': {
			return { ...state, update: action.payload }
		}
		case 'SET_IMAGES_MODAL_OPEN': {
			return { ...state, imagesModal: action.payload }
		}
		case 'SET_TOTAL_PAGES':
			return { ...state, totalPages: action.payload }
		case 'SET_PAGE':
			return { ...state, page: action.payload }
		case 'SET_SEARCH_TERM':
			return { ...state, searchTerm: action.payload }
		case 'APPEND_TO_ARRAY_FIELD':
			if (!state.currentGift) return state

			const targetField = state.currentGift[action.payload.name]
			if (!Array.isArray(targetField)) {
				console.error(`Field ${action.payload.name} is not an array`)
				return state
			}

			return {
				...state,
				currentGift: {
					...state.currentGift,
					[action.payload.name]: [
						...(targetField || []),
						...action.payload.value
					]
				}
			}
		default:
			return state
	}
}

export const GiftProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [state, dispatch] = useReducer(giftReducer, initialState)
	const [errors, setErrors] = useState<Record<string, string>>({})

	const queryParams = {
		page: state.page,
		limit: itemsPerPage,
		price: state.currentGift?.price,
		searchTerm: state.searchTerm
	}

	const endpoint = createGiftUrl('gifts', queryParams)

	const { data: gifts, dataLength: giftsLength } = useApiFetch<IGift[]>(
		endpoint,
		0,
		true
	)

	useEffect(() => {
		if (Array.isArray(gifts)) {
			dispatch({ type: 'SET_GIFTS', payload: gifts })
			const totalPages = Math.ceil(giftsLength / itemsPerPage)
			dispatch({ type: 'SET_TOTAL_PAGES', payload: totalPages })
		} else if (gifts !== undefined) {
			logger.error('Fetched gifts is not an array:', gifts)
		}
	}, [gifts, giftsLength, dispatch])

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value, checked } = e.target as
			| HTMLInputElement
			| (HTMLSelectElement & { checked: boolean })
		const payloadValue = type === 'checkbox' ? checked : value
		dispatch({
			type: 'UPDATE_GIFT_FIELD',
			payload: { name: name as keyof IGift, value: payloadValue }
		})
	}

	const handleBlur = async (
		e: FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value, checked } = e.target as
			| HTMLInputElement
			| (HTMLSelectElement & { checked: boolean })
		try {
			await giftValidationSchema.validateAt(name, {
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
		<GiftContext.Provider
			value={{
				state,
				dispatch,
				handleChange,
				handleBlur,
				errors
			}}
		>
			{children}
		</GiftContext.Provider>
	)
}

export const useGift = () => {
	const context = useContext(GiftContext)
	if (context === undefined) {
		throw new Error('useGift must be used within a GiftProvider')
	}
	return context
}
