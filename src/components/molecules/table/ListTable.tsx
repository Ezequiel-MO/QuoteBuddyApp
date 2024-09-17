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
}

export const ListTable = <T,>({
	items,
	headers,
	ListItemComponent,
	isLoading,
	canBeAddedToProject = false
}: ListTableProps<T>) => {
	const location = useLocation()

	if (isLoading) {
		return <Spinner />
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
