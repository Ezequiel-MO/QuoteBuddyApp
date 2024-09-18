import React from 'react'
import { Spinner } from '../../../components/atoms'
import { listStyles } from 'src/constants/listStyles'
import { TableHeaders } from 'src/ui'
import { HeaderItems } from 'src/constants'
import { useLocation } from 'react-router-dom'

interface ListTableProps<T> {
	items: T[]
	headers: keyof HeaderItems
	ListItemComponent: React.FC<{ item: T; canBeAddedToProject: boolean }>
	isLoading: boolean
	canBeAddedToProject: boolean
	searchTerm?: string
}

export const ListTable = <T,>({
	items,
	headers,
	ListItemComponent,
	isLoading,
	canBeAddedToProject = false,
	searchTerm
}: ListTableProps<T>) => {
	const location = useLocation()

	if (isLoading) {
		return <Spinner />
	}

	if (searchTerm && items.length === 0) {
		const letterUppercase = (headers as string).slice(0, 1).toUpperCase()
		const document = letterUppercase + (headers as string).slice(1, headers.length)
		return (
			<h1 className='text-center text-4xl mt-32'>
				{`${document} not found`}
			</h1>
		)
	}

	return (
		<table className={listStyles.table}>
			<TableHeaders headers={headers} />
			<tbody className={listStyles.tbody}>
				{Array.isArray(items) &&
					items?.map((item: T) => (
						<ListItemComponent
							key={(item as any)._id}
							item={item}
							canBeAddedToProject={canBeAddedToProject}
						/>
					))}
			</tbody>
		</table>
	)
}
