import { Dispatch } from 'react'
import { resetEntityFilters } from 'src/helper/forms/resetEntityFilters'
import { GeneralExpensesAction } from '../context/contextinterfaces'
import { IGeneralExpense } from '@interfaces/generalExpense'

export const resetGeneralExpenseFilters = (
	dispatch: Dispatch<GeneralExpensesAction>,
	fields: Partial<Record<keyof IGeneralExpense, any>>
) => {
	resetEntityFilters<IGeneralExpense>(
		dispatch as Dispatch<any>,
		'expense',
		fields
	)
}
