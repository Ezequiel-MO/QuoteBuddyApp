import { ListHeader } from '@components/molecules'
import { Spinner, LanguageFilter } from '@components/atoms'
import { CityFilter, TableHeaders } from 'src/ui'
import { useEntertainmentList } from './useEntertainmentList'
import { EntertainmentListItem } from './EntertainmentListItem'
import { listStyles } from 'src/constants/listStyles'

export const EntertainmentList = () => {

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
		isLoading,
		language,
		setLanguage,
		canBeAddedToProject
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
				<LanguageFilter language={language} setLanguage={setLanguage} />
			</ListHeader>
			<hr />
			{isLoading ? (
				<Spinner />
			) : (
				<table className={listStyles.table}>
					<TableHeaders headers="entertainmentShow" />
					{foundEntertainmentShows?.map((entertainmentShow) => (
						<EntertainmentListItem
							key={entertainmentShow._id}
							entertainmentShow={entertainmentShow}
							entertainmentShows={entertainmentShows}
							setEntertainmentShows={setEntertainmentShows}
							canBeAddedToProject={canBeAddedToProject}
						/>
					))}
				</table>
			)}
		</>
	)
}
