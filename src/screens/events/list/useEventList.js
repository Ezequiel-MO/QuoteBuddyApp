import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
	useCurrentProject,
	useGetEvents,
	useGetDocumentLength,
	usePagination,
	useFilterList
} from '../../../hooks'

const filterRoutes = ['city', 'price[lte]']

export const useEventList = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const { currentProject } = useCurrentProject()
	const { groupLocation } = currentProject
	const event = {}
	const [totalPages, setTotalPages] = useState(1)
	const { page, setPage, onChangePage } = usePagination(1, totalPages)
	const [city, setCity] = useState(groupLocation || '')
	const [price, setPrice] = useState(0)

	const filterValues = [
		{ name: 'city', value: city === 'none' ? undefined : city },
		{ name: 'price[lte]', value: price === 'none' ? undefined : price }
	]
	const { events, setEvents, isLoading } = useGetEvents(city, price, page)
	const { results } = useGetDocumentLength('events', filterValues, filterRoutes)

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

	const filterFunction = (data, value) =>
		data.name.toLowerCase().includes(value.toLowerCase())

	const {
		filteredData: foundEvents,
		searchTerm: searchItem,
		filterList,
		setData: setFoundEvents
	} = useFilterList(events, filterFunction)

	const handleClick = () => navigate('/app/event/specs', { state: { event } })

	useEffect(() => {
		setPage(1)
	}, [city, price])

	return {
		city,
		setCity,
		price,
		setPrice,
		events,
		setEvents,
		addEventToProject,
		foundEvents,
		setFoundEvents,
		searchItem,
		filterList,
		handleClick,
		page,
		totalPages,
		onChangePage,
		isLoading,
		event
	}
}
