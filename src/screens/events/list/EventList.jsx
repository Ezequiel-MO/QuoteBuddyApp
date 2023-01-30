import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import EventListItem from './EventListItem'
import { CityFilter, PriceFilter, TableHeaders, SearchInput } from '../../../ui'
import 'react-toastify/dist/ReactToastify.css'
import { useCurrentProject, useGetEvents } from '../../../hooks'
import { Spinner } from '../../../components/atoms'

const EventList = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const [event] = useState({})
	const { currentProject } = useCurrentProject()
	const { groupLocation } = currentProject
	const [city, setCity] = useState(groupLocation || '')
	const [searchItem, setSearchItem] = useState('')
	const [price, setPrice] = useState(0)
	const { events, setEvents, isLoading } = useGetEvents(city, price)
	/* const currentProjectIsLive = Object.keys(currentProject).length !== 0 */
	const [foundEvents, setFoundEvents] = useState([])

	useEffect(() => {
		setFoundEvents(events)
	}, [events])

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
			<div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
				<div className="flex flex-col w-full">
					<h1 className="text-2xl">Event List</h1>
					<div className="flex flex-row justify-start items-center">
						<div>
							{/*  {currentProjectIsLive ? null : <CityFilter setCity={setCity} />} */}
							<CityFilter setCity={setCity} />
							<PriceFilter setPrice={setPrice} />
						</div>
						<button
							onClick={() => navigate('/app/event/specs', { state: { event } })}
							className="mx-5 focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded"
						>
							Create New Event
						</button>
						<SearchInput searchItem={searchItem} filterList={filterList} />
					</div>
				</div>
			</div>
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
