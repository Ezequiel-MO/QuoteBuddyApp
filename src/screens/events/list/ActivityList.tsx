import { CityFilter, PriceFilter } from '../../../ui'
import 'react-toastify/dist/ReactToastify.css'
import { ListHeader } from '../../../components/molecules'
import { ActivityListItem } from './ActivityListItem'
import { useActivity } from '../context/ActivitiesContext'
import { useNavigate } from 'react-router-dom'
import { ChangeEvent, useEffect } from 'react'
import { ListTable } from '@components/molecules/table/ListTable'
import initialState from '../context/initialState'

export const ActivityList = () => {
	const { state, dispatch, handleChange } = useActivity()
	const navigate = useNavigate()

	useEffect(() => {
		dispatch({
			type: 'SET_ACTIVITY',
			payload: { ...initialState.currentActivity }
		})
	}, [dispatch])

	const handleCreateNewActivity = () => {
		dispatch({
			type: 'TOGGLE_UPDATE',
			payload: false
		})
		navigate('/app/event/specs')
	}

	const handleChangePage = (direction: 'prev' | 'next') => {
		const newPage =
			direction === 'prev'
				? Math.max(1, state.page - 1)
				: Math.min(state.totalPages, state.page + 1)
		dispatch({ type: 'SET_PAGE', payload: newPage })
	}

	return (
		<>
			<ListHeader
				title="Activities"
				handleClick={handleCreateNewActivity}
				searchItem={state.searchTerm}
				filterList={(e: ChangeEvent<HTMLInputElement>) =>
					dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })
				}
				page={state.page}
				totalPages={state.totalPages ?? 1}
				onChangePage={handleChangePage}
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
