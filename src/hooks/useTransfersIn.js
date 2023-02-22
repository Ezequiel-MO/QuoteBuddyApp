import {useDispatch , useSelector} from "react-redux"

import {
    ADD_TRANSFER_IN,
    UPDATE_TRANSFER_IN,
    REMOVE_TRANSFER_LINE,
    ADD_UPDATE_EXTRA_LINES,
    selectTransfersIn
} from "../redux/features/TransfersInSlice"

export const useTransfersIn = () =>{
    const dispatch = useDispatch()
    const transfersIn = useSelector(selectTransfersIn)

    const addTransfersIn = transfersIn =>{
        dispatch(ADD_TRANSFER_IN(transfersIn))
    }

    const updateTransferIn = transfersIn =>{
        dispatch(UPDATE_TRANSFER_IN(transfersIn))
    }

    const removeTransferLine = transfersIn =>{
        dispatch(REMOVE_TRANSFER_LINE(transfersIn))
    }

    const addUpdateExtraLines = transfersIn =>{
        dispatch(ADD_UPDATE_EXTRA_LINES(transfersIn))
    }

    return{
        transfersIn,
        addTransfersIn,
        updateTransferIn,
        removeTransferLine,
        addUpdateExtraLines,
    }

}