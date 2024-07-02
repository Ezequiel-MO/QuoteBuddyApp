import { ChangeEvent } from 'react'
import { CityFilter, PriceFilter } from '../../../ui'
import { ListHeader } from '../../../components/molecules'
import { ActivityListItem } from './ActivityListItem'
import { useActivity } from '../context/ActivitiesContext'
import { ListTable } from '@components/molecules/table/ListTable'
import initialState from '../context/initialState'
import { useCreateNewItem } from 'src/hooks/forms/useCreateNewItem'
import { usePagination } from 'src/hooks/lists/usePagination'

export const ActivityList = () => {
	const { state, dispatch, handleChange } = useActivity()
	const { createNewItem } = useCreateNewItem({
		dispatch,
		initialState: initialState.currentActivity,
		context: 'activity'
	})
	const { changePage } = usePagination({ state, dispatch })

	return (
		<>
			<ListHeader
				title="Activities"
				handleClick={createNewItem}
				searchItem={state.searchTerm}
				filterList={(e: ChangeEvent<HTMLInputElement>) =>
					dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })
				}
				page={state.page}
				totalPages={state.totalPages ?? 1}
				onChangePage={changePage}
			>
				<CityFilter
					city={state.currentActivity?.city || ''}
					setCity={(city: string) => {
						handleChange({
							target: { name: 'city', value: city }
						} as ChangeEvent<HTMLInputElement>)
					}}
				/>
				<PriceFilter
					setPrice={handleChange}
					price={state.currentActivity?.price || 0}
					otherPrices={undefined}
				/>
				{/* <div className="">
					<LanguageFilter language={language} setLanguage={setLanguage} />
				</div> */}
			</ListHeader>

			<hr />

			<ListTable
				items={state.activities || []}
				headers="event"
				ListItemComponent={ActivityListItem}
				isLoading={
					state.activities === undefined || state.activities?.length === 0
				}
			/>
		</>
	)
}
