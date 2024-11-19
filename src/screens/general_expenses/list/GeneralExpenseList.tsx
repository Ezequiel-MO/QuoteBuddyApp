import { useCreateNewItem } from 'src/hooks/forms/useCreateNewItem'
import { useGeneralExpense } from '../context/GeneralExpensesContext'
import initialState from '../context/initialState'
import { usePagination } from 'src/hooks/lists/usePagination'
import { ListHeader } from '@components/molecules'
import { ChangeEvent } from 'react'
import { ListTable } from '@components/molecules/table/ListTable'
import { GeneralExpenseListItem } from './GeneralExpenseListItem'

export const GeneralExpenseList = () => {
	const { dispatch, state, setForceRefresh, isLoading } = useGeneralExpense()

	const { createNewItem } = useCreateNewItem({
		dispatch,
		initialState: initialState.currentExpense,
		context: 'expense'
	})
	const { changePage } = usePagination({ state, dispatch })

	return (
		<>
			<ListHeader
				title="Expenses"
				handleClick={createNewItem}
				searchItem={state.searchTerm}
				filterList={(e: ChangeEvent<HTMLInputElement>) =>
					dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })
				}
				page={state.page ?? 1}
				totalPages={state.totalPages ?? 1}
				onChangePage={(direction) => {
					changePage(direction)
					setForceRefresh((prev) => prev + 1)
				}}
			/>

			<hr />
			<ListTable
				items={state.expenses || []}
				headers="expense"
				ListItemComponent={GeneralExpenseListItem}
				isLoading={isLoading || state.expenses === undefined}
				searchTerm={state.searchTerm}
				canBeAddedToProject={false}
			/>
		</>
	)
}
