import { Dispatch } from 'react'
import { resetEntityFilters } from 'src/helper/forms/resetEntityFilters'
import { TransferAction } from '../context/contextinterfaces'
import { ITransfer } from '@interfaces/transfer'

export const resetTransferFilters = (
	dispatch: Dispatch<TransferAction>,
	fields: Partial<Record<keyof ITransfer, any>>
) => {
	resetEntityFilters<ITransfer>(dispatch as Dispatch<any>, 'transfer', fields)
}
