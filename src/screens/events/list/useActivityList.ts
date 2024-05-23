import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
	useCurrentProject,
	useGetDocumentLength,
	usePagination,
	useFilterList
} from 'src/hooks'
import { useFetchEvents } from 'src/hooks/fetchData/useFetchEvents'
import { IEvent, IProject } from 'src/interfaces'

const filterRoutes = ['city', 'price[lte]']

export const useActivityList = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const canBeAddedToProject: boolean = location.state ? true : false

	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	const { groupLocation, languageVendorDescriptions } = currentProject
	const event = {} as IEvent
	const [totalPages, setTotalPages] = useState<number>(1)
	const [city, setCity] = useState<string>(groupLocation || '')
	const [price, setPrice] = useState(0)
	const [language, setLanguage] = useState(languageVendorDescriptions || '')
	const [isSearching, setIsSearching] = useState<boolean>(false)
	const { page, setPage, onChangePage } = usePagination(1, totalPages)

	const filterValues = [
		{ name: 'city', value: city === 'none' ? undefined : city },
		{ name: 'price[lte]', value: price === 0 ? undefined : price }
	]
	const { events, setEvents, isLoading } = useFetchEvents(
		city,
		price,
		page,
		isSearching,
		language
	)
	const { results } = useGetDocumentLength('events', filterValues, filterRoutes)

	const filterFunction = (data: any, value: any) =>
		data.name.toLowerCase().includes(value.toLowerCase())

	const {
		filteredData: foundEvents,
		searchTerm: searchItem,
		filterList,
		setData: setFoundEvents
	} = useFilterList(events, filterFunction)

	useEffect(() => {
		setFoundEvents(events)
		setTotalPages(results)
	}, [events, results])

	useEffect(() => {
		if (searchItem) {
			setIsSearching(true)
		} else {
			setIsSearching(false)
		}
	}, [searchItem])

	useEffect(() => {
		setPage(1)
	}, [city, price])

	const handleClick = () => navigate('/app/event/specs', { state: { event } })

	return {
		city,
		setCity,
		price,
		setPrice,
		events,
		setEvents,
		foundEvents,
		setFoundEvents,
		searchItem,
		filterList,
		handleClick,
		page,
		totalPages,
		onChangePage,
		isLoading,
		event,
		language,
		setLanguage,
		canBeAddedToProject
	}
}
