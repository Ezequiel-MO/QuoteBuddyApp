import { SearchInput } from '../../ui/inputs/SearchInput'
import { Pagination, CreateButton } from '../atoms'

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
						<CreateButton title={singularTitle} handleClick={handleClick} />
					</div>
					<div className="flex items-center">
						{filterList && (
							<SearchInput
								searchItem={searchItem}
								filterList={filterList}
								className="flex-shrink min-w-0"
							/>
						)}
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
