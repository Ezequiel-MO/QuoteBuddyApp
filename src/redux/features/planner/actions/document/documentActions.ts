import { useAppDispatch } from '@hooks/redux/redux'
import { DELETE_PLANNING_DOCUMENT } from '../../plannerSlice'

export const usePlanningDocumentActions = () => {
	const dispatch = useAppDispatch()

	const deletePlanningDocument = (
		documentId: string,
		planningItemId: string,
		planningOptionId?: string
	) => {
		dispatch(
			DELETE_PLANNING_DOCUMENT({
				documentId,
				planningItemId,
				planningOptionId
			})
		)
	}

	return {
		deletePlanningDocument
	}
}

export default usePlanningDocumentActions
