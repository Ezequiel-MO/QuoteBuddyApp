import React from 'react'
import { Spinner } from '../../../components/atoms'
import { listStyles } from 'src/constants/listStyles'
import { TableHeaders } from 'src/ui'
import { HeaderItems } from 'src/constants'
import { useProject } from '@screens/projects/context/ProjectContext'

interface ListTableProps<T> {
	items: T[]
	headers: keyof HeaderItems
	ListItemComponent: React.FC<{ item: T; canBeAddedToProject: boolean }>
	isLoading: boolean
}

export const ListTable = <T,>({
	items,
	headers,
	ListItemComponent,
	isLoading
}: ListTableProps<T>) => {
	const { state } = useProject()

	if (isLoading) {
		return <Spinner />
	}

	const canBeAddedToProject = state.currentProject?._id !== ''

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
