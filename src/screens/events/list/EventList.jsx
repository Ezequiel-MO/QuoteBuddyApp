import EventListItem from './EventListItem'
import { CityFilter, PriceFilter, TableHeaders } from '../../../ui'
import 'react-toastify/dist/ReactToastify.css'
import { Spinner } from '../../../components/atoms'
import { ListHeader } from '../../../components/molecules'
import { useEventList } from './useEventList'
import { useLocation } from 'react-router-dom'

export const EventList = () => {
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
	} = useEventList()

	return (
		<>
			<ListHeader
				title="Events"
				handleClick={handleClick}
				searchItem={searchItem}
				filterList={filterList}
				page={page}
				totalPages={totalPages}
				onChangePage={onChangePage}
			>
				<CityFilter setCity={setCity} city={city} />
				<PriceFilter setPrice={setPrice} />
			</ListHeader>

			<hr />

			{isLoading ? (
				<Spinner />
			) : (
				<table className="w-full p-5">
					<TableHeaders headers="event" />
					{foundEvents?.map((event) => (
						<EventListItem
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
