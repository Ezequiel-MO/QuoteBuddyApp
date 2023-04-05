import { Pagination } from '../../../components/atoms'
import { SearchInput } from '../../../ui'

export const AccManagerListHeader = ({
	handleClick,
	searchItem,
	filterList,
	page,
	totalPages,
	onChangePage
}) => (
	<div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mr-8 ml-8 relative">
		<div className="flex flex-col w-full">
			<h1 className="text-2xl">Account Managers List</h1>
			<div className="flex flex-row justify-start items-center mb-1">
				<button
					onClick={handleClick}
					className="mr-5 focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded"
				>
					Create New Account Manager
				</button>
				<SearchInput
					searchItem={searchItem}
					filterList={filterList}
					className="flex-shrink min-w-0"
				/>
				<div className="ml-4 -mt-6">
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
