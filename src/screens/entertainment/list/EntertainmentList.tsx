import { ListHeader } from '@components/molecules'
import { Spinner } from '@components/atoms'
import { CityFilter, TableHeaders } from 'src/ui'
import { useEntertainmentList } from './useEntertainmentList'
import { EntertainmentListItem } from './EntertainmentListItem'
import { useLocation } from 'react-router-dom'

export const EntertainmentList = () => {
	const location = useLocation()
	const {
		city,
		setCity,
		entertainmentShows,
		setEntertainmentShows,
		foundEntertainmentShows,
		setFoundEntertainmentShows,
		handleClick,
		searchItem,
		filterList,
		page,
		totalPages,
		onChangePage,
		isLoading
	} = useEntertainmentList()

	return (
		<>
			<ListHeader
				title="Entertainment Shows"
				handleClick={handleClick}
				searchItem={searchItem}
				filterList={filterList}
				page={page}
				totalPages={totalPages}
				onChangePage={onChangePage}
			>
				<CityFilter setCity={setCity} city={city} />
			</ListHeader>
			<hr />
			{isLoading ? (
				<Spinner />
			) : (
				<table className="w-full p-5">
					<TableHeaders headers="entertainmentShow" />
					{foundEntertainmentShows?.map((entertainmentShow) => (
						<EntertainmentListItem
							key={entertainmentShow._id}
							entertainmentShow={entertainmentShow}
							entertainmentShows={entertainmentShows}
							setEntertainmentShows={setEntertainmentShows}
							canBeAddedToProject={location.state}
						/>
					))}
				</table>
			)}
		</>
	)
}
