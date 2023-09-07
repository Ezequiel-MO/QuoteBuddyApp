import { CityFilter, PriceFilter, TableHeaders } from '../../../ui'
import 'react-toastify/dist/ReactToastify.css'
import { Spinner } from '../../../components/atoms'
import { ListHeader } from '../../../components/molecules'
import { useLocation } from 'react-router-dom'
import { useActivityList } from './useActivityList'
import { ActivityListItem } from './ActivityListItem'

export const ActivityList = () => {
	const location = useLocation()
	const {
		city,
		setCity,
		setPrice,
		events,
		setEvents,
		foundEvents,
		searchItem,
		filterList,
		handleClick,
		page,
		totalPages,
		onChangePage,
		isLoading
	} = useActivityList()

	return (
		<>
			<ListHeader
				title="Activities"
				handleClick={handleClick}
				searchItem={searchItem}
				filterList={filterList}
				page={page}
				totalPages={totalPages}
				onChangePage={onChangePage}
			>
				<CityFilter setCity={setCity} city={city} />
				<PriceFilter
					setPrice={setPrice}
					price={undefined}
					otherPrices={undefined}
				/>
			</ListHeader>

			<hr />

			{isLoading ? (
				<Spinner />
			) : (
				<table className="w-full p-5">
					<TableHeaders headers="event" />
					{foundEvents?.map((event) => (
						<ActivityListItem
							key={event._id}
							event={event}
							events={events}
							setEvents={setEvents}
							canBeAddedToProject={location.state}
						/>
					))}
				</table>
			)}
		</>
	)
}
