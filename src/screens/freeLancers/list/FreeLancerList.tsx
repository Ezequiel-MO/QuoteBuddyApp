import { ChangeEvent } from 'react'
import { FreeLancerListItem } from '..'
import { CityFilter } from '../../../components/atoms'
import { ListHeader } from '../../../components/molecules'
import { useFreelancer } from '../context/FreelancerContext'
import { useCreateNewItem } from 'src/hooks/forms/useCreateNewItem'
import initialState from '../context/initialState'
import { usePagination } from 'src/hooks/lists/usePagination'
import { ListTable } from '@components/molecules/table/ListTable'

export const FreeLancerList = () => {
	const { state, dispatch, handleChange } = useFreelancer()
	const { createNewItem } = useCreateNewItem({
		dispatch,
		initialState: initialState.currentFreelancer,
		context: 'freelancer'
	})
	const { changePage } = usePagination({ state, dispatch })

	return (
		<>
			<ListHeader
				title="Freelancers"
				handleClick={createNewItem}
				filterList={(e: ChangeEvent<HTMLInputElement>) =>
					dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })
				}
				page={state.page}
				totalPages={state.totalPages ?? 1}
				onChangePage={changePage}
			>
				<CityFilter
					city={state.currentFreelancer?.city || ''}
					setCity={(city: string) => {
						handleChange({
							target: { name: 'city', value: city }
						} as ChangeEvent<HTMLInputElement>)
					}}
				/>
			</ListHeader>

			<hr />
			<ListTable
				items={state.freelancers || []}
				headers="freelancer"
				ListItemComponent={FreeLancerListItem}
				isLoading={
					state.freelancers === undefined || state.freelancers?.length === 0
				}
			/>
		</>
	)
}
