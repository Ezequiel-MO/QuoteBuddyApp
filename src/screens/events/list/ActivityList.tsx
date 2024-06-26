import { CityFilter, PriceFilter, TableHeaders } from '../../../ui'
import 'react-toastify/dist/ReactToastify.css'
import { Spinner, LanguageFilter } from '../../../components/atoms'
import { ListHeader } from '../../../components/molecules'
import { ActivityListItem } from './ActivityListItem'
import { listStyles } from 'src/constants/listStyles'
import { useActivity } from '../context/ActivitiesContext'
import { useCurrentProject } from 'src/hooks'
import { useNavigate } from 'react-router-dom'
import { ChangeEvent, useEffect } from 'react'
import { IEvent } from '@interfaces/event'

export const ActivityList = () => {
	const { state, dispatch, handleChange } = useActivity()
	const { currentProject } = useCurrentProject()
	const navigate = useNavigate()

	useEffect(() => {
		dispatch({
			type: 'SET_ACTIVITY',
			payload: {
				name: '',
				city: '',
				textContent: '',
				imageContentUrl: [],
				location: {
					type: 'Point',
					coordinates: []
				},
				pricePerPerson: false,
				price: 0,
				regular: false,
				descriptions: []
			}
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

			{state.activities ? (
				<table className={listStyles.table}>
					<TableHeaders headers="event" />
					{state.activities?.map((activity: IEvent) => (
						<ActivityListItem
							key={activity._id}
							event={activity}
							canBeAddedToProject={currentProject?._id !== undefined}
						/>
					))}
				</table>
			) : (
				<Spinner />
			)}
		</>
	)
}
