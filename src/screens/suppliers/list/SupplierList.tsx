import { ChangeEvent, FC } from 'react'
import { useSupplier } from '../context/SupplierContext'
import { useCreateNewItem } from 'src/hooks/forms/useCreateNewItem'
import { usePagination } from 'src/hooks/lists/usePagination'
import { ListHeader } from '@components/molecules'
import { CityFilter } from '@components/atoms'
import { ListTable } from '@components/molecules/table/ListTable'
import { SupplierListItem } from './SupplierListItem'

export const SupplierList: FC = () => {
	const { state, dispatch, handleChange, setForceRefresh, isLoading } =
		useSupplier()
	const { createNewItem } = useCreateNewItem({
		dispatch,
		initialState: state.currentSupplier,
		context: 'supplier'
	})
	const { changePage } = usePagination({ state, dispatch })

	return (
		<>
			<ListHeader
				title="Suppliers"
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
			>
				<CityFilter
					city={state.currentSupplier?.city || ''}
					setCity={(city: string) => {
						handleChange({
							target: { name: 'city', value: city }
						} as ChangeEvent<HTMLInputElement>)
					}}
				/>
			</ListHeader>
			<hr />
			<ListTable
				items={state.suppliers || []}
				headers="supplier"
				ListItemComponent={SupplierListItem}
				isLoading={isLoading || state.suppliers === undefined}
				searchTerm={state.searchTerm}
			/>
		</>
	)
}
