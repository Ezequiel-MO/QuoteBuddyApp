import { SearchInput } from '../../ui/inputs/SearchInput'
import { Pagination } from '../atoms/Pagination'

export const ListHeader = ({
	title,
	handleClick,
	searchItem,
	filterList,
	page,
	totalPages,
	onChangePage,
	children
}) => {
	const singularTitle = title.replace(/(ies|s)$/, (match) => {
		if (match === 'ies') {
			return 'y'
		} else {
			return ''
		}
	})
	return (
		<div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
			<div className="flex flex-col w-full">
				<h1 className="text-2xl">{title}</h1>
				<div className="flex flex-row justify-between items-center">
					<div className="flex flex-row items-center">
						<div className="flex flex-col">{children}</div>
						<button
							onClick={handleClick}
							className="mx-5 focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded"
						>
							Create New {singularTitle}
						</button>
					</div>
					<div className="flex items-center">
						<SearchInput
							searchItem={searchItem}
							filterList={filterList}
							className="flex-shrink min-w-0"
						/>
						{totalPages && (
							<div className="ml-4 -mt-5">
								<Pagination
									page={page}
									totalPages={totalPages}
									onChangePage={onChangePage}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
