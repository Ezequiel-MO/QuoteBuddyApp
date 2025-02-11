import { FC, ChangeEvent } from 'react'
import { ListHeader } from '../../../components/molecules'
import { useOtherOperational } from '../context/OtherOperationalsContext'
import { useCreateNewItem } from 'src/hooks/forms/useCreateNewItem'
import initialState from '../context/initialState'
import { usePagination } from 'src/hooks/lists/usePagination'
import { ListTable } from '@components/molecules/table/ListTable'
import { OtherOperationalListItem } from './OtherOperationalListItem'
import { CityFilter } from '@components/atoms'

export const OtherOperationalList: FC = () => {
	const { state, dispatch, handleChange, setForceRefresh, isLoading } =
		useOtherOperational()

	const { createNewItem } = useCreateNewItem({
		dispatch,
		initialState: initialState.currentOtherOperational,
		context: 'other_operational'
	})
	const { changePage } = usePagination({ state, dispatch })

	return (
		<>
			<ListHeader
				title="Other Operationals"
				handleClick={createNewItem}
				searchItem={state.searchTerm}
				filterList={(e: ChangeEvent<HTMLInputElement>) =>
					dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })
				}
				page={state.page}
				totalPages={state.totalPages ?? 1}
				onChangePage={(direction) => {
					changePage(direction)
					setForceRefresh((prev) => prev + 1)
				}}
			>
				<CityFilter
					city={state.currentOtherOperational?.city || ''}
					setCity={(city: string) => {
						handleChange({
							target: { name: 'city', value: city }
						} as ChangeEvent<HTMLInputElement>)
					}}
				/>
			</ListHeader>

			<hr />
			<ListTable
				items={state.otherOperationals || []}
				headers="otherOperational"
				ListItemComponent={OtherOperationalListItem}
				isLoading={isLoading}
				searchTerm={state.searchTerm}
				canBeAddedToProject={false}
			/>
		</>
	)
}
