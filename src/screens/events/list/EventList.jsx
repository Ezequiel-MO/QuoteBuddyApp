import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import EventListItem from './EventListItem'
import { CityFilter, PriceFilter, TableHeaders } from '../../../ui'
import 'react-toastify/dist/ReactToastify.css'
import {
	useCurrentProject,
	useGetEvents,
	useGetDocumentLength,
	usePagination
} from '../../../hooks'
import { Spinner } from '../../../components/atoms'
import { ListHeader } from '../../../components/molecules'

const EventList = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const [event] = useState({})
	const [totalPages, setTotalPages] = useState(1)
	const { page, setPage, onChangePage } = usePagination(1, totalPages)
	const { currentProject } = useCurrentProject()
	const { groupLocation } = currentProject
	const [city, setCity] = useState(groupLocation || '')
	const [searchItem, setSearchItem] = useState('')
	const [price, setPrice] = useState(0)
	const filterOptions = ['city', 'price[lte]']
	const valuesRute = [
		{ name: 'city', value: city === 'none' ? undefined : city },
		{ name: 'price[lte]', value: price === 'none' ? undefined : price }
	]
	const { events, setEvents, isLoading } = useGetEvents(city, price, page)
	const { results } = useGetDocumentLength('events', valuesRute, filterOptions)
	const [foundEvents, setFoundEvents] = useState([])

	useEffect(() => {
		setFoundEvents(events)
		setTotalPages(results)
	}, [events, results])

	const addEventToProject = (event) => {
		navigate(`/app/project/schedule/${event._id}`, {
			state: {
				event,
				dayOfEvent: location.state.dayOfEvent,
				timeOfEvent: location.state.timeOfEvent
			}
		})
	}

	const filterList = (e) => {
		setSearchItem(e.target.value)
		const result = events.filter((data) =>
			data.name.toLowerCase().includes(e.target.value.toLowerCase())
		)
		setFoundEvents(result)
		if (searchItem === '') {
			setFoundEvents(events)
		}
	}

	const handleClick = () => navigate('/app/event/specs', { state: { event } })

	useEffect(() => {
		setPage(1)
	}, [city, price])

	const eventList = foundEvents?.map((event) => (
		<EventListItem
			key={event._id}
			event={event}
			events={events}
			setEvents={setEvents}
			addEventToProject={addEventToProject}
			canBeAddedToProject={location.state}
		/>
	))

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
				<CityFilter setCity={setCity} />
				<PriceFilter setPrice={setPrice} />
			</ListHeader>

			<hr />
			<div className="flex-1 m-4 flex-col">
				{isLoading ? (
					<Spinner />
				) : (
					<table className="w-full p-5">
						<TableHeaders headers="event" />
						{eventList}
					</table>
				)}
			</div>
		</>
	)
}

export default EventList
