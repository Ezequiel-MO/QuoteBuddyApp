import { CityFilter, PriceFilter, TableHeaders } from '../../../ui'
import 'react-toastify/dist/ReactToastify.css'
import { Spinner, LanguageFilter } from '../../../components/atoms'
import { ListHeader } from '../../../components/molecules'
import { useActivityList } from './useActivityList'
import { ActivityListItem } from './ActivityListItem'
import { listStyles } from 'src/constants/listStyles'

export const ActivityList = () => {
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
		isLoading,
		language,
		setLanguage,
		canBeAddedToProject
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
				<div className=''>
					<LanguageFilter language={language} setLanguage={setLanguage}  />
				</div>
			</ListHeader>

			<hr />

			{isLoading ? (
				<Spinner />
			) : (
				<table className={listStyles.table}>
					<TableHeaders headers="event" />
					{foundEvents?.map((event) => (
						<ActivityListItem
							key={event._id}
							event={event}
							events={events}
							setEvents={setEvents}
							canBeAddedToProject={canBeAddedToProject}
						/>
					))}
				</table>
			)}
		</>
	)
}
