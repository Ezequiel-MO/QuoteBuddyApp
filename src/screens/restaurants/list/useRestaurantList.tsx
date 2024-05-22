import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useGetDocumentLength, usePagination } from 'src/hooks'
import { useRestaurantsState } from './useRestaurantsState'
import { IRestaurant } from 'src/interfaces'
import { useFilterValues } from './useFilterValues'
import { useFetchRestaurants } from 'src/hooks/fetchData/useFetchRestaurants'

const FilterRoutes: string[] = ['city', 'price[lte]', 'isVenue']

export const useRestaurantList = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const canBeAddedToProject: boolean = location.state ? true : false

	const restaurant: IRestaurant = {} as IRestaurant
	const {
		city,
		setCity,
		price,
		setPrice,
		venueOrRestaurant,
		setVenueOrRestaurant,
		language,
		setLanguage
	} = useRestaurantsState()

	const [searchItem, setSearchItem] = useState<string>('')
	const [foundRestaurants, setFoundRestaurants] = useState<IRestaurant[]>([])
	const [totalPages, setTotalPages] = useState<number>(1)
	const [isSearching, setIsSearching] = useState(false)

	const { page, setPage, onChangePage } = usePagination(1, totalPages)

	const isFiltering = city !== '' || price !== 0 || venueOrRestaurant !== 'all'

	const { restaurants, setRestaurants, isLoading } = useFetchRestaurants(
		city,
		price,
		venueOrRestaurant,
		language,
		page,
		isFiltering,
		isSearching
	)
	const filterValues = useFilterValues(city, price, venueOrRestaurant)

	const { results } = useGetDocumentLength(
		'restaurants',
		filterValues,
		FilterRoutes
	)

	useEffect(() => {
		setFoundRestaurants(restaurants)
		setTotalPages(results)
	}, [restaurants, results])

	useEffect(() => {
		if (searchItem) {
			setIsSearching(true)
		} else {
			setIsSearching(false)
		}
	}, [searchItem])

	useEffect(() => {
		setPage(1)
	}, [price, venueOrRestaurant, city])

	const handleFilterList = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchItem(e.target.value)
		const result = restaurants.filter((data) =>
			data.name.toLowerCase().includes(e.target.value.toLowerCase())
		)
		setFoundRestaurants(result)
		if (searchItem === '') {
			setFoundRestaurants(restaurants)
		}
	}

	const handleListHeaderClick = () =>
		navigate('/app/restaurant/specs', { state: { restaurant } })

	return {
		city,
		setCity,
		price,
		setPrice,
		venueOrRestaurant,
		setVenueOrRestaurant,
		searchItem,
		setSearchItem,
		foundRestaurants,
		setFoundRestaurants,
		page,
		setPage,
		onChangePage,
		totalPages,
		isLoading,
		restaurants,
		setRestaurants,
		handleFilterList,
		handleListHeaderClick,
		canBeAddedToProject,
		language,
		setLanguage
	}
}
