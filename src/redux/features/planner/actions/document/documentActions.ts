import { useAppDispatch } from '@hooks/redux/redux'
import {
	DELETE_PLANNING_DOCUMENT,
	ADD_DOCUMENTS_TO_PLANNING_OPTION
} from '../../plannerSlice'
import { IPlanningDocument } from '@interfaces/planner'

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

	const addDocumentsToPlanningOption = (
		planningItemId: string,
		planningOptionId: string,
		documents: IPlanningDocument[]
	) => {
		dispatch(
			ADD_DOCUMENTS_TO_PLANNING_OPTION({
				planningItemId,
				planningOptionId,
				documents
			})
		)
	}

	return {
		deletePlanningDocument,
		addDocumentsToPlanningOption
	}
}

export default usePlanningDocumentActions
