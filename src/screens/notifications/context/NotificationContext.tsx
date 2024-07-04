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
import createNotificationUrl from '../specs/createNotificationUrl'
import { INotification } from '@interfaces/notification'
import { notificationValidationSchema } from '../specs/NotificationValidation'

const NotificationContext = createContext<
	| {
			state: typescript.NotificationState
			dispatch: Dispatch<typescript.NotificationAction>
			handleChange: (
				e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
			) => void
			handleBlur: (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => void
			errors: Record<string, string>
	  }
	| undefined
>(undefined)

const notificationReducer = (
	state: typescript.NotificationState,
	action: typescript.NotificationAction
): typescript.NotificationState => {
	switch (action.type) {
		case 'SET_NOTIFICATIONS':
			if (!Array.isArray(action.payload)) {
				console.error(
					'SET_NOTIFICATIONS payload is not an array:',
					action.payload
				)
				return state
			}
			return { ...state, notifications: action.payload }
		case 'SET_NOTIFICATION':
			return { ...state, currentNotification: action.payload }
		case 'ADD_NOTIFICATION':
			if (!Array.isArray(state.notifications)) {
				console.error('Freelancers is not an array:', state.notifications)
				return state
			}
			return {
				...state,
				notifications: [...state.notifications, action.payload]
			}
		case 'UPDATE_NOTIFICATION_FIELD':
			if (!state.currentNotification) return state
			return {
				...state,
				currentNotification: {
					...state.currentNotification,
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

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [state, dispatch] = useReducer(notificationReducer, initialState)
	const [errors, setErrors] = useState<Record<string, string>>({})

	const queryParams = {
		page: state.page,
		limit: itemsPerPage,
		searchTerm: state.searchTerm
	}

	const endpoint = createNotificationUrl('notifications', queryParams)

	const { data: notifications, dataLength: notificationsLength } = useApiFetch<
		INotification[]
	>(endpoint, 0, true)

	useEffect(() => {
		if (notifications) {
			dispatch({ type: 'SET_NOTIFICATIONS', payload: notifications })
			const totalPages = Math.ceil(notificationsLength / itemsPerPage)
			dispatch({ type: 'SET_TOTAL_PAGES', payload: totalPages })
		}
	}, [notifications, notificationsLength, dispatch])

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value, checked } = e.target as
			| HTMLInputElement
			| (HTMLSelectElement & { checked: boolean })
		const payloadValue = type === 'checkbox' ? checked : value
		dispatch({
			type: 'UPDATE_NOTIFICATION_FIELD',
			payload: { name: name as keyof INotification, value: payloadValue }
		})
	}

	const handleBlur = async (
		e: FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value, checked } = e.target as
			| HTMLInputElement
			| (HTMLSelectElement & { checked: boolean })
		try {
			await notificationValidationSchema.validateAt(name, {
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
		<NotificationContext.Provider
			value={{
				state,
				dispatch,
				handleChange,
				handleBlur,
				errors
			}}
		>
			{children}
		</NotificationContext.Provider>
	)
}

export const useNotification = () => {
	const context = useContext(NotificationContext)
	if (context === undefined) {
		throw new Error(
			'useNotification must be used within a NotificationProvider'
		)
	}
	return context
}
