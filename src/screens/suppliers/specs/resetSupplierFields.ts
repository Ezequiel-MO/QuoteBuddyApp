import { Dispatch } from 'react'
import { resetEntityFilters } from 'src/helper/forms/resetEntityFilters'
import { SupplierAction } from '../context/contextinterfaces'
import { ISupplier } from '@interfaces/supplier'

export const resetSupplierFilters = (
	dispatch: Dispatch<SupplierAction>,
	fields: Partial<Record<keyof ISupplier, any>>
) => {
	resetEntityFilters<ISupplier>(dispatch as Dispatch<any>, 'supplier', fields)
}
