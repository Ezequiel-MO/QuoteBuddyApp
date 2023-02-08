import { useDispatch, useSelector } from 'react-redux'

import {
	ADD_TRANSFER_OUT,
	UPDATE_TRANSFER_LINE,
	REMOVE_TRANSFER_LINE,
	ADD_UPDATE_EXTRA_LINES,
	selectTransfersOut
} from '../redux/features/TransfersOutSlice'

export const useTransfers = () => {
	const dispatch = useDispatch()
	const transfersOut = useSelector(selectTransfersOut)

	const addTransfersOut = (transferOut) => {
		dispatch(ADD_TRANSFER_OUT(transferOut))
	}

	const updateTransferLine = (transferOut) => {
		dispatch(UPDATE_TRANSFER_LINE(transferOut))
	}

	const removeTransferLine = (transferLine) => {
		dispatch(REMOVE_TRANSFER_LINE(transferLine))
	}

	const addUpdateExtraLines = (transferOut) => {
		dispatch(ADD_UPDATE_EXTRA_LINES(transferOut))
	}

	return {
		transfersOut,
		addTransfersOut,
		updateTransferLine,
		removeTransferLine,
		addUpdateExtraLines
	}
}
