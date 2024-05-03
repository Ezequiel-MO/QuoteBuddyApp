import { Pagination } from '../../../components/atoms'
import { SearchInput } from '../../../components/molecules/inputs/SearchInput'

export const InvoiceListHeader = ({
	searchItem,
	filterList,
	onClickCreate,
	page,
	totalPages,
	onChangePage
}) => {
	return (
		<div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
			<div className="flex flex-col w-full">
				<h1 className="text-2xl">Invoice List</h1>
				<div className="flex flex-row justify-start items-center">
					<button
						onClick={onClickCreate}
						className="mx-5 focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded"
					>
						Create New Invoice
					</button>
					<SearchInput searchItem={searchItem} filterList={filterList} />
					<div className="absolute right-11 top-[170px]">
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
}
