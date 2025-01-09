import { useAppDispatch } from 'src/hooks/redux/redux'
import { IAddIntro } from '../../types'
import * as thunks from './thunks'

export const useGeneralActions = () => {
	const dispatch = useAppDispatch()

	const addIntro = (introEvent: IAddIntro) => {
		dispatch(thunks.addIntroThunk(introEvent))
	}

	return {
		addIntro
	}
}
