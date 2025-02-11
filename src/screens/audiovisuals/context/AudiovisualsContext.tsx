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
import { audiovisualValidationSchema } from '../specs/AudiovisualValidation'
import { itemsPerPage } from 'src/constants/pagination'
import { useApiFetch } from 'src/hooks/fetchData'
import { logger } from 'src/helper/debugging/logger'
import createAudiovisualUrl from '../specs/createAudiovisualUrl'
import { IAudiovisual } from '@interfaces/audiovisual'

const AudiovisualsContext = createContext<
	| {
			state: typescript.AudiovisualState
			dispatch: Dispatch<typescript.AudiovisualAction>
			handleChange: (
				e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
			) => void
			handleBlur: (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => void
			errors: Record<string, string>
			setForceRefresh: React.Dispatch<React.SetStateAction<number>>
			isLoading: boolean
	  }
	| undefined
>(undefined)

const audiovisualReducer = (
	state: typescript.AudiovisualState,
	action: typescript.AudiovisualAction
): typescript.AudiovisualState => {
	switch (action.type) {
		case 'SET_AUDIOVISUALS':
			if (!Array.isArray(action.payload)) {
				console.error(
					'SET_AUDIOVISUALS payload is not an array:',
					action.payload
				)
				return state
			}
			return { ...state, audiovisuals: action.payload }
		case 'SET_AUDIOVISUAL': {
			const updated = { ...action.payload }
			if (Array.isArray(updated.equipmentList)) {
				updated.equipmentList = updated.equipmentList.map((eq) => {
					return {
						// If eq already has id, keep it, else use eq._id or a newly generated ID
						id: eq.id || Date.now().toString(),
						...eq
					}
				})
			}
			return { ...state, currentAudiovisual: updated }
		}

		case 'ADD_AUDIOVISUAL':
			if (!Array.isArray(state.audiovisuals)) {
				console.error('Audiovisuals is not an array:', state.audiovisuals)
				return state
			}
			return {
				...state,
				audiovisuals: [...state.audiovisuals, action.payload]
			}
		case 'UPDATE_AUDIOVISUAL_FIELD':
			if (!state.currentAudiovisual) return state
			return {
				...state,
				currentAudiovisual: {
					...state.currentAudiovisual,
					[action.payload.name]: action.payload.value
				}
			}
		case 'UPDATE_AUDIOVISUAL_TEXTCONTENT': {
			if (!state.currentAudiovisual) return state
			const updatedAudiovisual = {
				...state.currentAudiovisual,
				textContent: action.payload
			}
			return { ...state, currentAudiovisual: updatedAudiovisual }
		}
		case 'UPDATE_AUDIOVISUAL_COORDINATE': {
			if (!state.currentAudiovisual || !state.currentAudiovisual.location)
				return state
			const updatedCoordinates = [
				...(state.currentAudiovisual.location.coordinates || [])
			]
			if (action.payload.name === 'longitude') {
				updatedCoordinates[0] = action.payload.value
			} else if (action.payload.name === 'latitude') {
				updatedCoordinates[1] = action.payload.value
			}
			return {
				...state,
				currentAudiovisual: {
					...state.currentAudiovisual,
					location: {
						...state.currentAudiovisual.location,
						coordinates: updatedCoordinates
					}
				}
			}
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
		case 'UPDATE_EQUIPMENT_ITEM_FIELD': {
			const { index, field, value } = action.payload

			// Ensure we have a currentAudiovisual and an equipmentList array
			if (
				!state.currentAudiovisual ||
				!Array.isArray(state.currentAudiovisual.equipmentList)
			) {
				return state
			}

			// 1. Copy the existing equipmentList
			const updatedEquipmentList = [...state.currentAudiovisual.equipmentList]

			// 2. Copy the specific item at `index` (defensive copying)
			updatedEquipmentList[index] = {
				...updatedEquipmentList[index],
				[field]: value
			}

			// 3. Return new state with updated list
			return {
				...state,
				currentAudiovisual: {
					...state.currentAudiovisual,
					equipmentList: updatedEquipmentList
				}
			}
		}
		case 'REMOVE_EQUIPMENT_ITEM': {
			const { index } = action.payload

			if (
				!state.currentAudiovisual ||
				!Array.isArray(state.currentAudiovisual.equipmentList)
			) {
				return state
			}

			// 1. Copy the equipmentList
			const updatedEquipmentList = [...state.currentAudiovisual.equipmentList]

			// 2. Remove the item at `index`
			updatedEquipmentList.splice(index, 1)

			// 3. Return new state
			return {
				...state,
				currentAudiovisual: {
					...state.currentAudiovisual,
					equipmentList: updatedEquipmentList
				}
			}
		}

		default:
			return state
	}
}

export const AudiovisualProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [state, dispatch] = useReducer(audiovisualReducer, initialState)
	const [errors, setErrors] = useState<Record<string, string>>({})
	const [forceRefresh, setForceRefresh] = useState(0)

	const queryParams = {
		page: state.page,
		limit: itemsPerPage,
		city: state.currentAudiovisual?.city,
		searchTerm: state.searchTerm
	}

	const endpoint = createAudiovisualUrl('audiovisuals', queryParams)

	const {
		data: audiovisuals,
		dataLength: audiovisualsLength,
		isLoading
	} = useApiFetch<IAudiovisual[]>(endpoint, forceRefresh, true)

	useEffect(() => {
		if (Array.isArray(audiovisuals)) {
			dispatch({ type: 'SET_AUDIOVISUALS', payload: audiovisuals })
			const totalPages = Math.ceil(audiovisualsLength / itemsPerPage)
			dispatch({ type: 'SET_TOTAL_PAGES', payload: totalPages })
		} else if (audiovisuals !== undefined) {
			logger.error('Fetched audiovisuals is not an array:', audiovisuals)
		}
	}, [audiovisuals, audiovisualsLength, dispatch])

	useEffect(() => {
		state.page = 1
	}, [state.searchTerm])

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value, checked } = e.target as
			| HTMLInputElement
			| (HTMLSelectElement & { checked: boolean })
		const payloadValue =
			type === 'checkbox'
				? checked
				: type === 'number'
				? parseInt(value, 10) || 0
				: value

		dispatch({
			type: 'UPDATE_AUDIOVISUAL_FIELD',
			payload: { name: name as keyof IAudiovisual, value: payloadValue }
		})
	}

	const handleBlur = async (
		e: FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value, checked } = e.target as
			| HTMLInputElement
			| (HTMLSelectElement & { checked: boolean })
		try {
			await audiovisualValidationSchema.validateAt(name, {
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
		<AudiovisualsContext.Provider
			value={{
				state,
				dispatch,
				handleChange,
				handleBlur,
				errors,
				setForceRefresh,
				isLoading
			}}
		>
			{children}
		</AudiovisualsContext.Provider>
	)
}

export const useAudiovisual = () => {
	const context = useContext(AudiovisualsContext)
	if (context === undefined) {
		throw new Error('useAudiovisual must be used within an AudiovisualProvider')
	}
	return context
}
