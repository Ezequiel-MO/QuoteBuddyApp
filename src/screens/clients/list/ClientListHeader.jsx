import { Pagination } from '../../../components/atoms'
import { CountryFilter, SearchInput } from '../../../ui'

export const ClientListHeader = ({
	country,
	setCountry,
	handleClick,
	searchItem,
	filterList,
	page,
	totalPages,
	onChangePage
}) => (
	<div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
		<div className="flex flex-col w-full">
			<h1 className="text-2xl">Client List</h1>
			<div className="flex flex-row justify-between items-center">
				<div className="flex flex-row items-center">
					<CountryFilter setCountry={setCountry} country={country} />
					<button
						onClick={handleClick}
						className="mx-5 focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded"
					>
						Create New Client
					</button>
				</div>

				<SearchInput
					searchItem={searchItem}
					filterList={filterList}
					className="flex-shrink min-w-0"
				/>
				<div className="ml-4 -mt-11">
					<Pagination
						page={page}
						totalPages={totalPages}
						onChangePage={onChangePage}
					/>
				</div>
			</div>
		</div>
	</div>
)
