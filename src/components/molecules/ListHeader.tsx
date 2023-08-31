import { ReactNode } from 'react'
import { SearchInput } from '../../ui/inputs/formik/SearchInput'
import { Pagination, CreateButton } from '../atoms'
import { Direction } from 'src/hooks'

interface Props {
	title: string
	handleClick: () => void
	searchItem?: string
	filterList?: (e: React.ChangeEvent<HTMLInputElement>) => void
	page?: number
	totalPages?: number
	onChangePage?: (direction: Direction) => void
	children?: ReactNode
}

export const ListHeader = ({
	title,
	handleClick,
	searchItem,
	filterList,
	page,
	totalPages,
	onChangePage,
	children
}: Props) => {
	const singularTitle = title.replace(/(ies|s)$/, (match) => {
		if (match === 'ies') {
			return 'y'
		} else {
			return ''
		}
	})
	return (
		<div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4">
			<div className="flex flex-col w-full">
				<h1 className="text-2xl">{title}</h1>
				<div className="flex flex-row justify-between items-center">
					<div className="flex flex-row items-center">
						<div className="flex flex-col">{children}</div>
						<CreateButton title={singularTitle} handleClick={handleClick} />
					</div>
					<div className="flex items-center">
						{filterList && (
							<SearchInput searchItem={searchItem} filterList={filterList} />
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
